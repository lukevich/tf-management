/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ROOT = path.resolve(__dirname);
const ENTRY = path.resolve(ROOT, 'src');

module.exports = {
    entry: [path.resolve(ENTRY, 'index.js')],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                        extends: path.resolve(ROOT, '.babelrc'),
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.(woff|woff2|otf|ttf|eot|png|jpe?g|svg|gif|glsl)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/',
                    publicPath: './assets',
                },
            },
            {
                test: /\.(css|sass|scss)$/,
                exclude: /\.notmodule\.(css|sass|scss)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: true,
                    },
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        importLoaders: 2,
                        modules: {
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
                    },
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    },
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                }],
            },
            {
                test: /\.notmodule\.(css|sass|scss)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: true,
                    },
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        importLoaders: 2,
                        modules: false,
                    },
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    },
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                }],
            },
        ],
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: path.resolve(ENTRY, 'index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'static/[name].[hash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'config.json', to: 'config.json' },
            ],
        }),
    ],
    devtool: 'source-map',
};
