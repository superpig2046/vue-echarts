/**
 * Created by yonghan on 16/9/22.
 */

// gulpfile.js
var gulp = require("gulp");
var gutil = require("gulp-util");
var src = {
    // html 文件
    html: "src/html/*.html",
    // vendor 目录和 bower_components
    vendor: ["vendor/**/*", "bower_components/**/*"],
    // style 目录下所有 xx/index.less
    style: "src/style/*/*.less",
    // 图片等应用资源
    assets: "assets/**/*"
};

var dist = {
    root: "dist/",
    html: "dist/",
    style: "dist/style",
    vendor: "dist/vendor",
    assets: "dist/assets"
};

var bin = {
    root: "bin/",
    html: "bin/",
    style: "bin/style",
    vendor: "bin/vendor",
    assets: "bin/assets"
};

var del = require("del");

/**
 * clean build dir
 */
function clean(done) {
    del.sync(dist.root);
    done();
}

/**
 * [cleanBin description]
 * @return {[type]} [description]
 */
function cleanBin(done) {
    del.sync(bin.root);
    done();
}

/**
 * [copyVendor description]
 * @return {[type]} [description]
 */
function copyVendor() {
    return gulp.src(src.vendor)
        .pipe(gulp.dest(dist.vendor));
}

/**
 * [copyAssets description]
 * @return {[type]} [description]
 */
function copyAssets() {
    return gulp.src(src.assets)
        .pipe(gulp.dest(dist.assets));
}

/**
 * [copyDist description]
 * @return {[type]} [description]
 */
function copyDist() {
    return gulp.src(dist.root + '**/*')
        .pipe(gulp.dest(bin.root));
}

/**
 * [html description]
 * @return {[type]} [description]
 */
function html() {
    return gulp.src(src.html)
        .pipe(gulp.dest(dist.html))
}

var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

/**
 * [style description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */

var cached = require('gulp-cached');

function style() {
    return gulp.src(src.style)
        .pipe(cached('style'))
        .pipe(less())
        .on('error', handleError)
        .pipe(autoprefixer({
            browsers: ['last 3 version']
        }))
        .pipe(gulp.dest(dist.style))
}

exports.style = style;

/**
 * [minify css files]
 */

var minifycss = require('gulp-minify-css');

function miniStyle(){
    return gulp.src(dist.style+'/*/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest(bin.style))

}

exports.miniStyle = miniStyle

/**
 * [handleError description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function handleError(err) {
    if (err.message) {
        console.log(err.message)
    } else {
        console.log(err)
    }
    this.emit('end')
}

/**
 * [webpack 相关的依赖]
 * @type {[type]}
 */
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

/**
 * [webpackDevelopment description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
var devConfig, devCompiler;

devConfig = Object.create(webpackConfig);
devConfig.devtool = "sourcemap";
devConfig.debug = true;
devCompiler = webpack(devConfig);

function webpackDevelopment(done) {
    devCompiler.run(function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-dev", err);
            return;
        }
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        done();
    });
}

/**
 * [webpackProduction description]
 * production 任务中添加了压缩和打包优化组件，且没有 sourcemap
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function webpackProduction(done) {
    var config = Object.create(webpackConfig);
    config.plugins = config.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": "production"
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:production]", stats.toString({
            colors: true
        }));
        done();
    });
}

/**
 * [connectServer description]
 * @return {[type]} [description]
 */
var connect = require('gulp-connect');
var rest = require('connect-rest');
//var mocks = require('./mocks');
var proxy = require('http-proxy-middleware');

function connectServer(done) {
    connect.server({
        root: dist.root,
        port: 8090,
        livereload: true,
        /**
        middleware: function(connect, opt) {
            return [
                proxy('/firefly',{
                    target: 'http://localhost:8000',
                    changeOrigin: true,
                })
            ]
        }*/
    });
    //mocks(rest);
    done();
}

/**
 * [watch description]
 * @return {[type]} [description]
 */
function watch() {
    gulp.watch(src.html, html);
    gulp.watch("src/**/*.js", webpackDevelopment);
    gulp.watch("src/**/*.vue", webpackDevelopment);
    gulp.watch("src/**/*.less", style);
    gulp.watch("dist/**/*").on('change', function(file) {
        console.log('>>>> detect dist change');
        gulp.src('dist/')
            .pipe(connect.reload());
    });
}

/**
 * default task
 */
gulp.task("default", gulp.series(
    clean,
    gulp.parallel(copyAssets, copyVendor, html, style, webpackDevelopment),
    connectServer,
    watch
));

/**
 * production build task
 */
gulp.task("build", gulp.series(
    clean,
    gulp.parallel(copyAssets, copyVendor, html, style, webpackProduction),
    cleanBin,
    copyDist,
    miniStyle,
    function(done) {
        console.log('build success');
        done();
    }
));