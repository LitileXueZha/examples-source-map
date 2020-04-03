const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        filename: 'js/[name]-[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    devtool: 'hidden-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
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
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'css/[name]-[contenthash].css' }),
        new HtmlWebpackPlugin({ template: './index.html' }),
        // new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
        new webpack.DefinePlugin({ API: JSON.stringify('') }),
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
        runtimeChunk: { name: 'main' },
        splitChunks: {
            minChunks: 1,
            cacheGroups: {
                vendors: {
                    chunks: 'all',
                    test: /[\/\\]node_modules[\/\\]/,
                    priority: -10,
                },
                antd: {
                    chunks: 'all',
                    test: /([\/\\]antd[\/\\])|(ant-design)/,
                    priority: -9,
                },
            },
        },
    },
};
