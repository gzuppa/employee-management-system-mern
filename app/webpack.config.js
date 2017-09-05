const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/index.jsx'],
    vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-router-dom', 'antd',
      'classnames'
    ],
  },
  output: {
    path: path.resolve(__dirname, "static"),
    // filename: "[name].js"
    filename: '[name].[hash].min.js',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].[hash].min.js',
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: './static/index.html',
      inject: 'body',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js",
      // (with more entries, this ensures that no other module goes into the vendor chunk)
    }),
    // compile time plugins
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.bundle.js']
    }),
    new webpack.HotModuleReplacementPlugin(),
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
            plugins: [require('babel-plugin-transform-object-rest-spread')]
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
  devServer: {
    hot: true,
    port: 8000,
    contentBase: 'static',
    proxy: {
      '/api': 'http://localhost:8080'
    },
    historyApiFallback: true
  },
  devtool: 'cheap-module-eval-source-map',
  watchOptions: {
    poll: true
  }
};
