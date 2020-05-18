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
    "transform-react-pure-class-to-function",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-transform-object-super",
    "babel-plugin-dynamic-import-polyfill" // fix for https://github.com/babel/babel/issues/9872
  ],
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current",
        "browsers": ["> 2%", "last 3 versions", "ie >= 7"]
      },
      "modules": "auto",
      "loose": true,
      "useBuiltIns": "usage",
      "corejs": 3
    }],
    "@babel/preset-react"
  ],
  "env": {
    "development": {
      "plugins": [
        "react-hot-loader/babel",
        "babel-plugin-transform-react-class-displayname",
        "@babel/plugin-transform-react-jsx-self",
        "@babel/plugin-transform-react-jsx-source"
      ]
    },
    "production": {
      "plugins": [
        "@babel/plugin-transform-react-inline-elements",
        "transform-react-remove-prop-types",
        "closure-elimination"
      ]
    }
  }
}
