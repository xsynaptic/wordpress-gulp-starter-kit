// ==== SETUP ==== //

// Project configuration
var project     = 'my-theme'
  , build       = './build/'
  , dist        = './dist/'+project+'/'
  , source      = './src/' // 'source' instead of 'src' to avoid confusion with gulp.src
  , lang        = 'languages/'
  , bower       = './bower_components/'
;

// Initialization sequence
var gulp        = require('gulp')
  , gutil       = require('gulp-util')
  , plugins     = require('gulp-load-plugins')({ camelize: true }) // This loads all modules prefixed with "gulp-" to plugin.moduleName
  , del         = require('del')
;



// ==== STYLES ==== //

// Stylesheet handling; don't forget `gem install sass`; Compass is not included by default here
gulp.task('styles', function() {
  return gulp.src([source+'scss/*.scss', '!'+source+'scss/_*.scss']) // Ignore partials
  .pipe(plugins.rubySass({
    loadPath: bower // Adds the `bower_components` directory to the load path so you can @import directly
  , precision: 8
  , 'sourcemap=none': true // Not yet ready for prime time! Sass 3.4 has sourcemaps on by default but this causes some issues with the Gulp toolchain
  }))
  .pipe(plugins.autoprefixer('last 2 versions', 'ie 9', 'ios 6', 'android 4'))
  .pipe(gulp.dest(build))
  .pipe(plugins.rename({suffix: '.min'}))
  .pipe(plugins.minifyCss({ keepSpecialComments: 1 }))
  .pipe(gulp.dest(build));
});



// ==== SCRIPTS ==== //

// Scripts; broken out into different tasks to create specific bundles which are then compressed in place
gulp.task('scripts', ['scripts-lint', 'scripts-core', 'scripts-extras'], function(){
  return gulp.src([build+'js/**/*.js', '!'+build+'js/**/*.min.js']) // Avoid recursive min.min.min.js
  .pipe(plugins.rename({suffix: '.min'}))
  .pipe(plugins.uglify())
  .pipe(gulp.dest(build+'js/'));
});

// Lint scripts for errors and sub-optimal formatting
gulp.task('scripts-lint', function() {
  return gulp.src(source+'js/**/*.js')
  .pipe(plugins.jshint('.jshintrc'))
  .pipe(plugins.jshint.reporter('default'));
});

// These are the core custom scripts loaded on every page; pass an array to bundle several scripts in order
gulp.task('scripts-core', function() {
  return gulp.src([
    source+'js/core.js'
    //, source+'js/navigation.js' // An example of how to add files to a bundle
  ])
  .pipe(plugins.concat('core.js'))
  .pipe(gulp.dest(build+'js/'));
});

// An example task for extra scripts that aren't loaded on every page
gulp.task('scripts-extras', function() {
  return gulp.src([
    // You can also add dependencies from Bower components e.g.: bower+'dependency/dependency.js',
    source+'js/extras.js'
  ])
  .pipe(plugins.concat('extras.js'))
  .pipe(gulp.dest(build+'js/'));
});



// ==== IMAGES ==== //

// Copy images; minification occurs during packaging
gulp.task('images', function() {
  return gulp.src(source+'**/*(*.png|*.jpg|*.jpeg|*.gif)')
  .pipe(gulp.dest(build));
});



// ==== LANGUAGES ==== //

// Copy everything under `src/languages` indiscriminately
gulp.task('languages', function() {
  return gulp.src(source+lang+'**/*')
  .pipe(gulp.dest(build+lang));
});



// ==== PHP ==== //

// Copy PHP source files to the build directory
gulp.task('php', function() {
  return gulp.src(source+'**/*.php')
  .pipe(gulp.dest(build));
});



// ==== DISTRIBUTION ==== //

// Prepare a distribution, the properly minified, uglified, and sanitized version of the theme ready for installation

// Clean out junk files after build
gulp.task('clean', ['build'], function(cb) {
  del([build+'**/.DS_Store'], cb)
});

// Totally wipe the contents of the distribution folder after doing a clean build
gulp.task('dist-wipe', ['clean'], function(cb) {
  del([dist], cb)
});

// Copy everything in the build folder (except previously minified stylesheets) to the `dist/project` folder
gulp.task('dist-copy', ['dist-wipe'], function() {
  return gulp.src([build+'**/*', '!'+build+'**/*.min.css'])
  .pipe(gulp.dest(dist));
});

// Minify stylesheets in place
gulp.task('dist-styles', ['dist-copy'], function() {
  return gulp.src([dist+'**/*.css', '!'+dist+'**/*.min.css'])
  .pipe(plugins.minifyCss({ keepSpecialComments: 1 }))
  .pipe(gulp.dest(dist));
});

// Optimize images in place
gulp.task('dist-images', ['dist-styles'], function() {
  return gulp.src([dist+'**/*.png', dist+'**/*.jpg', dist+'**/*.jpeg', dist+'**/*.gif', '!'+dist+'screenshot.png'])
  .pipe(plugins.imagemin({
    optimizationLevel: 7
  , progressive: true
  , interlaced: true
  }))
  .pipe(gulp.dest(dist));
});



// ==== BOWER ==== //

// Executed on `bower update` which is in turn triggered by `npm update`; use this to manually copy front-end dependencies into your working source folder
gulp.task('bower', ['bower-normalize']);

// Used to get around Sass's inability to properly @import vanilla CSS
gulp.task('bower-normalize', function() {
  return gulp.src(bower+'normalize.css/normalize.css')
  .pipe(plugins.rename('_base_normalize.scss'))
  .pipe(gulp.dest(source+'scss'));
});



// ==== WATCH & RELOAD ==== //

// Start the livereload server; not asynchronous
gulp.task('server', ['build'], function() {
  plugins.livereload.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    };
  });
});

// Watch task: build stuff when files are modified, livereload when anything in the `build` or `dist` folders change
gulp.task('watch', ['server'], function() {
  gulp.watch(source+'scss/**/*.scss', ['styles']);
  gulp.watch([source+'js/**/*.js', bower+'**/*.js'], ['scripts']);
  gulp.watch(source+'**/*(*.png|*.jpg|*.jpeg|*.gif)', ['images']);
  gulp.watch(source+'**/*.php', ['php']);
  gulp.watch([build+'**/*', dist+'**/*']).on('change', function(file) {
    plugins.livereload.changed(file.path);
  });
});



// ==== TASKS ==== //

// Build styles and scripts; copy PHP files
gulp.task('build', ['styles', 'scripts', 'images', 'languages', 'php']);

// Release creates a clean distribution package under `dist` after running build, clean, and wipe in sequence
gulp.task('dist', ['dist-images']);

// The default task runs watch which boots up the Livereload server after an initial build is finished
gulp.task('default', ['watch']);
