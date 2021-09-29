module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'project': './tsconfig.json'
  },
  env: {
    'node': true
  },
  extends: ['airbnb'],
  rules: {
    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692505191
    'no-use-before-define': 0,
    // https://github.com/babel/babel-eslint/issues/8
    'no-unused-vars': 0,

    'no-extra-semi': 0,
    'new-cap': 0,
    'object-curly-newline': 0,
    'arrow-body-style': 0,
    'import/prefer-default-export': 0,
    'no-empty-pattern': 0,
    'linebreak-style': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
  }
};
