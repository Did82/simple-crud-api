const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
  ],
};

module.exports = config;
