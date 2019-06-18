module.exports = {
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-8-point-grid',
    'stylelint-prettier/recommended'
  ],
  plugins: [
    'stylelint-declaration-strict-value'
  ],
  rules: {
    'selector-list-comma-newline-after': null,
    'selector-class-pattern': null,
    'selector-no-qualifying-type': null,
    'shorthand-property-no-redundant-values': true,
    'color-named': 'always-where-possible',
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'max-nesting-depth': 32,
    'selector-max-compound-selectors': 32,
    'scale-unlimited/declaration-strict-value': [
      [
        '/color/',
        'fill',
        'stroke',
        'font-size',
        'font-weight'
      ],
      {
        disableFix: true,
        ignoreKeywords: [
          'inherit',
          'currentColor',
          'transparent',
          'none',
          'initial',
          'exact'
        ]
      }
    ],
    'plugin/8-point-grid': {
      base: 4,
      ignore: [
        'width',
        'height',
        'min-width',
        'min-height',
        'max-width',
        'max-height'
      ]
    }
  }
}
