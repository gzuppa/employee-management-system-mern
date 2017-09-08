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
    publicPath: '/static/',
    path: path.resolve(__dirname, "dist"),
    // filename: "[name].js"
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].js.map',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './static/index.html',
      inject: 'body',
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
