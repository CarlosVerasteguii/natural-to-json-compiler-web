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

        const userContent = [
            "Analiza el siguiente error en un lenguaje de programación simple (Natural-to-JSON).",
            "",
            "Código del estudiante:",
            code,
            "",
            "Error reportado:",
            error,
            "",
            "Responde SIEMPRE en el siguiente formato claro y muy sencillo:",
            "",
            "1) ¿Qué significa el error?",
            "- Explicación en máximo 3 frases, usando lenguaje para principiantes.",
            "",
            "2) ¿Cómo lo puede corregir el estudiante?",
            "- Indica pasos concretos para corregirlo.",
            "",
            "3) Ejemplo corregido",
            "- Muestra un ejemplo de cómo se vería el código corregido.",
        ].join("\n");

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
                                content: "Actúa como un profesor muy paciente de programación y compiladores. Explica como si hablaras con alguien que apenas está empezando. No uses jerga técnica innecesaria. Responde SIEMPRE en español neutral y sigue exactamente el formato solicitado por el usuario."
                            },
                            {
                                role: "user",
                                content: userContent
                            }
                        ],
                        max_tokens: 256,
                        temperature: 0.4,
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    lastErrorMessage = `Error ${response.status} con el modelo ${modelId}: ${errorText}`;
                    continue;
                }

                const result: any = await response.json();

                // Formato estilo OpenAI: { choices: [ { message: { content } } ] }
                const content =
                    result?.choices?.[0]?.message?.content?.trim?.() ??
                    result?.choices?.[0]?.delta?.content?.trim?.();

                if (content) {
                    return NextResponse.json({
                        explanation: content,
                        modelUsed: modelId,
                    });
                }

                lastErrorMessage = `Respuesta vacía o inválida de la IA para el modelo ${modelId}.`;
            } catch (e: any) {
                lastErrorMessage = `Error al consultar el modelo ${modelId}: ${e.message}`;
                continue;
            }
        }

        return NextResponse.json(
            { error: lastErrorMessage },
            { status: 500 }
        );
    } catch (e: any) {
        return NextResponse.json({ error: `Error del servidor: ${e.message}` }, { status: 500 });
    }
}
