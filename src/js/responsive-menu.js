// ==== RESPONSIVE NAVIGATION MENU ==== //

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
    if (button.className.indexOf( 'toggled' ) !== -1) {
      button.className = button.className.replace(' toggled', '');
    } else {
      button.className += ' toggled';
    }

    if (menu.className.indexOf( 'toggled' ) !== -1) {
      menu.className = menu.className.replace(' toggled', '');
    } else {
      menu.className += ' toggled';
    }
  };
} )();
