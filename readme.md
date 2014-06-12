# WORDPRESS-GULP-BOWER-SASS STARTER KIT

This is a starter kit for developing WordPress themes with [Gulp](http://gulpjs.com/), [Bower](http://bower.io/), and [Sass](http://sass-lang.com/). No WordPress templates apart from `functions-sample.php` are included; this is simply project scaffolding for efficient theme and plugin development. For more information [check out this post on my blog](http://synapticism.com/wordpress-theme-development-with-gulp-bower-and-sass/).

The core `gulpfile.js` has been adapted from [Matt Banks](http://mattbanks.me/gulp-wordpress-development/). Additional credit is due to [Mark Goodyear](http://markgoodyear.com/2014/01/getting-started-with-gulp/).



## INSTALLATION

* Install Gulp and Bower with `npm install gulp -g` and `npm install bower -g`. Install Sass with `gem install sass`.
* Download or clone the repo and install all dependencies with `npm install` and `bower install`.
* Edit `gulpfile.js` and change the `project` variable to match the name of your theme.
* Rename the `my-theme` directory to match the `project` variable. (Or just run `gulp` and a new directory will be created.)
* Install a [Live Reload](http://livereload.com/) browser extension for [Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) or Firefox.
* Copy whatever WordPress starter theme you wish to use into your new theme directory and start hacking!

Now run `gulp` to watch for changes, rebuild files as needed, and reload changes in your browser.



## USAGE

### npm

When you initialize your project npm will fetch the dependencies listed in `package.json`. You may wish to manually check for updates to these dependencies or use `npm update --save-dev` to bump version numbers in `package.json`. This way you can enjoy something close to bleeding-edge functionality at the cost of having to test for unforeseen incompatibilities--something you're going to have to do anyway.

### Bower

Bower has no equivalent function to update `bower.json`; you will probably want to specify a version for each dependency whenever you start your project.

To install new front-end dependencies simply use `bower install [package] --save-dev`. This assumes that you will be running all packages through Gulp's asset pipeline, of course. The `bower_components` directory is under `assets` to keep things tidy.

### Sass

Sass files belong in `/assets/src/scss`. Gulp will not process Sass partials beginning with `_`. Use `@import`, optionally with relative paths to Bower components, as seen in `_base_reset.scss`.

This starter kit ships with [Normalize.css](https://necolas.github.io/normalize.css/) and [Eric Meyer's reset](http://meyerweb.com/eric/tools/css/reset/). Compass is not included as [Autoprefixer](https://github.com/ai/autoprefixer) eliminates the need for vendor prefixing (which is what most Sass frameworks focus on). If you're looking for a Sass mixin library for the post-vendor prefixing era try [Scut](https://davidtheclark.github.io/scut/).



## LICENSE

Copyright 2014 [Alexander Synaptic](http://alexandersynaptic.com). Licensed under the GPLv3: http://www.gnu.org/licenses/gpl.txt

You are welcome to link back to [my web site](http://synapticism.com) and/or [this GitHub repository](https://github.com/synapticism/wordpress-gulp-bower-sass) if you find this at all useful.
