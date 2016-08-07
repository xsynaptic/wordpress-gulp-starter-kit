<?php // ==== ASSETS ==== //

// Now that you have efficiently generated scripts and stylesheets for your theme, how should they be integrated?
// This file walks you through an approach I use but you are free to do this any way you like

// Load header assets; this should include the main stylesheet as well as any mission critical scripts
function voidx_assets_header() {

  // Header script loading is simplistic in this starter kit but you may want to change what file is loaded based on various conditions; check out the footer asset loader for an example
  $file = 'x-header';
  wp_enqueue_script( 'voidx-header', get_stylesheet_directory_uri() . '/js/' . $file . '.js', $deps = array('jquery'), filemtime( get_template_directory() . '/js/' . $file . '.js' ), false );

  // Register and enqueue our main stylesheet with versioning based on last modified time
  wp_register_style( 'voidx-style', get_stylesheet_uri(), $dependencies = array(), filemtime( get_template_directory() . '/style.css' ) );
  wp_enqueue_style( 'voidx-style' );
}
add_action( 'wp_enqueue_scripts', 'voidx_assets_header' );



// Load footer assets; a more complex example of a smooth asset-loading approach for WordPress themes
function voidx_assets_footer() {

  // Initialize variables
  $name = 'voidx-footer';   // This is the script handle
  $file = 'x';              // The beginning of the filename; "x" is the namespace set in `gulpconfig.js`
  $vars = array();          // An empty array that may be populated by script variables for output with `wp_localize_script` after the footer script is enqueued

  // This approach allows for conditional loading of various script bundles based on options set in `src/functions-config-defaults.php`
  // Note: bundles require fewer HTTP requests at the expense of addition caching hits when different scripts are requested on different pages of your site
  // You could also load one main bundle on every page with supplementary scripts as needed (e.g. for commenting or a contact page); it's up to you!

  // Example integraton: WP AJAX Page Loader (similar to Infinite Scroll); this script is only loaded when the conditions below are met
  // This script must be provisioned with some extra data via the `wp_localize_script` function as outlined in the documentation: https://github.com/synapticism/wp-ajax-page-loader
  if ( VOIDX_SCRIPTS_PAGELOAD && ( is_archive() || is_home() || is_search() ) ) {

    // Script filenames are designed to be additive (meaning you can append more script names to the end in other conditional blocks using `.= '-anotherscript'` etc.) to allow for multiple feature toggles in the theme configuration
    // Have a look at `gulpconfig.js` to see where these script names are defined
    $file .= '-pageloader';

    // This chunk of code provisions the script with vital info: What page are we on? And what is the page limit?
    global $wp_query;
    $max = $wp_query->max_num_pages;
    $paged = ( get_query_var( 'paged' ) > 1 ) ? get_query_var( 'paged' ) : 1;

    // Prepare script variables that will be output after the footer script is enqueued
    $vars['PG8Data'] = array(
      'startPage'   => $paged,
      'maxPages'    => $max,
      'nextLink'    => next_posts( $max, false )
    );
  }

  // If none of the conditons were matched (above) let's output the default script name
  if ( $file === 'x' )
    $file .= '-footer';

  // Load theme-specific JavaScript bundles with versioning based on last modified time; http://www.ericmmartin.com/5-tips-for-using-jquery-with-wordpress/
  // The handle is the same for each bundle since we're only loading one script; if you load others be sure to provide a new handle
  wp_enqueue_script( $name, get_stylesheet_directory_uri() . '/js/' . $file . '.js', array( 'jquery' ), filemtime( get_template_directory() . '/js/' . $file . '.js' ), true ); // This last `true` is what loads the script in the footer

  // Pass variables to scripts at runtime; must be triggered after the script is enqueued; see: http://codex.wordpress.org/Function_Reference/wp_localize_script
  if ( !empty( $vars ) ) {
    foreach ( $vars as $var => $data )
      wp_localize_script( $name, $var, $data );
  }
}
add_action( 'wp_enqueue_scripts', 'voidx_assets_footer' );



// Load assets on single content; useful for conditional loading of the core comments script, for example
function voidx_assets_singular() {
  if ( !is_singular() )
    return;

  // Load core WordPress script for handling threaded comments where appropriate
  // This isn't really useful since comments aren't a feature of this simple theme but you get the idea
  if ( comments_open() && get_option('thread_comments') )
    wp_enqueue_script( 'comment-reply' );
}
add_action( 'wp_enqueue_scripts', 'voidx_assets_singular' );
