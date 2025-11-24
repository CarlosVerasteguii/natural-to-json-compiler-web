'use client';
import { useState } from 'react';
import { analyze, AnalysisResult } from '@/lib/analyzer';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    const res = analyze(input);
    setResult(res);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Prueba de Compilador Web</h1>
      <textarea
        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 h-40 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu codigo aqui..."
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2 transition-colors"
        onClick={handleAnalyze}
      >
        Compilar
      </button>

      {result && (
        <div className="mt-6 space-y-4">
          <section>
            <h2 className="text-xl font-semibold mb-2">Errores</h2>
            {result.errors.length > 0 ? (
              <ul className="list-disc list-inside text-red-600 dark:text-red-400">
                {result.errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            ) : (
              <p className="text-green-700 dark:text-green-400">
                Sin errores semanticos.
              </p>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Tokens</h2>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 overflow-auto">
              {result.tokens.join('\n')}
            </pre>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">JSON Generado</h2>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 overflow-auto">
              {result.json ?? '—'}
            </pre>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Codigo Python</h2>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 overflow-auto">
              {result.pythonCode ?? '-'}
            </pre>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">IR Optimizada</h2>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 overflow-auto">
              {result.ir.length > 0
                ? JSON.stringify(result.ir, null, 2)
                : '-'}
            </pre>
          </section>
        </div>
      )}
    </div>
  );
}
