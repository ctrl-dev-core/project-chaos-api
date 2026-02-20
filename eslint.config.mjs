// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'generated/**', 'eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
  // --- SEGURIDAD ASÍNCRONA (Crítico para Prisma) ---
  '@typescript-eslint/no-floating-promises': 'error', // No dejes promesas "volando"
  '@typescript-eslint/await-thenable': 'error',       // No uses await en lo que no es promesa
  '@typescript-eslint/no-misused-promises': 'error',   // No uses promesas donde no van

  // --- CALIDAD DE CÓDIGO ---
  '@typescript-eslint/no-explicit-any': 'warn',       // Intenta tipar todo, pero permite 'any' con aviso
  '@typescript-eslint/no-unused-vars': ['warn', { 
    argsIgnorePattern: '^_', 
    varsIgnorePattern: '^_' 
  }], // Permite variables sin usar si empiezan con guion bajo (ej: _req)
  
  'no-console': 'warn',                               // Usa Logger de NestJS en su lugar
  'eqeqeq': ['error', 'always'],                      // Comparaciones estrictas siempre
  'curly': 'error',                                   // Siempre usa llaves en ifs/loops

  // --- PRETTIER & FORMATO ---
  'prettier/prettier': ['warn', { 
    endOfLine: 'auto',
    singleQuote: true,                                // Estándar en NestJS
    trailingComma: 'all',
  }],
},
  },
);
