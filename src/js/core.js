// ==== CORE ==== //

// A simple wrapper for all your custom jQuery; everything in this file will be run on every page
;(function($){
  $(function(){
    // Example integration: JavaScript-based human-readable timestamps
    if ($.timeago) {
      $('time').timeago();
    }
  });
}(jQuery));
