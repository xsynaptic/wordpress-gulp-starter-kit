// ==== FOOTER ==== //

// A simple wrapper for all your custom jQuery that belongs in the footer
;(function($){
  $(function(){
    // Example integration: JavaScript-based human-readable timestamps
    if ($.timeago) {
      $('time').timeago();
    }
  });
}(jQuery));
