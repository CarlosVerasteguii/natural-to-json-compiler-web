import React from 'react';

const terms = [
    {
        term: 'Token',
        def: 'Una secuencia de caracteres tratada como una unidad lógica en la gramática. Es como una "palabra" en el lenguaje humano.'
    },
    {
        term: 'Lexema',
        def: 'La secuencia real de caracteres en el código fuente que coincide con un patrón de token. Ejemplo: "CREAR" es el lexema para el token PALABRA_CLAVE.'
    },
    {
        term: 'AST (Árbol de Sintaxis Abstracta)',
        def: 'Una representación jerárquica en árbol de la estructura sintáctica del código. Elimina detalles innecesarios como paréntesis o comas.'
    },
    {
        term: 'Tabla de Símbolos',
        def: 'Una estructura de datos usada por el compilador para almacenar información sobre variables (identificadores), sus tipos y sus ubicaciones.'
    },
    {
        term: 'Representación Intermedia (IR)',
        def: 'Una versión del código que no es ni el lenguaje fuente ni el lenguaje máquina, diseñada para facilitar la optimización y la traducción final.'
    }
];

const Glossary = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {terms.map((item) => (
                <div
                    key={item.term}
                    className="group bg-midnight-900/50 p-6 rounded-xl border border-midnight-800 hover:border-blue-500/50 hover:bg-midnight-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 backdrop-blur-sm"
                >
                    <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-sm mr-3 group-hover:bg-blue-500 group-hover:text-white transition-colors border border-blue-500/20 group-hover:border-blue-500">
                            {item.term.charAt(0)}
                        </div>
                        <h4 className="text-slate-200 font-bold text-lg group-hover:text-blue-400 transition-colors">{item.term}</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300">
                        {item.def}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Glossary;
