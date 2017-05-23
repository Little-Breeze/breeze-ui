'use strict';

let gulp = require('gulp');
let webpack = require('webpack');
var $ = require('gulp-load-plugins')();
let gutil = require('gulp-util');

let getWebpackConfig = require('./webpack.base.config');
let webpackConf = getWebpackConfig();

let app = process.cwd() + '/examples';
let dist = process.cwd() + '/dist';

// clean dist
gulp.task('clean', () => {
    let clean = require('gulp-clean');
    return gulp.src(dist, {read: true}).pipe(clean());
});

// run webpack pack
gulp.task('pack', ['clean'], (done) => {
    webpack(webpackConf, (err, stats) => {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({colors: true}));
        done();
    })
})

gulp.task('default', ['pack']);

