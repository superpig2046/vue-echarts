/**
 * Created by yonghan on 16/9/22.
 */

// webpack.config.js
var webpack = require("webpack");
const glob = require('glob');
var config = {
    entry: {
        vendor: [
            'vue','echarts'
        ]
    },
    output: {
        path: __dirname + '/dist/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: { presets: [ 'es2015', 'stage-0'] }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ]
};
/**
 * find entries
 */
var files = glob.sync('./src/js/*/*.js');
console.log('>>>>>>', files);
var newEntries = files.reduce(function(memo, file) {
    var name = /.*\/(.*?)\/(.*?)\.js/.exec(file)[1];
    memo[name] = entry(name);
    return memo;
}, {});
console.log('>>>>> new Entries', newEntries);
config.entry = Object.assign({}, config.entry, newEntries);
/**
 * [entry description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function entry(name) {
    return './src/js/' + name + '/index.js';
}
module.exports = config;