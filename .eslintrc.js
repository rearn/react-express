module.exports = {
  env: {
    es2020: true,
    node: true,
    browser: true,
  },
  extends: [
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': 'webpack',
  },
  plugins: [
    '@typescript-eslint',
  ],
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
  globals: {
    NodeJS: true,
  },
  
  overrides: [
    {
      files: [
        '**/tests/**/*.test.{j,t}s(x)?',
      ],
      env: {
        jest: true,
      },
    },
    {
      files: [
        'src/frontend/**/*.{j,t}s(x)?',
      ],
      extends: [
        'eslint:recommended',
        'react-app',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
      ],
    },
    {
      files: [
        'src/backend/**/*.{j,t}s?',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
    },
  ],
};
