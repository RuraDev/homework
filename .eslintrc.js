module.exports = {
  plugins: ["react"],

  env: {
    es6: true,
    browser: true,
    jasmine: true,
    commonjs: true,
  },

  globals: {
    React: false,
    PropTypes: false,
    __ENVIRONMENT__: false,
  },

  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: "module"
  },

  rules: {

  }
};
