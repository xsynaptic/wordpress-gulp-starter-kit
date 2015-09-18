# A WORDPRESS/GULP STARTER KIT

Designing WordPress themes the old-fashioned way is time-consuming and error-prone. Automating the build process allows us to integrate best practices into our workflow while saving time. This project is a *starter kit* for developing highly optimized WordPress themes with [Gulp](http://gulpjs.com/), [npm](https://www.npmjs.com/), [Bower](http://bower.io/), and [Sass](http://sass-lang.com/), among other tools. This is *not* meant to be a starter theme or framework (although I have included a *minimum viable theme* to demonstrate some of the possibilities). It is, instead, a kind of *project scaffolding* and *example workflow* for modern and efficient WordPress theme development.

The latest version of this starter kit features a modular Gulp file design inspired by Dan Tello's excellent [gulp-starter](https://github.com/greypants/gulp-starter). Configuration is isolated from the tasks themselves to make it easier to change paths and modify settings. It is slightly more complicated than [the approach originally described on my blog](http://synapticism.com/dev/wordpress-theme-development-with-gulp-bower-and-sass/) but also far more powerful.

Local development is now facilitated by your choice of [BrowserSync](http://www.browsersync.io/) or [LiveReload](http://livereload.com/) (the default choice).



## INSTALLATION

Most of these steps are optional if you're already up and running with most of the usual node ecosystem tools.

* [Install npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm).
* Install Gulp `npm install gulp -g`.
* Optional:
    * Install [Bower](http://bower.io/): `npm install bower -g`.
    * Install Sass: `gem install sass` (requires Ruby; note that the `libsass` compiler is switched on by default and requires no further installation steps).
    * Install [Composer](https://getcomposer.org/doc/00-intro.md) (a PHP package manager).
* Download or clone this repo and install all dependencies by running `npm install` (which will automatically trigger `bower install`). This will fetch all dependencies listed in both `package.json` (which includes front-end JavaScript packages and back-end tools like Gulp plugins and Browsersync) and `bower.json` (which includes front-end dependencies e.g. jQuery plugins, Sass frameworks, icon libraries, and so on).
* Edit `gulpconfig.js` and, *at the very least*, change the `project` variable to match the name of your theme. If you like the way this workflow is setup you shouldn't need to edit any of the files under `gulpfile.js/tasks-active` just yet.
* [BrowserSync](http://www.browsersync.io/) setup: assuming you have a local development environment setup all you should need to do is enter the URL into the `proxy` setting in `gulpconfig.js`. (Why use BrowserSync? It's fast, awesome, and allows for simultaneous responsive development across multiple devices.)
* [LiveReload](http://livereload.com/) setup: install a browser extension for [Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) or Firefox. (Why use LiveReload? It does the job without complications.)
* Run `gulp` and start hacking!



## VOIDX: A MINIMUM VIABLE THEME

Previously this project shipped without a working theme included. I figured that with all the great starter themes out there (for instance, [_s](https://github.com/Automattic/_s), [Roots](https://github.com/roots/roots), and [Bones](https://github.com/eddiemachado/bones)) it wouldn't be hard to drop one in and start theming. I don't personally use any of these so I was a little surprised to discover how tricky this can be. Starter themes, despite their "bare bones" reputation, are often bulky and opinionated. Some even ship with their own build processes already in place!

It seems there is a need for what I'd call a *minimum viable theme*: a truly bare bones WordPress starter theme featuring only the essentials to get up and running, something that you can assess at a glance. For the purposes of this project I have created such a theme, tentatively named `voidx`. It isn't pretty and isn't up to [WordPress standards](https://wordpress.org/plugins/theme-check/) but it works well enough to show off some of the power of this workflow. Feel free to play with or discard it as you wish. All files under `src` can be replaced by your own files, you just have to be sure to wire things up properly in the `gulpconfig.js` file if you swap in your own stuff.

There are two components worth a closer look, however:

* The script variable and enqueuing functions in `src/inc/assets.php`; these are tightly coupled with the output of the build process.
* The theme configuration pattern described in `functions.php` and `functions-config-defaults.php`.



## ORGANIZATION

This starter kit uses `src`, `build`, and `dist` folders to organize theme development:

* `src`: this directory contains the raw material for your theme: templates (`src/`), PHP includes (`src/inc`), language files (`src/languages`), styles (`src/scss`), scripts (`src/js`), and images (anywhere under `src/`). **Only edit files in this directory!**
* `build`: generated by Gulp, this is a *working copy* of your theme for use in development and testing. Symlink `build` to your `wp-content/themes` directory for local development and testing (e.g. if your theme is in `~/dev/themes/my-theme` and your local copy of WordPress is installed in `~/dev/localhost/wp` you'll want to run `ln -s ~/dev/themes/my-theme/build ~/dev/localhost/wp/wp-content/themes/my-theme`).
* `dist`: short for distribution, this will be the final, polished copy of your theme for production. You will need to manually run `gulp dist` to create a new distribution. You can also symlink this directory for a final round of testing; just keep in mind that your theme will now be in `dist/[project]`, where `[project]` is the setting at the top of the Gulp configuration. This project folder is what you will want to deploy to production. (No more weird junk in your themes. Hooray!)

Note: both the `build` and `dist` directories are disposable and can be regenerated from the contents of `src`. You aren't likely to want to edit files in this folders but you may want to open them up to diagnose issues with the build process itself.

There is also a `gulp` folder containing the configuration file and two task directories, active and inactive. All files in the `tasks-active` directory will be required at runtime and available for use.



## WORKING WITH GULP

[Gulp](http://gulpjs.com/) is an extremely powerful tool for automating tasks from the command line. If you're new to Gulp but coming from a WordPress background I recommend reading tutorials by [Matt Banks](http://mattbanks.me/gulp-wordpress-development/) and [Mark Goodyear](http://markgoodyear.com/2014/01/getting-started-with-gulp/). I also learned a lot from a post by [Dan Trello](http://viget.com/extend/gulp-browserify-starter-faq) (and have integrated much of his approach into this project) but it might be a bit more opaque for newcomers.

To get started try running `gulp` from the command line. This fires `gulpfile.js/index.js` and should build a working copy of the included theme. The other command you will use from time to time is `gulp dist`, which builds a distribution copy.

Configuration is handled by a single file: `gulpconfig.js`. If you leave the directory structure intact there won't be too much that needs changing here but I can think of two non-obvious components you might want to modify or at least look at:

* [BrowserSync](http://www.browsersync.io/) settings: if you are developing on a local web server you will want to enter the URL into `browsersync.proxy` and then change `watch.watcher` to `browsersync` to take it for a test drive. You'll know it's working when you run `gulp` and a new browser opens with a live copy of your web site. Make changes to any of the Sass files and they should be shown on the page almost immediately. Of course, BrowserSync really shines when you connect a mobile device to your development server, but for that you're on your own ;)
* Script settings: draw your attention to `scripts.bundles` and `scripts.chunks`. This feature is essentially a poor man's [Browserify](http://browserify.org/) or [Webpack](https://webpack.github.io/). By defining different "chunks" (script files that combine to provide a particular feature) and "bundles" (chunks that combine to provide feature sets) you can generate an assortment of files that can be efficiently and intelligently loaded through your WordPress theme. This approach has its limitations, of course, particularly when dependencies are shared between scripts, but it should be of use to many WordPress theme developers.



## WORKING WITH BOWER

A few handy tips from the [Bower documentation](https://bower.io):

* Find new front-end dependencies with `bower search [package]`.
* Install new front-end dependencies with: `bower install [package] --save-dev`.
* Remove packages by deleting a line from `bower.json` and then run `bower prune`.
* Clean the cache with `bower cache clean` (occasionally needed when things start getting weird).



## WORKING WITH NPM

[npm](https://www.npmjs.com/) is great for working with JavaScript-based packages of all kinds (front-end or back-end). Previously this starter kit emphasized the use of Bower to retrieve and manage front-end dependencies but nowadays my personal preference is to use npm, mostly because it's way easier to update dependencies than Bower.

* Find new front-end dependencies with `bower search [package]`.
* Install new front-end dependencies with: `bower install [package] --save-dev`.
* A simple rule-of-thumb: if it's mostly JavaScript based and you can find it there just use npm.



## WORKING WITH SASS

* This package now supports either [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass/) (which requires [the original Ruby implementation of Sass](https://github.com/sass/sass)) or [gulp-sass](https://www.npmjs.org/package/gulp-sass) (based on the newer, experimental, and faster [libsass](https://github.com/sass/libsass), now active by default). Switch `styles.compiler` as needed! For reference: [Sass compatibility table](https://sass-compatibility.github.io/).
* [Sass](http://sass-lang.com/) files can be found in `/src/scss`. Gulp will not process Sass partials beginning with `_`; these need to be explicitly imported (see `style.scss` for an example). On the other hand, if you want to output any other CSS files just drop the underscore *e.g.* `editor-style.scss`.
* Bower components are in the path by default so you can `@import` Sass files directly, as seen in `_loader.scss` and `_reset.scss`.
* The `build` folder is provisioned with regular versions of all stylesheets but `dist` only contains minified versions for production.
* This starter kit ships with [Normalize.css](https://necolas.github.io/normalize.css/) (active by default) and [Eric Meyer's reset](http://meyerweb.com/eric/tools/css/reset/) (inactive by default).
* Compass is *not* included as [Autoprefixer](https://github.com/ai/autoprefixer), a [PostCSS](https://github.com/postcss/postcss) plugin, eliminates the need for vendor prefixing (which is what most Sass frameworks focus on these days). Instead I have included [Scut](https://davidtheclark.github.io/scut/), a minimalist library of useful Sass mixins and functions for the post-vendor prefixing era. This is easily removed if you're not interested in using it.
* [Sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/?redirect_from_locale=tw) are generated by [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) to make debugging stylesheets a snap.



## A FEW OTHER NOTES

### Images

Images are copied from wherever they are in `src` to the same location under `build`. They are only optimized when running `gulp dist` as this operation is resource-intensive.

### PHP

Like images, PHP (and language) files can go anywhere under `src` and will be copied to `build` and `dist` while preserving directory structure.



## A SAMPLE INTEGRATION

Let's say you run across a cool project like [Headroom.js](http://wicky.nillia.ms/headroom.js/) and decide you'd like to try it out. Here's how you would do that with the tools and workflow outlined in this repo:

* `npm install headroom.js --save-dev`. This will save the package to the `devDependencies` field of your `package.json` file.
* Look up the path to the script and add the appropriate entries to `scripts.bundles` and `scripts.chunks` in `gulpconfig.js`. The key name of `scripts.bundles` should match `$script_name` (below). Since this script is meant to be loaded on every page it is safe to bundle it with the `core` script.
* To make this script *optional* requires a bit more work:
    * Add an option to `functions-config-defaults.php`: `defined( 'VOIDX_SCRIPTS_HEADROOM' ) || define( 'VOIDX_SCRIPTS_HEADROOM', true );`.
    * Add the switch to `inc/assets.php`: `if ( VOIDX_SCRIPTS_HEADROOM ) : $script_name .= '-hr';`.
    * Add an option to `scss/_config.scss` to allow for the styling to be turned on or off: `$plugin-headroom: true;`.
    * Add the necessary styling to `scss/_plugins.scss` wrapped in a conditional check: `@if ($plugin-headroom) { // Style }`.
    * Create an additional script at `src/js/headroom.js` to invoke the main script (code to follow).

```language-javascript
// Invoke Headroom.js
;(function($){
  $(function(){
    $("#wrap-header").headroom({ offset: 60 });
  });
}(jQuery));
```

That's all there is to it. Now this script can be switched on or off in two configuration files. WordPress will automatically load the correct script bundle for all JavaScript-based functionality (rather than loading lots of little scripts for each feature).



## TO DO

* Yeoman generator ([open issue](https://github.com/synapticism/wordpress-gulp-starter-kit/issues/1); [some help here](http://yeoman.io/authoring/) would be awesome since I don't personally use Yeoman).
* Better error handling (waiting for Gulp 4).
* [Reduce unnecessary wrapper plugins](https://github.com/sogko/gulp-recipes/tree/master/unnecessary-wrapper-gulp-plugins).
* RTL support with [gulp-rtlcss](https://github.com/jjlharrison/gulp-rtlcss)?
* Explore using Gulp for I18n (a quick scan revealed nothing obviously useful).
* Add an example using Bower.
* Browserify integration.

Feature requests and bug reports welcome; [open an issue](https://github.com/synapticism/wordpress-gulp-starter-kit/issues)! Please note that I intend to reign in scope creep on this project :)



## SEE ALSO

Like the approach but prefer something more mature, sophisticated, and opinionated? Check out [Sage](https://roots.io/sage/) and [Bedrock](https://github.com/roots/bedrock) from [Roots](http://roots.io/). Interested in another more stripped-down approach? Have a look at [gulp-wp-theme](https://github.com/whatwedo/gulp-wp-theme).



## CREDITS

The initial version of this repo featured a `gulpfile.js` adapted from [Matt Banks](http://mattbanks.me/gulp-wordpress-development/). Additional credit is due to [Mark Goodyear](http://markgoodyear.com/2014/01/getting-started-with-gulp/). The current version is largely based on Dan Tello's excellent [gulp-starter](https://github.com/greypants/gulp-starter). The theme templates included in this project ultimately descend from Twenty Twelve.



## LICENSE

Licensed under the [GPL 3.0](http://www.gnu.org/licenses/gpl.txt). You are encouraged to link back to [my web site](http://synapticism.com), [development blog](http://synapticism.com/dev), and/or [this GitHub repository](https://github.com/synapticism/wordpress-gulp-starter-kit) if you find this at all useful.
