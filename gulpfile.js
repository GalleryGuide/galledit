const {src, dest, watch, series, parallel} = require('gulp');

// Gulp requires.
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  minimist = require('minimist'),
  arg = minimist(process.argv.slice(2));

var sass = require('gulp-sass');

sass.compiler = require('node-sass');

// Default environment options.
var envOption = {
  minify: false,
  sourcemap: true,
  styleGuide: true
};

// Set environment options. Vagrant uses defaults.
switch (arg.env) {
  case 'production':
    envOption.minify = true;
    envOption.sourcemap = false;
    envOption.styleGuide = false;
    break;
}

// Use Node Sass (LibSass) to compile Sass.
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))

    .pipe($.if(envOption.sourcemap, $.sourcemaps.init()))
    .pipe($.sass())
    .pipe($.autoprefixer('last 2 versions', 'ie 8', 'ie 9'))
    // Optionally produce production CSS.
    .pipe($.if(envOption.sourcemap, $.sourcemaps.write('./')))
    .pipe($.if(envOption.minify, $.minifyCss()))
    .pipe(dest('css'))

    .pipe(gulp.dest('./css'));
});

// SCSS lint.
gulp.task('scss-lint', function () {
  return gulp.src('sass/**/*.scss')
    .pipe($.cached($.scssLint))
    .pipe($.scssLint({
      'config': '../gall/scss-lint.yml'
    }));
});

// Default - initial compile and watch.
gulp.task('default', gulp.series('sass', 'scss-lint'));
