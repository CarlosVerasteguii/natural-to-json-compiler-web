"use client";

import React from 'react';
import CodeEditor from '@/components/Studio/CodeEditor';
import OutputPanel from '@/components/Studio/OutputPanel';
import ErrorPanel from '@/components/Studio/ErrorPanel';
import StatusBar from '@/components/Studio/StatusBar';
import ResizableLayout from '@/components/Studio/ResizableLayout';
import { useCompiler } from '@/context/CompilerContext';
import { motion } from 'framer-motion';

export default function Home() {
  const { runCompilation, isCompiling, compilationResult } = useCompiler();

  const handleCompile = () => {
    runCompilation();
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 overflow-hidden">
      {/* Toolbar */}
      <div className="bg-slate-900/50 border-b border-slate-800 p-3 flex items-center justify-between backdrop-blur-sm z-10 h-14">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-900/50">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight">Compiler Studio <span className="text-xs font-normal text-slate-500 ml-2 border border-slate-800 px-1.5 py-0.5 rounded">PRO</span></h1>
          </div>

          <div className="h-6 w-px bg-slate-800"></div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCompile}
            disabled={isCompiling}
            className={`px-6 py-1.5 rounded-lg font-bold text-sm transition-all flex items-center shadow-lg ${isCompiling
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-blue-900/30 border border-blue-400/20'
              }`}
          >
            {isCompiling ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Compilando...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ejecutar
              </>
            )}
          </motion.button>
        </div>
        <div className="text-xs text-slate-500 font-mono bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
          Ctrl + Enter
        </div>
      </div>

      {/* Main Workspace with Resizable Layout */}
      <div className="flex-grow overflow-hidden relative">
        <ResizableLayout
          left={
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full flex flex-col"
            >
              <CodeEditor hasError={compilationResult?.errors && compilationResult.errors.length > 0} />
              <ErrorPanel />
            </motion.div>
          }
          right={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="h-full flex flex-col"
            >
              <OutputPanel />
            </motion.div>
          }
        />
      </div>

      {/* Status Bar */}
      <StatusBar />
    </div>
  );
}
