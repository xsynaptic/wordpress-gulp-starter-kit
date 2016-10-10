// ==== PROJECT CONFIGURATION ==== //

// Make `package.json` available here; this is used to fill in some useful information in the generated theme
var pkg = require('./package.json');

// This is a central repository of configuration values for this theme; it is used by Gulp and also supplies values to the theme during the build process
module.exports = {

  // Project ID; this should match the display name of your theme; it will be used to generate the `dist` folder
  project:          pkg.name,

  // Theme metadata; this appears in the required `style.css` file
  theme: {
    name:           'Voidx',
    uri:            pkg.homepage,
    author:         pkg.author,
    authorUri:      'https://github.com/synapticism/wordpress-gulp-starter-kit',
    description:    pkg.description,
    version:        pkg.version,
    license:        pkg.license,
    licenseUri:     'https://www.gnu.org/copyleft/gpl.txt',
    tags:           'light, gray, white, one-column, two-column, right-sidebar, fixed-layout, responsive-layout, custom-menu, featured-images, microformats, post-formats, threaded-comments, translation-ready, blog, portfolio, photography', // Reference: https://make.wordpress.org/themes/handbook/review/required/theme-tags/
    textDomain:     'voidx',
    textDomainPath: '/languages/'
  },

  // Paths; there is probably no real need to modify any of these
  paths: {
    src:            './src/',               // The raw material of your theme: custom scripts, SCSS source files, PHP files, images, etc.; do not delete this folder!
    build:          './build/',             // A temporary directory containing a development version of your theme; delete it anytime
    dist:           './dist/'+pkg.name+'/', // The distribution package that you'll be uploading to your server; delete it anytime
    assets:         './assets/',            // A staging area for assets that require processing before landing in the source folder (example: icons before being added to a sprite sheet)
    bower:          './bower_components/',
    composer:       './vendor/',
    modules:        './node_modules/'
  },

  // BrowserSync settings; you'll want to update the proxy if your local development environment serves pages anywhere else
  browsersync: {
    proxy:          'localhost:8080'
  },

  // Setting some sizes for the theme to demonstrate how this configuration file can be used
  // These settings are available within the theme's Sass configuration file by using double curly braces like so: `{{sizes.site}}`
  // You can add any number of other settings to this configuration file and access them in the same way; the sky's the limit!
  // There are a few catches, however, as the values in this file are inserted as text in the Sass config
  // So, for instance, if you want to pass a map you'll need to wrap it in quotes and pass it as a string that is then broken apart
  sizes: {
    site:           1000,
    left:           650,
    right:          350
  }
};
