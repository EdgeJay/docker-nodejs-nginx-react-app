module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['**/dist/**.*'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/standard',
    'prettier/@typescript-eslint',
  ],
  plugins: ['react', 'react-hooks', 'prettier', 'jsx-a11y', 'import', '@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // add your custom rules here
  rules: {
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'import/extensions': 'off',
    'react/jsx-props-no-spreading': [
      'error',
      {
        custom: 'ignore',
      },
    ],
    'react/no-did-mount-set-state': 'off',
    'react/destructuring-assignment': 'off',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'react/prop-types': 'error',
    'prefer-destructuring': 'off',
    'class-methods-use-this': 'off',
    'destructuring-assignment': 'off',
    'react/forbid-prop-types': ['error', { forbid: ['any'] }],
    'react/jsx-filename-extension': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-this-alias': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/camelcase': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-namespace': [
          'error',
          {
            allowDeclarations: true,
            allowDefinitionFiles: true,
          },
        ],
        'import/no-unresolved': 'off',
        'react/prop-types': 'off',
        'react/sort-comp': [
          'error',
          {
            order: [
              'static-variables',
              'static-methods',
              'instance-variables',
              '/^constructor/',
              'lifecycle',
              'everything-else',
              'render',
            ],
            groups: {
              lifecycle: [
                'componentWillMount',
                'componentDidMount',
                'componentWillReceiveProps',
                'shouldComponentUpdate',
                'componentWillUpdate',
                'componentDidUpdate',
                'componentWillUnmount',
              ],
            },
          },
        ],
      },
    },
  ],
};
