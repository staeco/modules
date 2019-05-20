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
    "@babel/plugin-proposal-optional-chaining"
  ],
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current",
        "browsers": ["> 5%", "last 2 versions", "not ie < 11"]
      },
      "modules": "auto",
      "loose": true,
      "useBuiltIns": "usage",
      "corejs": "core-js@2"
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
        //"@babel/transform-react-constant-elements",
        "@babel/transform-react-inline-elements",
        "transform-react-remove-prop-types",
        "closure-elimination"
      ]
    }
  }
}
