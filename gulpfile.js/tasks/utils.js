// ==== UTILITIES ==== //

var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')({ camelize: true }),
    del         = require('del'),
    config      = require('../../gulpconfig').utils;

// Totally wipe the contents of the `dist` folder to prepare for a clean build; additionally trigger Bower-related tasks to ensure we have the latest source files
gulp.task('utils-wipe', function() {
  return del(config.wipe);
});

// Clean out junk files after build
gulp.task('utils-clean', ['build', 'utils-wipe'], function() {
  return del(config.clean);
});

// Copy files from the `build` folder to `dist/[project]`
gulp.task('utils-dist', ['utils-clean'], function() {
  return gulp.src(config.dist.src)
  .pipe(gulp.dest(config.dist.dest));
});
