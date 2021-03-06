const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './index.js',
    devtool: 'nosources-source-map',
    // devtool: 'source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
        // 更改 source map 中 `sources` 地址
        // 默认是 'webpack://[namespace]/[resource-path]?[loaders]'
        // 在 Chrome DevTools 的 Sources 面板看到了 webpack:// 协议，
        // 不过它只是个地址
        devtoolModuleFilenameTemplate: '../example04-webpack/[resource-path]',
        // devtoolModuleFilenameTemplate: 'litilexuezha://[namespace]/[resource-path]?[loaders]',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                }],
            }, {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: [],
                        },
                    }, {
                        loader: 'less-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'index.css' }),
    ],
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({ sourceMap: true }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: { inline: false, annotation: true, sourcesContent: false },
                },
            }),
        ],
    },
};
