const path = require('path');
const webpack = require('webpack');
const ntmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const args = require('yargs').argv;

let styleLoader = ['style-loader', 'css-loader', 'sass-loader'];

const plugins = [
  new ntmlPlugin(),
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
  new webpack.HotModuleReplacementPlugin()
];

if (args.env && args.env.style) {
  plugins.push (
    new ExtractTextPlugin({
      filename: 'main.css'
    })
  );

  styleLoader = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader", "sass-loader"]
  });
}

module.exports = {
  entry: {
    main: './app.js',
    vendor: ['jquery']
  },
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.s?css$/,
        use: styleLoader
      }
    ]
  },

  plugins,

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    port: 9000,
    hot: !(args.env && args.env.style)
  }
};