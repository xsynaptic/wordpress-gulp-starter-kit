<?php // ==== ASSETS ==== //

// Now that you have efficiently generated scripts and stylesheets for your theme, how should they be integrated?
// This file walks you through the approach I use...

// Enqueue front-end scripts and styles
if ( !function_exists( 'voidance_enqueue_scripts' ) ) : function voidance_enqueue_scripts() {

  $script_name = '';                // Empty by default, may be populated by conditionals below
  $script_vars = array();           // An empty array that can be filled with variables to send to front-end scripts
  $script_handle = 'voidance';      // A generic script handle
  $suffix = '.min';                 // The suffix for minified scripts
  $ns = 'wp';                       // Namespace

  // Load original scripts when debug mode is on
  if ( WP_DEBUG === true )
    $suffix = '';

  // Figure out which script bundle to load based on various options set in `src/functions-config-defaults.php`
  // Note: bundles require less HTTP requests at the expense of addition caching hits when different scripts are requested
  // You could also load one main bundle on every page with supplementary scripts as needed (e.g. for commenting)

  // Headroom.js (hr)
  if ( VOIDANCE_SCRIPTS_HEADROOM )
    $script_name .= '-hr';

  // WP AJAX Page Loader (pg8); this requires a bit more setup as outlined in the documentation: https://github.com/synapticism/wp-ajax-page-loader
  $script_vars_pg8 = '';
  if ( VOIDANCE_SCRIPTS_PAGELOAD && ( is_archive() || is_home() || is_search() ) ) {
    $script_name .= '-pg8';

    global $wp_query;

    // What page are we on? And what is the page limit?
    $max = $wp_query->max_num_pages;
    $paged = ( get_query_var( 'paged' ) > 1 ) ? get_query_var( 'paged' ) : 1;

    // Prepare script variables; note that these are separate from the rest of the script variables
    $script_vars_pg8 = array(
      'startPage'   => $paged,
      'maxPages'    => $max,
      'nextLink'    => next_posts( $max, false )
    );
  } // end PG8

  // Default script name
  if ( empty( $script_name ) )
    $script_name = '-core';

  // Load theme-specific JavaScript bundles with versioning based on last modified time; http://www.ericmmartin.com/5-tips-for-using-jquery-with-wordpress/
  // The handle is the same for each bundle since we're only loading one script; if you load others be sure to provide a new handle
  wp_enqueue_script( $script_handle, get_stylesheet_directory_uri() . '/js/' . $ns . $script_name . $suffix . '.js', array( 'jquery' ), filemtime( get_template_directory() . '/js/' . $ns . $script_name . $suffix . '.js' ), true );

  // Pass variables to JavaScript at runtime; see: http://codex.wordpress.org/Function_Reference/wp_localize_script
  $script_vars = apply_filters( 'voidance_script_vars', $script_vars );
  if ( !empty( $script_vars ) )
    wp_localize_script( $script_handle, 'voidanceVars', $script_vars );

  // Script variables for WP AJAX Page Loader (these are separate from the main theme script variables due to the naming requirement)
  if ( !empty( $script_vars_pg8 ) )
    wp_localize_script( $script_handle, 'PG8Data', $script_vars_pg8 );

  // Register and enqueue our main stylesheet with versioning based on last modified time
  wp_register_style( 'voidance-style', get_stylesheet_uri(), $dependencies = array(), filemtime( get_template_directory() . '/style.css' ) );
  wp_enqueue_style( 'voidance-style' );

  // Google Web Fonts loader
  $font_url = voidance_get_font_url();
  if ( !empty( $font_url ) )
    wp_enqueue_style( 'voidance-fonts', esc_url_raw( $font_url ), array(), null );

} endif;
if ( !is_admin() )
  add_action( 'wp_enqueue_scripts', 'voidance_enqueue_scripts' );



// Provision the front-end with the appropriate script variables
function voidance_update_script_vars( $script_vars = array() ) {

  // Non-destructively merge script variables if a particular condition is met
  if ( 1 == 1 ) {
    $script_vars = array_merge( $script_vars, array(
      'ajaxUrl'       => admin_url( 'admin-ajax.php' ),
      'nameSpaced'    => array(
        'test1'         => __( 'Testing 1, 2, 3!', 'pendrell' ),
        'test2'         => __( 'This is easier than it looks :)', 'pendrell' )
    ) ) );
  }
  return $script_vars;
}
add_filter( 'voidance_script_vars', 'voidance_update_script_vars' );



// Simplified Google Font loading; adapted from Twenty Twelve
if ( !function_exists( 'voidance_get_font_url' ) ) : function voidance_get_font_url( $fonts = '' ) {
  $font_url = '';

  // Allows us to pass a Google Web Font declaration as needed
  if ( empty( $fonts ) )
    $fonts = VOIDANCE_GOOGLE_FONTS ? VOIDANCE_GOOGLE_FONTS : 'Open+Sans:400italic,700italic,400,700'; // Default back to Open Sans

  // Encode commas and pipe characters; explanation: http://www.designfordigital.com/2014/04/07/google-fonts-bad-value-css-validate/
  $fonts = str_replace( ',', '%2C', $fonts );
  $fonts = str_replace( '|', '%7C', $fonts );

  $protocol = is_ssl() ? 'https' : 'http';

  $font_url = "$protocol://fonts.googleapis.com/css?family=" . $fonts;

  return $font_url;
} endif;
