const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  output: {
    // this will solving caching issue
    filename: "[name].[contenthash].js",
    // for production post-fix purposes
    publicPath: "/tiger-lab-assessment/latest/",
  },
  plugins: [],
};
