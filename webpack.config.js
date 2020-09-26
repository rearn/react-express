const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/frontend/index.tsx',
  output: {
    path: path.resolve('dist', 'frontend'),
    filename: '[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.json', '.styl'],
    alias: {
      '^': path.resolve(__dirname, 'src', 'frontend'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.frontend.json',
        },
        include: /src\/frontend/,
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'stylus-loader' },
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/frontend/index.html'),
      inject: true,
    }),
  ]
}; 
