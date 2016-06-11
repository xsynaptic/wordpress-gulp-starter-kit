// ==== STYLES ==== //

var gulp          = require('gulp')
  , gutil         = require('gulp-util')
  , plugins       = require('gulp-load-plugins')({ camelize: true })
  , config        = require('../../gulpconfig').styles
;

// Build stylesheets from source Sass files, post-process, and write source maps (for debugging) with rubySass
gulp.task('styles-rubysass', function() {
  return plugins.rubySass(config.build.src, config.rubySass)
  .on('error', gutil.log) // Log errors instead of killing the process
  .pipe(plugins.cssnano(config.cssnano)) // Post-process CSS (minify, autoprefix, etc.)
  .pipe(plugins.sourcemaps.write('./')) // Write an external sourcemap; no need to initialize with rubysass as this is already done in the configuration
  .pipe(gulp.dest(config.build.dest)); // Render the final CSS file(s) into the `build` folder
});

// Build stylesheets from source Sass files, post-process, and write source maps (for debugging) with libsass
gulp.task('styles-libsass', function() {
  return gulp.src(config.build.src)
  .pipe(plugins.sourcemaps.init()) // Note that sourcemaps need to be initialized with libsass
  .pipe(plugins.sass(config.libsass))
  .pipe(plugins.cssnano(config.cssnano))
  .pipe(plugins.sourcemaps.write('./'))
  .pipe(gulp.dest(config.build.dest));
});

// Easily configure the Sass compiler from `/gulpconfig.js`
gulp.task('styles', ['styles-'+config.compiler]);
