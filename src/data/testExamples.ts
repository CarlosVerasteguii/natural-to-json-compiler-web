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
    name: 'Creación Básica de Objeto',
    description: 'Crea un objeto simple con propiedades de texto, número y booleano.',
    code: 'CREAR OBJETO miLibro CON titulo:"El Gran Libro de Ñandú", año:2023, disponible:VERDADERO',
    type: 'valid',
  },
  {
    id: 'valid_02',
    name: 'Creación de Lista',
    description: 'Crea una lista con tipos de elementos mixtos.',
    code: 'CREAR LISTA misNumeros CON ELEMENTOS 10, -20.5, 300, FALSO',
    type: 'valid',
  },
  {
    id: 'invalid_consistency',
    name: 'Error de Consistencia',
    description: 'Propiedad "edad" duplicada con valores diferentes.',
    code: 'CREAR OBJETO usuario CON edad:30, edad:"treinta"',
    type: 'invalid',
  },
  {
    id: 'invalid_type_edad',
    name: 'Error de Tipo (Edad)',
    description: 'La propiedad "edad" debe ser un número.',
    code: 'CREAR OBJETO usuario CON edad:"veinte"',
    type: 'invalid',
  },
  {
    id: 'invalid_type_activo',
    name: 'Error de Tipo (Activo)',
    description: 'La propiedad "activo" debe ser un booleano.',
    code: 'CREAR OBJETO usuario CON activo:1',
    type: 'invalid',
  },
  {
    id: 'invalid_sem_redef_objeto',
    name: 'Error de Redefinición',
    description: 'Redefiniendo un objeto existente.',
    code: 'CREAR OBJETO miLibro CON id:1\nCREAR OBJETO miLibro CON id:2',
    type: 'invalid',
  }
];
