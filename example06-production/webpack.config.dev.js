const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './index.js',
    stats: 'minimal',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
    },
    devServer: {
        port: 9006,
        hot: true,
        // contentBase: './example05-webpack-dev',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                }],
            }, {
                test: /\.less$/,
                use: [
                    'style-loader',
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
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new webpack.DefinePlugin({ API: JSON.stringify('http://localhost:9009') }),
    ],
};
