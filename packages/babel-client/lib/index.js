module.exports = {
  "plugins": [
    "add-module-exports",
    "@babel/syntax-dynamic-import",
    // decorators must be before class-properties
    // legacy decorator behavior means class props needs "loose" mode
    // https://babeljs.io/docs/en/next/babel-plugin-proposal-decorators.html#legacy
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-proposal-object-rest-spread", { "useBuiltIns": true }],
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-transform-object-super",
    "babel-plugin-dynamic-import-polyfill" // fix for https://github.com/babel/babel/issues/9872
  ],
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current",
        "browsers": ["> 2%", "last 2 versions", "not ie < 11"]
      },
      "modules": "auto",
      "loose": true,
      "useBuiltIns": "usage",
      "corejs": 3
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
