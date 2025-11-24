export interface TestExample {
  id: string;
  name: string;
  description: string;
  code: string;
  type: 'valid' | 'invalid';
}

export const testExamples: TestExample[] = [
  {
    id: 'valid_01',
    name: 'Basic Object Creation',
    description: 'Creates a simple object with string, number, and boolean properties.',
    code: 'CREAR OBJETO miLibro CON titulo:"El Gran Libro de Ñandú", año:2023, disponible:VERDADERO',
    type: 'valid',
  },
  {
    id: 'valid_02',
    name: 'List Creation',
    description: 'Creates a list with mixed element types.',
    code: 'CREAR LISTA misNumeros CON ELEMENTOS 10, -20.5, 300, FALSO',
    type: 'valid',
  },
  {
    id: 'invalid_consistency',
    name: 'Consistency Error',
    description: 'Duplicate property "edad" with different values.',
    code: 'CREAR OBJETO usuario CON edad:30, edad:"treinta"',
    type: 'invalid',
  },
  {
    id: 'invalid_type_edad',
    name: 'Type Error (Age)',
    description: 'The "edad" property must be a number.',
    code: 'CREAR OBJETO usuario CON edad:"veinte"',
    type: 'invalid',
  },
   {
    id: 'invalid_type_activo',
    name: 'Type Error (Active)',
    description: 'The "activo" property must be a boolean.',
    code: 'CREAR OBJETO usuario CON activo:1',
    type: 'invalid',
  },
  {
    id: 'invalid_sem_redef_objeto',
    name: 'Redefinition Error',
    description: 'Redefining an existing object.',
    code: 'CREAR OBJETO miLibro CON id:1\nCREAR OBJETO miLibro CON id:2',
    type: 'invalid',
  }
];
