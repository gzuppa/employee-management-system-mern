const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    new HtmlWebpackPlugin({
      template: './static/index.html',
      inject: 'body',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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
    // webpack-dev-server enhancement plugins
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
  devServer: {
    hot: true,
    hotOnly: true,
    inline: true,
    open: true,
    compress: true,
    // host: "0.0.0.0",
    port: 8000,
    contentBase: path.join(__dirname, 'static'),
    proxy: {
      '/api': 'http://localhost:8080'
    },
    historyApiFallback: true,
    clientLogLevel: "none",
    watchOptions: {
      // poll: true
    }
  },
  devtool: 'cheap-module-eval-source-map',
};
