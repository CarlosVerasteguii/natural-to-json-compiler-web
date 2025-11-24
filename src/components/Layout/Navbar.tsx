"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Studio', path: '/' },
        { name: 'Pipeline', path: '/pipeline' },
        { name: 'Test Suite', path: '/tests' },
        { name: 'Learning', path: '/learning' },
        { name: 'Docs', path: '/docs' },
    ];

    return (
        <nav className="bg-slate-900 border-b border-slate-800 text-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 font-bold text-xl text-blue-400">
                            Natural<span className="text-slate-100">2</span>JSON
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.path}
                                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                                    ? 'bg-slate-800 text-blue-400'
                                                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <span className="text-xs text-slate-500 font-mono">v1.0.0-beta</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
