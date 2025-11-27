"use client";

import React from 'react';
import CodeEditor from '@/components/Studio/CodeEditor';
import OutputPanel from '@/components/Studio/OutputPanel';
import ErrorPanel from '@/components/Studio/ErrorPanel';
import StatusBar from '@/components/Studio/StatusBar';
import ResizableLayout from '@/components/Studio/ResizableLayout';
import { useCompiler } from '@/context/CompilerContext';
import { motion } from 'framer-motion';
import WelcomeTour from '@/components/Studio/WelcomeTour';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function HomeContent() {
  const { runCompilation, isCompiling, compilationResult, setSourceCode } = useCompiler();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isTutorial = searchParams.get('tutorial') === 'true';
    if (isTutorial) {
      const tutorialCode = `CREAR OBJETO tutorial CON
    mensaje: "¡Bienvenido al tutorial!",
    paso: 1,
    instrucciones: "Observa cómo este texto se convierte en JSON.",
    listo: VERDADERO`;
      setSourceCode(tutorialCode);
      // Optional: Auto-run after a small delay to let the user see the code first
      setTimeout(() => {
        runCompilation(tutorialCode);
      }, 1000);
    }
  }, [searchParams, setSourceCode, runCompilation]);

  const handleCompile = () => {
    runCompilation();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-midnight-950 overflow-hidden">
      {/* Toolbar */}
      <div className="bg-midnight-900/50 border-b border-midnight-800 p-2 flex items-center justify-between backdrop-blur-sm z-10 h-12">
        <div className="flex items-center space-x-4 px-2">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
            <span className="font-mono text-xs">main.nat</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-[10px] text-slate-500 font-mono bg-midnight-900 px-2 py-0.5 rounded border border-midnight-800">
            Ctrl + Enter
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCompile}
            disabled={isCompiling}
            className={`px-5 py-1.5 rounded-md font-bold text-xs tracking-wide uppercase transition-all flex items-center shadow-lg ${isCompiling
              ? 'bg-midnight-800 text-slate-500 cursor-not-allowed border border-midnight-700'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-900/20 border border-blue-500/20'
              }`}
          >
            {isCompiling ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Compilando...
              </>
            ) : (
              <>
                <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ejecutar Código
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Main Workspace with Resizable Layout */}
      <div className="flex-grow overflow-hidden relative">
        <ResizableLayout
          left={
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <CodeEditor hasError={compilationResult?.errors && compilationResult.errors.length > 0} />
              <ErrorPanel />
            </motion.div>
          }
          right={
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="h-full flex flex-col"
            >
              <OutputPanel />
            </motion.div>
          }
        />
      </div>

      {/* Status Bar */}
      <StatusBar />

      {/* Tour */}
      <WelcomeTour />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen bg-midnight-950 text-slate-500">Cargando Studio...</div>}>
      <HomeContent />
    </Suspense>
  );
}
