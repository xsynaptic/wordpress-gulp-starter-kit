<?php // ==== NAVIGATION ==== //

// Post navigation, a bare bones implementation
if ( !function_exists( 'voidx_post_navigation' ) ) : function voidx_post_navigation() {
  ?><nav class="nav-posts" role="navigation">
    <div class="nav-links">
    <?php if ( get_previous_posts_link() ) { ?>
      <div class="nav-previous prev-page">
        <?php previous_posts_link( __( '<span class="nav-arrow">&larr; </span>Previous', 'voidx' ) ); ?>
      </div>
    <?php } if ( get_next_posts_link() ) { ?>
      <div class="nav-next next-page">
        <?php next_posts_link( __( 'Next<span class="nav-arrow"> &rarr;</span>', 'voidx' ) ); ?>
      </div>
    <?php } ?>
    </div>
  </nav><?php
} endif;
