const gulp = require('gulp');
const gulpConnect = require('gulp-connect');
const gulpLess = require('gulp-less');
const src = 'src';

const out = 'public';

gulp.task('connect', function() {
  return gulpConnect.server({
    root: 'public',
    port: 1337,
    livereload: true
  });
});

gulp.task('less', function() {
  return gulp
    .src('./src/less/**/*.less')
    .pipe(gulpLess())
    .pipe(gulp.dest('./public/css/'))
    .pipe(gulpConnect.reload());
});

gulp.task('html', function() {
  return gulp
    .src([src + '/*.html'])
    .pipe(gulp.dest('./public/'))
    .pipe(gulpConnect.reload());
});

gulp.task('js', function() {
  return gulp
    .src([src + '/js/*.js'])
    .pipe(gulp.dest('./public/js/'))
    .pipe(gulpConnect.reload());
});

gulp.task('watch', function() {
  gulp.watch([src + '/less/*.less', src + '/less/**/*.less'], ['less']);
  gulp.watch([src + '/js/*.js', src + '/js/**/*.js'], ['js']);
  return gulp.watch([src + '/*.html', src + '/html/**/*.html'], ['html']);
});

gulp.task('default', ['connect', 'less', 'watch', 'html', 'js']);
