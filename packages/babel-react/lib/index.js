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
    "transform-react-pure-class-to-function",
    "@babel/plugin-transform-object-super"
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
    }],
    [ "@babel/preset-react", { "runtime": "automatic" } ]
  ],
  "env": {
    "development": {
      "plugins": [
        "babel-plugin-transform-react-class-displayname",
        "@babel/plugin-transform-react-jsx-self",
        "@babel/plugin-transform-react-jsx-source"
      ]
    },
    "production": {
      "plugins": [
        "@babel/plugin-transform-react-inline-elements",
        "transform-react-remove-prop-types",
        "@babel/transform-react-constant-elements",
        "closure-elimination"
      ]
    }
  }
}
