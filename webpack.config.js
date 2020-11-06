const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');

 console.log(path.resolve(__dirname, "./src","index.html"))
module.exports = {
  mode: 'development',
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "main.js"
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
        }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "./src","index.html"), to: path.resolve(__dirname, "./build") }, 
        { from: path.resolve(__dirname, "./assets","**/*"), to: path.resolve(__dirname, "./build") }, 
      ],
    }),
  ],
  devtool: 'source-map'
};