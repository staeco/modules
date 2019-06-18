module.exports = {
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: '*.yaml',
      options: {
        singleQuote: false
      }
    }
  ]
}
