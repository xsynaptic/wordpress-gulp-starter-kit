// ==== THEME ==== //

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , config      = require('../../gulpconfig').theme
;

// Copy PHP source files to the `build` folder
gulp.task('theme-php', function() {
  return gulp.src(config.php.src)
  .pipe(plugins.changed(config.php.dest))
  .pipe(gulp.dest(config.php.dest));
});

// Copy everything under `src/languages` indiscriminately
gulp.task('theme-lang', function() {
  return gulp.src(config.lang.src)
  .pipe(plugins.changed(config.lang.dest))
  .pipe(gulp.dest(config.lang.dest));
});

// All the theme tasks in one
gulp.task('theme', ['theme-lang', 'theme-php']);
