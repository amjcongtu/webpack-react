const path = require("path");
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  /* đây là file đầu tiên mà webpack sẽ đọc ở đây mình để index.js */
  entry: path.resolve(__dirname, "./src/index.tsx"),
  // doc file
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    fallback: {
      buffer: require.resolve('buffer'),
    },
  },
  /* cấu hình thư mục đầu ra là dist và tên file là index.bundle.js,

  clean dùng để reset thư mục dist khi build */
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
    clean: true,
    publicPath: '/',
  },
  /* đoạn code sau sẽ load các gói babel vào webpack */
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|webp)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed) || {},
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
   
  ],
};
