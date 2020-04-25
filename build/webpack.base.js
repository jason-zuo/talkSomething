const autoprefixer = require('autoprefixer');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, '../src/renderer/main.js'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /.vue$/,
                use: [
                    {
                        loader: "vue-loader",
                        options: {
                            loaders: {
                                "scss": "vue-style-loader!css-loader!sass-loader",
                                "sass": "vue-style-loader!css-loader!sass-loader"
                            }
                        }
                    }
                ]

            },
            {
                test: /.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    browsers: ['last 2 version', '>1%', 'ios 7'],
                                }),
                            ],
                        },
                    },
                    'sass-loader'
                ],
            },
            {
                test: /.(png|jpg|gif|jpeg|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                        },
                    },
                ],
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, '../src/renderer'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            inlineSource: '.css$',
            template: path.join(__dirname, '../src/renderer/index.html'),
            filename: `index.html`,
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false,
            },
        }),
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        // function errorPlugin() {
        //     this.hooks.done.tap('done', (stats) => {
        //         if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
                    // process.exit(1);
                // }
            // });
        // }
    ],
    stats: 'errors-only',
};
