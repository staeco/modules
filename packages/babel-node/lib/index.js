module.exports = {
  "plugins": [
    "add-module-exports",
    "@babel/syntax-dynamic-import",
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    "closure-elimination"
  ],
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      },
      "modules": "auto",
      "loose": true,
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ]
}
