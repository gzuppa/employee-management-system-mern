const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


let pathsToClean = [
  'static/dist',
  'build'
];

module.exports = {
  entry: {
    app: './client/index.jsx',
    vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-router-dom',
      'classnames'
    ],
  },
  output: {
    path: path.resolve(__dirname, "static/dist"),
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].js.map',
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
  ]
};
