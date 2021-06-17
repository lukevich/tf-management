/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const common = require('./webpack');

module.exports = merge.strategy({ entry: 'prepend' })(common, {
    mode: 'development',
    stats: 'minimal',
    devServer: {
        open: true,
        hot: true,
    },
});
