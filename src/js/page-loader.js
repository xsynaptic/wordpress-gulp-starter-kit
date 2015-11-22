// ==== WP AJAX PAGE LOADER ==== //

// Invoke the AJAX page loader; this is in its own file as the script is conditionally loaded by the theme
;(function($){
  $(function(){
    $(document.body).ajaxPageLoader();
  });
}(jQuery));
