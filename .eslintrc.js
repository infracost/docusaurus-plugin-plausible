module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 12,
  },
  rules: {
  },
};
