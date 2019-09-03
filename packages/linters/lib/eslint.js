module.exports = {
  globals: {
    __DEV__: true,
    __BUILD_STATE__: true,
    __PROD__: true,
    util: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    },
    ecmaVersion: 2016,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: '16.0'
    }
  },
  env: {
    browser: true,
    es6: true,
    mocha: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:array-func/recommended'
  ],
  plugins: [
    'babel',
    'react',
    'mocha',
    'compat',
    'import',
    'no-loops',
    'prefer-arrow',
    'promise'
  ],
  rules: {
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false
      }
    ],
    'array-bracket-spacing': [
      2,
      'always'
    ],
    'array-callback-return': 1,
    'arrow-parens': 2,
    'arrow-spacing': 1,
    curly: [
      'error',
      'multi-line',
      'consistent'
    ],
    'callback-return': 1,
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'comma-dangle': [
      2,
      'never'
    ],
    'dot-notation': 1,
    'dot-location': [
      2,
      'property'
    ],
    'eol-last': 2,
    'handle-callback-err': 1,
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'jsx-quotes': [
      2,
      'prefer-double'
    ],
    'brace-style': 1,
    'keyword-spacing': 1,
    'new-parens': 1,
    'no-await-in-loop': 1,
    'no-self-compare': 1,
    'no-throw-literal': 1,
    'no-console': 0,
    'no-debugger': 0,
    'no-else-return': 1,
    'no-extra-parens': 1,
    'no-floating-decimal': 1,
    'no-implicit-coercion': 0,
    'no-mixed-spaces-and-tabs': 1,
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    'no-path-concat': 1,
    'no-return-await': 1,
    'no-trailing-spaces': 1,
    'no-unneeded-ternary': 1,
    'no-unused-vars': [
      2,
      {
        ignoreRestSiblings: true,
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'no-useless-concat': 1,
    'no-useless-call': 1,
    'no-useless-constructor': 1,
    'no-useless-return': 1,
    'no-var': 2,
    'no-with': 1,
    'vars-on-top': 1,
    'object-curly-spacing': [
      2,
      'always'
    ],
    'template-curly-spacing': [
      'error',
      'never'
    ],
    'prefer-promise-reject-errors': 1,
    'prefer-template': 1,
    'prefer-arrow-callback': 1,
    'arrow-body-style': [
      'error',
      'as-needed'
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        singleReturnOnly: true,
        classPropertiesAllowed: true
      }
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'react/forbid-prop-types': 0,
    'react/jsx-boolean-value': 1,
    'react/jsx-closing-bracket-location': [
      1,
      'after-props'
    ],
    'react/jsx-curly-spacing': [
      1,
      {
        when: 'never',
        children: true
      }
    ],
    'react/jsx-equals-spacing': 1,
    'react/jsx-first-prop-new-line': [
      1,
      'multiline'
    ],
    'react/jsx-tag-spacing': 1,
    'react/jsx-indent': [
      2,
      2
    ],
    'react/jsx-indent-props': [
      2,
      2
    ],
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 5
      }
    ],
    'react/jsx-no-bind': [
      0,
      {
        ignoreRefs: true
      }
    ],
    'react/display-name': 0,
    'react/jsx-pascal-case': 1,
    'react/jsx-wrap-multilines': 0,
    'react/no-danger': 1,
    'react/no-deprecated': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-multi-comp': 0,
    'react/prefer-es6-class': 1,
    'react/self-closing-comp': 1,
    'react/sort-comp': 1,
    'react/style-prop-object': 1,
    'react/jsx-curly-brace-presence': [
      2,
      {
        props: 'never',
        children: 'ignore'
      }
    ],
    'react/no-unused-state': 2,
    'react/no-unused-prop-types': 2,
    'react/default-props-match-prop-types': 2,
    'react/no-typos': 1,
    'react/void-dom-elements-no-children': 2,
    'react/no-access-state-in-setstate': 2,
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-identical-title': 'error',
    'mocha/no-nested-tests': 'error',
    'computed-property-spacing': 1,
    'func-call-spacing': 1,
    semi: [
      2,
      'never'
    ],
    'space-before-blocks': [
      2,
      'always'
    ],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'never'
      }
    ],
    'space-in-parens': [
      'error',
      'never'
    ],
    strict: 0,
    yoda: 1,
    'require-atomic-updates': 0, // always has false positives
    'no-loops/no-loops': 2,
    'import/first': 2,
    'import/no-duplicates': 2,
    'import/newline-after-import': 2,
    'import/no-anonymous-default-export': [
      'warn',
      {
        allowArray: true,
        allowArrowFunction: true,
        allowAnonymousClass: false,
        allowAnonymousFunction: true,
        allowCallExpression: true,
        allowLiteral: true,
        allowObject: true
      }
    ],
    'import/dynamic-import-chunkname': 1,
    'promise/always-return': 'off',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'error',
    'promise/no-promise-in-callback': 'off',
    'promise/no-callback-in-promise': 'off',
    'promise/avoid-new': 'off',
    'promise/no-new-statics': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/valid-params': 'error'
  }
}
