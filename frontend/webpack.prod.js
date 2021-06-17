const merge = require('webpack-merge');
const common = require('./webpack');

module.exports = merge.strategy({ entry: 'prepend' })(common, {
    mode: 'production',
})