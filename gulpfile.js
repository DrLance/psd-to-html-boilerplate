const {src, dest, series, watch} = require('gulp');
const gulpConnect = require('gulp-connect');
const gulpLess = require('gulp-less');
const srcOutput = 'src';

const out = 'public';

async function connect() {
  return gulpConnect.server({
    root: 'public',
    port: 1337,
    livereload: true
  });
}


async function less() {
  return src('./src/less/**/*.less')
    .pipe(gulpLess())
    .pipe(dest('./public/css/'))
    .pipe(gulpConnect.reload());
};


async function html() {
  return  src([srcOutput + '/*.html'])
    .pipe(dest('./public/'))
    .pipe(gulpConnect.reload());
};

async function js() {
  return     src([srcOutput + '/js/*.js'])
    .pipe(dest('./public/js/'))
    .pipe(gulpConnect.reload());
};


async function watchFiles() {
  watch([srcOutput + '/less/*.less', src + '/less/**/*.less'], less);
  watch([srcOutput + '/js/*.js', src + '/js/**/*.js'], js);
  return watch([srcOutput + '/*.html', srcOutput + '/html/**/*.html'], html);
};

exports.default = series(connect, less, html, js, watchFiles);
