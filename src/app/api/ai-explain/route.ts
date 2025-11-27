import { NextResponse } from 'next/server';

const HF_TOKEN = process.env.HF_TOKEN;

// Lista de modelos a probar en orden de preferencia.
// Puedes ajustar este arreglo según lo que te funcione mejor.
const MODEL_CANDIDATES = [
    "Qwen/Qwen2.5-Coder-7B-Instruct",
    "HuggingFaceH4/zephyr-7b-beta",
    "mistralai/Mistral-7B-Instruct-v0.2",
];

// Endpoint nuevo de Hugging Face Router (compatibilidad estilo OpenAI)
const API_URL = "https://router.huggingface.co/v1/chat/completions";

export async function POST(request: Request) {
    if (!HF_TOKEN) {
        return NextResponse.json(
            { error: "⚠️ Token de Hugging Face no configurado en .env.local (HF_TOKEN)" },
            { status: 500 }
        );
    }

    try {
        const { code, error } = await request.json();



        let lastErrorMessage = "No se pudo obtener una respuesta válida de la IA.";

        for (const modelId of MODEL_CANDIDATES) {
            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${HF_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: modelId,
                        messages: [
                            {
                                role: "system",
                                content: `Eres un experto en el lenguaje "Natural a JSON". 
REGLAS DEL LENGUAJE:
1. Los booleanos son las palabras reservadas VERDADERO o FALSO (SIN COMILLAS).
2. Las cadenas siempre usan comillas dobles: "texto".
3. Las claves de objetos NO llevan comillas.
4. Para listas usa: CREAR LISTA nombre CON ELEMENTOS valor1, valor2
5. Los números decimales usan punto (ej: 3.14).
6. Tu tarea es analizar errores y devolver una respuesta estructurada en formato JSON. NO uses markdown. NO incluyas texto fuera del JSON.`
                            },
                            {
                                role: "user",
                                content: `Analiza el siguiente error en el código fuente.
Código:
${code}

Error:
${error}

Responde ÚNICAMENTE con un objeto JSON válido con esta estructura exacta:
{
  "explanation": "Explicación breve y amigable del error y cómo solucionarlo (máximo 3 frases)",
  "fixedCode": "ÚNICAMENTE el código corregido. NO incluyas explicaciones ni texto adicional en este campo. Solo código."
}`
                            }
                        ],
                        max_tokens: 512,
                        temperature: 0.1, // Lower temperature for more deterministic output
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    lastErrorMessage = `Error ${response.status} con el modelo ${modelId}: ${errorText}`;
                    continue;
                }

                interface OpenAIResponse {
                    choices?: Array<{
                        message?: { content?: string };
                        delta?: { content?: string };
                    }>;
                }

                const result = await response.json() as OpenAIResponse;

                // Formato estilo OpenAI: { choices: [ { message: { content } } ] }
                let content =
                    result?.choices?.[0]?.message?.content?.trim?.() ??
                    result?.choices?.[0]?.delta?.content?.trim?.();

                if (content) {
                    // Try to extract JSON from code blocks or find the first { and last }
                    const jsonMatch = content.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        content = jsonMatch[0];
                    }

                    try {
                        const parsed = JSON.parse(content);
                        return NextResponse.json({
                            explanation: parsed.explanation,
                            fixedCode: parsed.fixedCode,
                            modelUsed: modelId,
                        });
                    } catch {
                        console.error("Failed to parse AI JSON:", content);
                        // Fallback if not valid JSON
                        return NextResponse.json({
                            explanation: content, // Return raw content as explanation
                            fixedCode: null,
                            modelUsed: modelId,
                        });
                    }
                }

                lastErrorMessage = `Respuesta vacía o inválida de la IA para el modelo ${modelId}.`;
            } catch (e: unknown) {
                const errorMessage = e instanceof Error ? e.message : String(e);
                lastErrorMessage = `Error al consultar el modelo ${modelId}: ${errorMessage}`;
                continue;
            }
        }

        return NextResponse.json(
            { error: lastErrorMessage },
            { status: 500 }
        );
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        return NextResponse.json({ error: `Error del servidor: ${errorMessage}` }, { status: 500 });
    }
}
