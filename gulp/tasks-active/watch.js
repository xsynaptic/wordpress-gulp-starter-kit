// ==== WATCH ==== //

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , config      = require('../../gulpconfig').watch
;

// Watch (BrowserSync version): build stuff when source files are modified, let BrowserSync figure out when to reload
// Task chain: build -> browsersync -> watch
gulp.task('watch-browsersync', ['browsersync'], function() {
  gulp.watch(config.src.styles, ['styles']);
  gulp.watch(config.src.scripts, ['scripts']);
  gulp.watch(config.src.images, ['images']);
  gulp.watch(config.src.theme, ['theme']);
});

// Watch (Livereload version): build stuff when source files are modified, inform livereload when anything in the `build` or `dist` folders change
// Task chain: build -> livereload -> watch
gulp.task('watch-livereload', ['livereload'], function() {
  gulp.watch(config.src.styles, ['styles']);
  gulp.watch(config.src.scripts, ['scripts']);
  gulp.watch(config.src.images, ['images']);
  gulp.watch(config.src.theme, ['theme']);
  gulp.watch(config.src.livereload).on('change', function(file) {
    plugins.livereload.changed(file.path);
  });
});

// Master control switch for the watch task
gulp.task('watch', ['watch-'+config.watcher]);
