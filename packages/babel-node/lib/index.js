module.exports = {
  "plugins": [
    "add-module-exports",
    "@babel/syntax-dynamic-import",
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-proposal-object-rest-spread", { "useBuiltIns": true }],
    "@babel/plugin-proposal-optional-chaining"
  ],
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      },
      "modules": "auto",
      "loose": true,
      "useBuiltIns": "usage",
      "corejs": "core-js@2"
    }]
  ],
  "env": {
    "production": {
      "plugins": [
        "closure-elimination"
      ]
    }
  }
}
