// ==== SCRIPTS ==== //

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , merge       = require('merge-stream')
  , config      = require('../../gulpconfig').scripts
;

// Check core scripts for errors
gulp.task('scripts-lint', function() {
  return gulp.src(config.lint.src)
  .pipe(plugins.jshint())
  .pipe(plugins.jshint.reporter('default')); // No need to pipe this anywhere
});

// Generate script bundles as defined in the configuration file
// Adapted from https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md
gulp.task('scripts-bundle', ['scripts-lint'], function(){
  var bundles = [];

  // Iterate through all bundles defined in the configuration
  for (var bundle in config.bundles) {
    if (config.bundles.hasOwnProperty(bundle)) {
      var chunks = [];

      // Iterate through each bundle and mash the chunks together
      config.bundles[bundle].forEach(function(chunk){
        chunks = chunks.concat(config.chunks[chunk]);
      });

      // Push the results to the bundles array
      bundles.push([bundle, chunks]);
    }
  }

  // Iterate through each bundle in the bundles array
  var tasks = bundles.map(function(bundle) {
    return gulp.src(bundle[1]) // bundle[1]: the list of source files
    .pipe(plugins.concat(config.namespace + bundle[0].replace(/_/g, '-') + '.js')) // bundle[0]: the nice name of the script; underscores are replaced with hyphens
    .pipe(gulp.dest(config.dest));
  });

  // Cross the streams ;)
  return merge(tasks);
});

// Minify scripts in place
gulp.task('scripts-minify', ['scripts-bundle'], function(){
  return gulp.src(config.minify.src)
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.uglify(config.minify.uglify))
  .pipe(plugins.sourcemaps.write('./'))
  .pipe(gulp.dest(config.minify.dest));
});

// Master script task; lint -> bundle -> minify
gulp.task('scripts', ['scripts-minify']);
