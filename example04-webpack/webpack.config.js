const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './index.js',
    devtool: 'nosources-source-map',
    devServer: {
        hot: true,
        port: 9005,
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
};
