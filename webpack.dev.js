const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common.config, {
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        contentBase: common.DIST_DIR,
        historyApiFallback: true
    }
});