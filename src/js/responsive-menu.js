// ==== RESPONSIVE MENU ==== //

// Menu toggle script adapted from _s: https://github.com/Automattic/_s
;(function() {
  var nav       = document.getElementById('site-navigation'),
      menu      = document.getElementById('responsive-menu'),
      button    = document.getElementById('responsive-menu-toggle');

  // Early exit if we're missing anything essential
  if (!nav || typeof button === 'undefined') {
    return;
  }

  // Hide button if menu is empty and return early
  if (typeof menu === 'undefined') {
    button.style.display = 'none';
    return;
  }

  // Toggle navigation; add or remove a class to both the button and the nav element itself
  button.onclick = function() {
    if (button.className.indexOf( 'active' ) !== -1) {
      nav.style.display = 'none';
      button.className = button.className.replace(' active', '');
    } else {
      nav.style.display = 'block';
      button.className += ' active';
    }
  };
} )();
