const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const APP_DIR = path.resolve(__dirname, 'src/client/app');
const STATIC_DIR = path.resolve(APP_DIR, 'static');
const DIST_DIR = path.resolve(__dirname, 'dist');
const PUBLIC_DIR = path.resolve(DIST_DIR, 'public');

const config = {
    context: APP_DIR,
    entry: './main.jsx',

    plugins: [
        new HtmlWebpackPlugin({ title: 'NeuroTech', template: 'static/index.html' }),
        new CleanWebpackPlugin([DIST_DIR]),
        new ExtractTextPlugin("public/style.css")
    ],
    output: {
        path: DIST_DIR,
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'assets': STATIC_DIR,
            'components': path.resolve(APP_DIR, 'components')
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.s?css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'], publicPath: '../' }) },
            { test: /\.jsx?$/, exclude: path.resolve(__dirname, 'node_modules'), use: 'babel-loader' },
            { test: /favicon\.ico/, use: 'file-loader?name=./favicon.ico'  },
            { test: /\.(jpe?g|gif|png|svg|woff2?|eot|ttf|wav|mp3)$/, use: 'file-loader?name=./public/[name].[ext]'  },
            //{ test: /\.html?$/, loader: "file", options: { context: DIST_DIR }},
        ]
    }
};

module.exports = {
    DIST_DIR,
    PUBLIC_DIR,
    APP_DIR,
    STATIC_DIR,
    config
};