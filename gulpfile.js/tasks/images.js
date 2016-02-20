// ==== IMAGES ==== //

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , config      = require('../../gulpconfig').images
;

// Copy changed images from the source folder to `build` (fast)
gulp.task('images', function() {
  return gulp.src(config.build.src)
  .pipe(plugins.changed(config.build.dest))
  .pipe(gulp.dest(config.build.dest));
});

// Optimize images in the `dist` folder (slow)
gulp.task('images-optimize', ['utils-dist'], function() {
  return gulp.src(config.dist.src)
  .pipe(plugins.imagemin(config.dist.imagemin))
  .pipe(gulp.dest(config.dist.dest));
});
