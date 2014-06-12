# WORDPRESS-GULP-BOWER-SASS STARTER KIT

This is a starter kit for developing WordPress themes and plugins with [Gulp](http://gulpjs.com/), [Bower](http://bower.io/), and [Sass](http://sass-lang.com/). No WordPress templates apart from `functions.php` are included; this is simply project scaffolding for efficient theme and plugin development.

The core `gulpfile.js` has been adapted from [Matt Banks](http://mattbanks.me/gulp-wordpress-development/).



## INSTALLATION

Download or clone the repo and rename the folder. Open `gulpfile.js` and change `build` to whatever you want to name your project. Next:

```
npm install
bower install
```

To build, watch, and setup a [Live Reload](http://livereload.com/) server: `gulp`.



## VERSIONING

When you initialize your project npm will fetch the dependencies listed in `package.json`. You may wish to manually check for updates to these dependencies or use `npm update --save-dev` to bump version numbers in `package.json`. This way you can enjoy something close to bleeding edge functionality at the cost of having to test for unforeseen incompatibilities--something you're going to have to do anyway.

Bower has no equivalent function; you will need to update `bower.json` and set your own specific versions in place of "latest" whenever you start your project.



## FEATURES

This starter kit comes pre-baked with [Normalize.css](https://necolas.github.io/normalize.css/) and [Eric Meyer's reset](http://meyerweb.com/eric/tools/css/reset/). Compass is not included as [Autoprefixer](https://github.com/ai/autoprefixer) eliminates the need for vendor prefixing (which is what most Sass frameworks focus on). If you're looking for a Sass mixin library for the post-vendor prefixing era try [Scut](https://davidtheclark.github.io/scut/).



## LICENSE

Copyright 2014 [Alexander Synaptic](http://alexandersynaptic.com). Licensed under the GPLv3: http://www.gnu.org/licenses/gpl.txt

You are welcome to link back to [my web site](http://synapticism.com) and/or [this GitHub repository](https://github.com/synapticism/wordpress-gulp-bower-sass) if you find this at all useful.
