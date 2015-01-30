// ==== STYLES ==== //

var gulp        = require('gulp')
  , gutil       = require('gulp-util')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , config      = require('../config').styles
;

// Build stylesheets from source Sass files, autoprefix, and make a minified copy (for debugging)
gulp.task('styles', function() {
  return gulp.src(config.build.src)
  .pipe(plugins.rubySass(config.rubySass))
  .on('error', gutil.log) // Log errors instead of killing the process
  .pipe(plugins.autoprefixer(config.autoprefixer))
  .pipe(gulp.dest(config.build.dest)) // Drops the unminified CSS file into the `build` folder
  .pipe(plugins.rename(config.rename))
  .pipe(plugins.minifyCss(config.minify))
  .pipe(gulp.dest(config.build.dest)); // Drops a minified CSS file into the `build` folder for debugging
});

// Copy stylesheets from the `build` folder to `dist` and minify them along the way
gulp.task('styles-dist', ['utils-dist'], function() {
  return gulp.src(config.dist.src)
  .pipe(plugins.minifyCss(config.minify))
  .pipe(gulp.dest(config.dist.dest));
});
