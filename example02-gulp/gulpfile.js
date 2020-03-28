const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

function sourceMap() {
    return gulp.src('index.js')
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify())
        // 设置源文件地址
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '../example02-gulp' }))
        .pipe(gulp.dest('../dist'));
}

exports.default = sourceMap;
