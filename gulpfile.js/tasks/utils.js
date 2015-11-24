// ==== UTILITIES ==== //

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , del         = require('del')
  , config      = require('../../gulpconfig').utils
;

// Used to get around Sass's inability to properly @import vanilla CSS; see: https://github.com/sass/sass/issues/556
gulp.task('utils-normalize', function() {
  return gulp.src(config.normalize.src)
  .pipe(plugins.changed(config.normalize.dest))
  .pipe(plugins.rename(config.normalize.rename))
  .pipe(gulp.dest(config.normalize.dest));
});

// Totally wipe the contents of the `dist` folder to prepare for a clean build; additionally trigger Bower-related tasks to ensure we have the latest source files
gulp.task('utils-wipe', ['setup'], function() {
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
