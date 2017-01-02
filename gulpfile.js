var gulp = require('gulp'),
    less = require('gulp-less'),
    pulmber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    rem = require('gulp-rem-plus'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require("browser-sync");

gulp.task('server', function () {
  browserSync.init({
    file: '*',
    server: {
      baseDir: '.'
    }
  })
})

gulp.task('less', function() {
  gulp.src('assets/less/**/*.less')
    .pipe(pulmber())
    .pipe(changed('assets/css', {
      extension: '.css'
    }))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', ['server', 'less'], function() {
  gulp.watch('assets/less/**/*.less', ['less']);
  gulp.watch('view/*.html').on('change', browserSync.reload);
});
