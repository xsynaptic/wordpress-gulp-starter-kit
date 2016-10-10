<?php // ==== ASSETS ==== //

// Now that you have efficiently generated scripts and stylesheets for your theme, how should they be integrated?
// This file walks you through one possible approach but you are free to do this any way you like

// Register and enqueue the header script the WordPress way
function voidx_js_header_enqueue() {

  // Specify the relative path to the script to load in the header, register, and enqueue
  $script = '/js/x-header.js';

  // Register and enqueue the header script with versioning based on last modified time; http://www.ericmmartin.com/5-tips-for-using-jquery-with-wordpress/
  wp_register_script( 'header-script', get_stylesheet_directory_uri() . $script, $deps = array('jquery'), filemtime(get_stylesheet_directory() . $script), false );
  wp_enqueue_script( 'header-script' );
}
add_action( 'wp_enqueue_scripts', 'voidx_js_header_enqueue' );



// Register and enqueue our main stylesheet in the header with versioning based on last modified time
function voidx_css_enqueue() {

  // Relative path to the main theme stylesheet
  $css = '/css/theme.css';
  wp_register_style( 'theme-style', get_stylesheet_directory_uri() . $css, $deps = array(), filemtime( get_stylesheet_directory() . $css ) );
  wp_enqueue_style( 'theme-style' );
}
add_action( 'wp_enqueue_scripts', 'voidx_css_enqueue' );



// A simple helper function to conditionally choose which script to load in the footer based on a configuration variable set in the theme
function voidx_js_footer_script() {
  $script = 'x-footer';
  if ( VOIDX_SCRIPTS_PAGELOAD && ( is_archive() || is_home() || is_search() ) )
    $script = 'x-pageloader';
  return '/js/' . $script . '.js';
}



// Load footer scripts; a more complex example of a smooth asset-loading approach for WordPress themes
// This approach allows for conditional loading of various script bundles based on options set in `src/functions-config-defaults.php`
// Note: bundles require fewer HTTP requests at the expense of addition caching hits when different scripts are requested on different pages of your site
// You could also load one main bundle on every page with supplementary scripts as needed (e.g. for commenting or a contact page); it's up to you!
function voidx_js_footer_enqueue() {

  // Set the file name for the footer script
  $script = voidx_js_footer_script();

  // Register and enqueue the footer script
  // The handle is the same for each bundle since we're only loading one script; if you load others be sure to provide a new handle
  wp_register_script( 'footer-script', get_stylesheet_directory_uri() . $script, array('jquery'), filemtime(get_stylesheet_directory() . $script), true ); // `true` = load script in footer!
  wp_enqueue_script( 'footer-script' );

  // Pass variables to footer scripts at runtime; see: http://codex.wordpress.org/Function_Reference/wp_localize_script
  // Note: these can't be declared until *after* the associated script has been registered and enqueued
  $vars = apply_filters( 'voidx_footer_script_vars', array() );
  if ( !empty($vars) ) {
    foreach ( $vars as $var => $data ) {
      wp_localize_script( 'footer-script', $var, $data );
    }
  }
}
add_action( 'wp_enqueue_scripts', 'voidx_js_footer_enqueue' );



// Provision footer scripts with important variables (strings only)
function voidx_js_footer_vars( $vars ) {

  // Example integraton: WP AJAX Page Loader (similar to Infinite Scroll); this script is only loaded when the conditions below are met
  // This script must be provisioned with some extra data via the `wp_localize_script` function as outlined in the documentation: https://github.com/synapticism/wp-ajax-page-loader
  if ( VOIDX_SCRIPTS_PAGELOAD && ( is_archive() || is_home() || is_search() ) ) {

    // This chunk of code provisions the script with vital info: What page are we on? And what is the page limit?
    global $wp_query;
    $vars['PG8Data'] = array(
      'startPage'   => ( get_query_var('paged') > 1 ) ? get_query_var('paged') : 1,
      'maxPages'    => $wp_query->max_num_pages,
      'nextLink'    => next_posts($wp_query->max_num_pages, false)
    );
  }
  return $vars;
}
add_filter( 'voidx_footer_script_vars', 'voidx_js_footer_vars' );



// Load scripts on singular content; a useful technique for conditional loading of the core comments script, for example
function voidx_js_singular() {
  if ( !is_singular() )
    return;

  // Load core WordPress script for handling threaded comments where appropriate
  // This isn't really useful since comments aren't a feature of this simple theme but you get the idea
  if ( comments_open() && get_option('thread_comments') )
    wp_enqueue_script( 'comment-reply' );
}
add_action( 'wp_enqueue_scripts', 'voidx_js_singular' );
