const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const EslingPlugin = require("eslint-webpack-plugin");
// const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  mode: "development",
  module: {
    rules: [
      { test: /\.ts$/i, use: "ts-loader" },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
          test: /\.(scss)$/,
          use: [
              {
                  loader: 'style-loader',
              },
              {
                  loader: 'css-loader',
              },
              {
                  loader: 'postcss-loader',
                  options: {
                      postcssOptions: {
                          plugins: () => [require('autoprefixer')],
                      },
                  },
              },
              {
                  loader: 'sass-loader',
              },
          ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ""],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist"),
    assetModuleFilename: "assets/[name][ext]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new EslingPlugin({ extensions: "ts" }),
    // new CopyPlugin({
    //     patterns: [
    //         {
    //             from: path.resolve(__dirname, 'src', 'img'),
    //             to: path.resolve(__dirname, 'dist', 'assets'),
    //         },
    //     ],
    // }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === "prod";
  const envConfig = isProductionMode
    ? require("./webpack.prod.config")
    : require("./webpack.dev.config");

  return merge(baseConfig, envConfig);
};
