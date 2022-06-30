// Designed for react packages
module.exports = {
  "plugins": [
    "add-module-exports",
    // decorators must be before class-properties
    // legacy decorator behavior means class props needs "loose" mode
    // https://babeljs.io/docs/en/next/babel-plugin-proposal-decorators.html#legacy
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-proposal-object-rest-spread", { "loose": true, "useBuiltIns": true }], // force it to use Object.assign
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-transform-object-super",
    "closure-elimination"
  ],
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current",
        "browsers": [ ">2%", "last 2 versions", "not dead" ]
      },
      "modules": "auto",
      "loose": true,
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ]
}
