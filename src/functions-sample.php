<?php // ==== FUNCTIONS ==== //

// An example of how to enqueue scripts and stylesheets
if ( !function_exists( 'my_theme_enqueue_scripts' ) ) : function my_theme_enqueue_scripts() {

  // Front-end scripts
  if ( !is_admin() ) {

    // Load minified scripts if debug mode is off
    if ( WP_DEBUG === true ) {
      $suffix = '';
    } else {
      $suffix = '.min';
    }

    // Load theme-specific JavaScript with versioning based on last modified time; http://www.ericmmartin.com/5-tips-for-using-jquery-with-wordpress/
    wp_enqueue_script( 'my-theme-core', get_stylesheet_directory_uri() . '/js/core' . $suffix . '.js', array( 'jquery' ), filemtime( get_template_directory() . '/js/core' . $suffix . '.js' ), true );

    // Conditionally load another script
    if ( is_singular() ) {
      wp_enqueue_script( 'my-theme-extras', get_stylesheet_directory_uri() . '/js/extras' . $suffix . '.js', array( 'jquery' ), filemtime( get_template_directory() . '/js/extras' . $suffix . '.js' ), true );
    }
  }

  // Register and enqueue our main stylesheet with versioning based on last modified time
  wp_register_style( 'my-theme-style', get_stylesheet_uri(), array(), filemtime( get_template_directory() . '/style.css' ) );
  wp_enqueue_style( 'my-theme-style' );

} endif;
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_scripts' );
