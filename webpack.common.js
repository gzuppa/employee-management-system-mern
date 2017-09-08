const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.jsx',
    vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-router-dom',
      'classnames'
    ],
  },
  output: {
    path: path.resolve(__dirname, "static/dist"),
    // filename: "[name].js"
    // chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].js.map',
  },
  plugins: [
    new CleanWebpackPlugin(["static/dist"]),
    new HtmlWebpackPlugin({
      template: './static/index.html',
      inject: 'body',
    })
  ]
};
