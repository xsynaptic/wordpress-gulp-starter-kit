// ==== GULP CONFIGURATION ==== //

// Project paths and definitions imported from `config.js`
var config      = require('./config'),
    project     = config.project,
    src         = config.paths.src,
    build       = config.paths.build,
    dist        = config.paths.dist,
    assets      = config.paths.assets,
    bower       = config.paths.bower,
    composer    = config.paths.composer,
    modules     = config.paths.modules;

// Project settings
module.exports = {

  browsersync: {
    files: [build+'/**', '!'+build+'/**.map'], // Exclude map files
    notify: false, // In-line notifications (the blocks of text saying whether you are connected to the BrowserSync server or not)
    open: true, // Set to false if you don't like the browser window opening automatically
    port: 3000, // Port number for the live version of the site; default: 3000
    proxy: config.browsersync.proxy, // We need to use a proxy instead of the built-in server because WordPress has to do some server-side rendering for the theme to work
    watchOptions: {
      debounceDelay: 2000 // This introduces a small delay when watching for file change events to avoid triggering too many reloads
    }
  },

  images: {
    build: { // Copies images from `src` to `build`; does not optimize
      src: src+'**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)',
      dest: build
    },
    dist: {
      src: [ // The source is actually `dist` since we are minifying images in place after they've been copied over
        dist+'**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)',
        '!'+dist+'screenshot.png'
      ],
      imagemin: {
        optimizationLevel: 7,
        progressive: true,
        interlaced: true,
        svgoPlugins: [
          // Optionally disable SVG plugins here; more info: https://github.com/sindresorhus/grunt-svgmin#available-optionsplugins
        ]
      },
      dest: dist
    }
  },

  livereload: {
    port: 35729 // This is a standard port number that should be recognized by your LiveReload helper; there's probably no need to change it
  },

  // Scripts are generated from this custom system of bundles and chunks, basically a poor man's Webpack/Browserify with no dependency graph management, no require
  // Bundles are defined by a name and an array of chunks to concatenate
  // Chunks are arrays of globs matching source files that combine to provide specific functionality (e.g. lightbox, syntax highlighting, etc.)
  // The idea here is to be able to group files together and then load them conditionally in the theme
  // If this seems too complicated just add all your required scripts into a chunk, add that single chunk to a bundle, and load that bundle :)
  // On the other hand, if this is too basic you'll want to look into Browserify or Webpack, but that's really beyond the scope of this project!
  scripts: {
    bundles: {
      footer: ['footer'],
      header: ['header'],
      pageloader: ['pageloader', 'footer']
    },
    chunks: {
      footer: [ // The footer is a good place to load non-essential scripts and, as such, it is loaded no matter what
        modules+'timeago/jquery.timeago.js', // The modules directory contains packages downloaded via npm
        src+'js/responsive-menu.js',
        src+'js/footer.js'
      ],
      header: [
        modules+'svg4everybody/dist/svg4everybody.js',
        src+'js/header.js'
      ],

      // The pageloader chunk provides an example of how you would add a user-configurable feature to your theme; you can delete this if you wish
      // Have a look at the `src/inc/assets.php` to see how script bundles could be conditionally loaded by a theme
      pageloader: [
        modules+'html5-history-api/history.js',
        modules+'spin.js/spin.js',
        modules+'spin.js/jquery.spin.js',
        modules+'wp-ajax-page-loader/wp-ajax-page-loader.js',
        src+'js/page-loader.js'
      ]
    },

    // Linting checks the quality of code against some user-defined standard
    // Here we can use ESLint (default) or JSHint (requires additional setup: `npm install jshint -g`)
    // This setup only lints custom scripts within the theme, not dependencies in the modules folder
    linter: 'eslint',
    eslint: {
      src: [src+'js/**/*.js']
    },
    jshint: {
      src: [src+'js/**/*.js']
    },

    // Minify compresses
    minify: {
      src: build+'js/**/*.js',
      uglify: {}, // Default options
      dest: build+'js/'
    },

    // Script filenames will be prefaced with this (optional; leave blank if you have no need for it but be sure to change the corresponding value in `src/inc/assets.php` if you use it)
    namespace: 'x-',

    // Where the scripts end up in your theme directory structure; this has to match the paths called within your theme
    dest: build+'js/'
  },

  styles: {
    build: {
      src: src+'scss/**/*.scss',
      dest: build
    },

    // This section imports configuration variables into the Sass environment; it's entirely optional
    config: {
      src: src+'scss/templates/_config.scss',
      dest: src+'scss/lib/'
    },
    replace: {
      tokens: config // This makes the main project configuration object accessible via `{{token.property}}`
    },

    // Compiler settings; you can choose between the faster, more modern C-based `libsass` (default) or vintage Ruby-based `rubysass`
    compiler: 'libsass',
    rubySass: { // Requires the Ruby implementation of Sass; run `gem install sass` if you use this; Compass is *not* included by default
      loadPath: [ // Adds Bower and npm directories to the load path so you can @import directly
        './src/scss',
        modules+'normalize.css',
        modules+'scut/dist',
        modules,
        bower
      ],
      precision: 6,
      sourcemap: true
    },
    libsass: { // Requires the libsass implementation of Sass (included in this package)
      includePaths: [ // Adds Bower and npm directories to the load path so you can @import directly
        './src/scss',
        modules+'normalize.css',
        modules+'scut/dist',
        modules,
        bower,
      ],
      precision: 6,
      onError: function(err) {
        return console.log(err);
      }
    },

    // Minification settings
    cssnano: {
      autoprefixer: {
        add: true,
        browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4'] // This tool is magic and you should use it in all your projects :)
      }
    }
  },

  theme: {
    lang: {
      src: src+'languages/**/*', // Glob pattern matching any language files you'd like to copy over; we've broken this out in case you want to automate language-related functions
      dest: build+'languages/'
    },
    php: {
      src: src+'**/*.php', // This simply copies PHP files over; both this and the previous task could be combined if you like
      dest: build
    }
  },

  utils: {
    clean: [build+'**/.DS_Store'], // A glob pattern matching junk files to clean out of `build`; feel free to add to this array
    wipe: [dist], // Clean this out before creating a new distribution copy
    dist: {
      src: [build+'**/*', '!'+build+'**/*.map'],
      dest: dist
    },
  },

  watch: { // What to watch before triggering each specified task; if files matching the patterns below change it will trigger BrowserSync or Livereload
    src: {
      styles:       src+'scss/**/*.scss',
      scripts:      src+'js/**/*.js', // You might also want to watch certain dependency trees but that's up to you
      images:       src+'**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)',
      theme:        src+'**/*.php',
      livereload:   build+'**/*'
    },
    watcher: 'livereload' // Modify this value to easily switch between BrowserSync ('browsersync') and Livereload ('livereload')
  }
}
