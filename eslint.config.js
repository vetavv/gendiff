import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import pluginJest from 'eslint-plugin-jest';

export default [
  {
    ignores: ['dist/'],
  },
  pluginJs.configs.recommended,
  stylistic.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
      'jest': pluginJest,
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...pluginJest.environments.globals.globals,
      },
    },
  },
  {
    files: ['**/*.js'],
    rules: {
    },
  },
];
