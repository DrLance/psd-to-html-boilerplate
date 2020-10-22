const { src, dest, series, watch } = require('gulp');
const gulpConnect = require('gulp-connect');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

const srcOutput = 'src';

const out = 'public';

async function connect() {
  return gulpConnect.server({
    root: 'public',
    port: 1337,
    livereload: true,
  });
}

async function sassCss() {
  return src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass())
    .pipe(dest('./public/css/'))
    .pipe(gulpConnect.reload());
}

async function html() {
  return src([srcOutput + '/*.html'])
    .pipe(dest('./public/'))
    .pipe(gulpConnect.reload());
}

async function js() {
  return src([srcOutput + '/js/*.js'])
    .pipe(dest('./public/js/'))
    .pipe(gulpConnect.reload());
}

async function watchFiles() {
  watch([srcOutput + '/scss/*.scss', src + '/scss/**/*.scss'], sassCss);
  watch([srcOutput + '/js/*.js', src + '/js/**/*.js'], js);
  return watch([srcOutput + '/*.html', srcOutput + '/html/**/*.html'], html);
}

exports.default = series(connect, sassCss, html, js, watchFiles);
