module.exports = {
  env: {
    es2020: true,
    browser: true,
  },
  extends: [
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './src/frontend/tsconfig.json',
  },
  settings: {
    'import/resolver': 'webpack',
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'never',
        styl: 'always',
      },
    ],

    'import/prefer-default-export': 'off',

    // typescript 関連
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    // 短縮表現のため
    'no-return-assign': 'off',
  },
};
