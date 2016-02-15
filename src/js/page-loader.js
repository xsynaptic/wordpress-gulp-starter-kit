// ==== WP AJAX PAGE LOADER ==== //

// Invoke the AJAX page loader; this is in its own file as the script is conditionally loaded by the theme
;(function($){
  $(function(){
    $(document.body).ajaxPageLoader();

    // If jQuery.timeago exists also update timestamps on AJAX page load; if you remove the timeago script this can be deleted
    if ($.timeago) {
      document.addEventListener("DOMContentLoaded", function (event) {
        $('time').timeago();
      });
    }
  });
}(jQuery));
