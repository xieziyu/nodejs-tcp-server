'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var uglifyes = require('uglify-es');
var composer = require('gulp-uglify/composer');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var watchify = require("watchify");
var gutil = require("gulp-util");
var pump = require('pump');

var uglify = composer(uglifyes, console);

// browserify options
var opt = {
    dev: {
      basedir: '.',
      debug: true,
      entries: ['src/main.dev.ts'],
      bundleExternal: false
    },
    prod: {
      basedir: '.',
      debug: true,
      entries: ['src/main.prod.ts'],
      bundleExternal: false
    },
    test: {
      basedir: '.',
      debug: true,
      entries: ['src/client-test.ts'],
      bundleExternal: false
    }
};

var target = {
  dev: 'app.dev.js',
  prod: 'app.min.js'
};

// Main tasks:
//====================================================
// build dev version
gulp.task('build:dev', function(cb) {
  pump([
    browserify(opt.dev).plugin(tsify).bundle(),
    source(target.dev),
    gulp.dest('dist')
  ], cb);
});

// build production version
gulp.task('build:prod', function(cb) {
  pump([
    browserify(opt.prod).plugin(tsify).bundle(),
    source(target.prod),
    buffer(),
    sourcemaps.init({loadMaps: true}),
    uglify(),
    sourcemaps.write('./'),
    gulp.dest('dist')
  ], cb);
});

gulp.task('build:package', function(cb) {
  pump([
    gulp.src('src/package.json'),
    gulp.dest('dist')
  ], cb);
});

// test client
gulp.task('build:client', function(cb) {
  pump([
    browserify(opt.test).plugin(tsify).bundle(),
    source('client.js'),
    gulp.dest('dist')
  ], cb);
});

// watch browserify changes
var watcher = watchify(browserify(opt.dev).plugin(tsify));

gulp.task('watch', function(cb) {
  pump([
    watcher.bundle(),
    source(target.dev),
    gulp.dest('dist')
  ], cb);
});

watcher.on("update", function() {
  pump([
    watcher.bundle(),
    source(target.dev),
    gulp.dest('dist')
  ], function(err) {
    if (err) {
      console.log('Error: ', err);
    }
  });
});
watcher.on("log", gutil.log);

// Task Shortcuts:
//====================================================
gulp.task('default', ['build:dev']);
gulp.task('prod', ['build:prod', 'build:package']);
gulp.task('both', ['prod', 'build:client']);