const webpack = require("webpack");
const ReactRefreshWebPackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const Dotenv = require("dotenv-webpack");

// todo

module.exports = {
  mode: "development",
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
  devtool: "cheap-module-source-map",
  plugins: [new Dotenv(), new ReactRefreshWebPackPlugin()],
};
