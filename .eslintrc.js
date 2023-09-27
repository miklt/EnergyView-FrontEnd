module.exports = {
  // Ignore certain files from linting
  ignorePatterns: [
    'karma.conf.js',
    '.eslintrc.js',
    '.stylelintrc.js'
  ],

  // Environment settings
  env: {
    browser: true, // Enables browser environment
    es2021: true, // Enables ES2021 syntax
  },

  // Extends configurations from recommended rules
  extends: [
    'eslint:recommended', // ESLint recommended rules
    'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
  ],

  // Specify the parser for TypeScript
  parser: '@typescript-eslint/parser',

  // Parser options
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ECMAScript version
    sourceType: 'module', // Use ECMAScript modules
  },

  // Plugins used in the configuration
  plugins: ['@typescript-eslint'],

  // Custom ESLint rules
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'error', // Enforce no non-null assertion
    indent: ['error', 2], // Enforce 2-space indentation
    quotes: ['error', 'single'], // Enforce single quotes for strings
    semi: ['error', 'always'], // Enforce semicolons
    curly: 'error', // Enforce consistent curly brace style
    "eol-last": ["error", "always"], // Enforce that every file has an empty line at the end
    'brace-style': ['error', 'stroustrup'], // Enforce Stroustrup brace style
    'no-empty-function': ['error', { allow: ['constructors'] }], // Disallow empty functions, except constructors
    'keyword-spacing': 'error', // Enforce consistent spacing around keywords
    'space-before-blocks': 'error', // Enforce space before blocks
    'arrow-spacing': 'error', // Enforce spacing around arrow functions
    'switch-colon-spacing': 'error', // Enforce spacing around switch colons
  },
};
