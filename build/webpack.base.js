"use strict";

const path = require('path');
const webpack = require('webpack');
const miniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode : 'development',
    entry: "./client/main.js",
    output: {
        filename : "[name]_[chunkhash:8].js",
        path : path.join(__dirname, '../dist')
    },
    module: {
        rules:[
            {
                test: /.js$/,
                use : "babel-loader"
            },
            {
                test: /.css$/,
                use : [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: "file-loader"
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use : "file-loader",
                options: {
                    name: 'img/[name][hash:8][ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new miniCssExtractPlugin({
            filename: "[name]_[contenthash:8].css"
        })
    ],
    devServer: {
        contentBase: '../dist',
        hot: true
    }

};
