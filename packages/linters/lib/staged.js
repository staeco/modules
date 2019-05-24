module.exports = {
  concurrent: true,
  linters: {
    '*.js': [
      'eslint --fix --quiet',
      'git add'
    ],
    '*.scss': [
      'stylelint --fix --syntax scss --quiet',
      'git add'
    ],
    '*.yaml': [
      'prettier'
    ],
    '*.json': [
      'prettier'
    ],
    '*.md': [
      'prettier'
    ],
    './deployment/**/*.yaml': [
      'yarn kube:validate'
    ],
    './services/**/kube.yaml': [
      'yarn kube:validate'
    ],
    './product-services.yaml': [
      'yarn kube:validate'
    ],
    './kube.yaml': [
      'yarn kube:validate'
    ]
  }
}
