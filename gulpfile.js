const { src, dest, watch, series, parallel } = require('gulp'),
      del = require('del'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      minify = require('gulp-minify'),
      imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');

const paths = {
  styles: {
    input: './app/sass/**/*.scss',
    output: './dist'
  },
  scripts: {
    input: './app/js/*.js',
    output: './dist'
  },
  images: {
    input: './app/images/*',
    output: './dist/images'
  }
}

function clean() {
  return del('./dist/**')
}

function styles() {
  return src(paths.styles.input)
    .pipe(sourcemaps.init())  
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.output))
}

function scripts() {
  return src(paths.scripts.input)
    .pipe(minify({noSource: true}))
    .pipe(dest(paths.scripts.output))
}

function images() {
  return src(paths.images.input)
    .pipe(imagemin())
    .pipe(dest(paths.images.output))
}

function watchEverything() {
  watch([paths.styles.input, paths.scripts.input, paths.images.input], series(clean, styles, scripts, images));
}

// Tasks
exports.clean = clean;
exports.css = styles;
exports.js = scripts;
exports.img = images;
exports.watch = watchEverything;