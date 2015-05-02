<div id="wrap-sidebar" class="wrap-sidebar">
  <?php if ( is_active_sidebar( 'sidebar-main' ) ) { ?>
    <div id="secondary" class="widget-area" role="complementary">
      <?php dynamic_sidebar( 'sidebar-main' ); ?>
    </div>
  <?php } ?>
</div>
