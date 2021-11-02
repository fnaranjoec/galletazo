const { src, dest, watch, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const minify = require("gulp-babel-minify");
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');

// File paths
const files = { 
    cssPath: ['assets/css/style.css'],
    jsPath: 'assets/js/**/*.js',
    views: 'server/views/**/*.pug',
    images_raster: 'assets/images/**/*.+(png|jpg|gif)',
    images_special: 'assets/images/**/*.+(hdr|svg)'
}

function cssTask(){    
    return src(files.cssPath)
        .pipe(concat('styles.css'))
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(dest('public/css')
    );
}

function jsTask(){
    return src([files.jsPath])
        .pipe(minify())
        .pipe(dest('public/js')
    );
}

function cacheBustTask(){
    var mmString = new Date().getTime();
    return src([files.views])
        .pipe(replace(/mm=\d+/g, 'mm=' + mmString))
        .pipe(dest('views'));
}

function optimazeImageTask() {
    return src([files.images_raster])
    .pipe(changed('public/images'))
    .pipe(imagemin())
    .pipe(dest('public/images'));
}

function copyImageTask() {
    return src([files.images_special])
    .pipe(dest('public/images'));
}

exports.default = series(
    parallel(cssTask, jsTask), 
    cacheBustTask,
    optimazeImageTask,
    copyImageTask
    //watchTask
);