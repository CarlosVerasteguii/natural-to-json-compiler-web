"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Estudio', path: '/' },
        { name: 'Pipeline', path: '/pipeline' },
        { name: 'Banco de Pruebas', path: '/tests' },
        { name: 'Aprendizaje', path: '/learning' },
        { name: 'Documentación', path: '/docs' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-midnight-800 bg-midnight-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-midnight-950/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:shadow-blue-600/30 transition-all duration-300">
                                <span className="text-white font-bold font-mono text-lg">N</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-slate-100 tracking-tight leading-none group-hover:text-blue-400 transition-colors">Natural2JSON</span>
                                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider leading-none mt-0.5">Compiler Studio</span>
                            </div>
                        </Link>

                        <div className="hidden md:block">
                            <div className="flex items-center space-x-1">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.path}
                                            className="relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors group"
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="navbar-indicator"
                                                    className="absolute inset-0 bg-midnight-800 rounded-md"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            <span className={`relative z-10 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                                {item.name}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <div className="h-4 w-px bg-midnight-800"></div>
                        <span className="text-xs text-slate-500 font-mono bg-midnight-900 px-2 py-1 rounded border border-midnight-800">
                            v1.0.0-beta
                        </span>
                        <a
                            href="https://github.com/CarlosVerasteguii/natural-to-json-compiler-web"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
