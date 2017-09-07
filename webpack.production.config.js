const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: {
    app: ['./src/index.jsx'],
    vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-router-dom',
      'classnames'
    ],
  },
  output: {
    path: path.resolve(__dirname, "static"),
    // filename: "[name].js"
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].js.map',
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js",
      // (with more entries, this ensures that no other module goes into the vendor chunk)
    }),
    // compile time plugins
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.bundle.js']
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015'],
          plugins: [require('babel-plugin-transform-object-rest-spread'),
          ["import", { libraryName: "antd", style: "css" }]]
        }
      }]
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {}
      }]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
};
