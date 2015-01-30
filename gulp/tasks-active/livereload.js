// ==== LIVERELOAD ==== //

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , config      = require('../config').livereload
;

// Start the livereload server; not asynchronous
gulp.task('livereload', ['build'], function() {
  plugins.livereload.listen(config.port, function (err) {
    if (err) {
      return console.log(err);
    };
  });
});
