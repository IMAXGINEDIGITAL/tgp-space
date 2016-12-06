var webpack = require('webpack');
var path = require('path');

var root = path.resolve(__dirname, '..');

module.exports = {
    entry: {
        preload: [
            path.join(root, 'src', 'preload.js')
        ],
        game: [
            path.join(root, 'src', 'game.js')
        ]
    },
    output : {
        path: path.join(root, 'dist'),
        filename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            include: [
                path.join(root, 'src')
            ]
        },{
            test: /\.css$/,
            loader: 'style!css',
            include: [
                path.join(root, 'src')
            ]
        }, {
            test: /\.json$/,
            loader: 'json',
            include: [
                path.join(root, 'src')
            ]
        }]
    },
    plugins: []
}