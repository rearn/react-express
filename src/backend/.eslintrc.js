module.exports = {
  env: {
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './src/backend/tsconfig.json',
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    // typescript 関連
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    // 短縮表現のため
    'no-return-assign': 'off',
  },
};
