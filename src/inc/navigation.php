<?php // ==== NAVIGATION ==== //

// Post navigation, a bare bones implementation
if ( !function_exists( 'voidance_post_navigation' ) ) : function voidance_post_navigation() {
  ?><nav class="nav-posts" role="navigation">
    <div class="nav-links">
    <?php if ( get_previous_posts_link() ) { ?>
      <div class="nav-previous">
        <?php previous_posts_link( __( '<span class="nav-arrow">&larr; </span>Previous', 'voidance' ) ); ?>
      </div>
    <?php } if ( get_next_posts_link() ) { ?>
      <div class="nav-next">
        <?php next_posts_link( __( 'Next<span class="nav-arrow"> &rarr;</span>', 'voidance' ) ); ?>
      </div>
    <?php } ?>
    </div>
  </nav><?php
} endif;
