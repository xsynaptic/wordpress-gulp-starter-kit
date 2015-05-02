// ==== BROWSERSYNC ==== //

var gulp        = require('gulp')
  , browsersync = require('browser-sync')
  , config      = require('../../gulpconfig').browsersync
;

// BrowserSync: be sure to setup `proxy` in `/gulpconfig.js`
// Quick start: connect all your devices to the same network (e.g. wifi) and navigate to the address output in the console when you run `gulp`
gulp.task('browsersync', ['build'], function() {
  browsersync(config);
});
