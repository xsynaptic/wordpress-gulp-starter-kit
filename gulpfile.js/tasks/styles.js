// ==== STYLES ==== //

var gulp          = require('gulp')
  , gutil         = require('gulp-util')
  , plugins       = require('gulp-load-plugins')({ camelize: true })
  , config        = require('../../gulpconfig').styles
  , autoprefixer  = require('autoprefixer')
  , processors    = [autoprefixer(config.autoprefixer)] // Add additional PostCSS plugins to this array as needed
;

// Build stylesheets from source Sass files, autoprefix, and write source maps (for debugging) with rubySass
gulp.task('styles-rubysass', function() {
  return plugins.rubySass(config.build.src, config.rubySass)
  .on('error', gutil.log) // Log errors instead of killing the process
  .pipe(plugins.postcss(processors))
  .pipe(plugins.cssnano(config.minify))
  .pipe(plugins.sourcemaps.write('./')) // No need to init; this is set in the configuration
  .pipe(gulp.dest(config.build.dest)); // Drops the unminified CSS file into the `build` folder
});

// Build stylesheets from source Sass files, autoprefix, and write source maps (for debugging) with libsass
gulp.task('styles-libsass', function() {
  return gulp.src(config.build.src)
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.sass(config.libsass))
  .pipe(plugins.postcss(processors))
  .pipe(plugins.cssnano(config.minify))
  .pipe(plugins.sourcemaps.write('./')) // Writes an external sourcemap
  .pipe(gulp.dest(config.build.dest)); // Drops the unminified CSS file into the `build` folder
});

// Easily configure the Sass compiler from `/gulpconfig.js`
gulp.task('styles', ['styles-'+config.compiler]);
