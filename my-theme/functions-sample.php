<?php // ==== FUNCTIONS ==== //

// An example of how to enqueue scripts and stylesheets
if ( !function_exists( 'my_theme_enqueue_scripts' ) ) : function my_theme_enqueue_scripts() {

  // Load theme-specific JavaScript with versioning based on last modified time; http://www.ericmmartin.com/5-tips-for-using-jquery-with-wordpress/
  if ( !is_admin() ) {
    wp_enqueue_script( 'my-theme', get_stylesheet_directory_uri() . '/build.min.js', array( 'jquery' ), filemtime( get_template_directory() . '/build.min.js' ), true );
    wp_enqueue_script( 'my-theme-plugins', get_stylesheet_directory_uri() . '/build-plugins.min.js', array( 'jquery' ), filemtime( get_template_directory() . '/build-plugins.min.js' ), true );
  }

  // Register and enqueue our main stylesheet with versioning based on last modified time
  wp_register_style( 'my-theme-style', get_stylesheet_uri(), array(), filemtime( get_template_directory() . '/style.css' ) );
  wp_enqueue_style( 'my-theme-style' );

} endif;
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_scripts' );
