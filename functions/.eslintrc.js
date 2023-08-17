module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaVersion: 2018,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
    'object-curly-spacing': [2, 'always'],
    'linebreak-style': ['error', 'windows'],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      files: ['**/*.spec.*'],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
