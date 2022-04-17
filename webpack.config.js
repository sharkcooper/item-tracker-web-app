const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    open: true,
  },
  mode: "development",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
      path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
        {
            test: /\.?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        },
        {
            test: /\.?css$/,
            exclude: /node_modules/,
            use: ["style-loader", "css-loader"]
        }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: path.join(__dirname, "src", "index.html"),
      }),
  ],
}