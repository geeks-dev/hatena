
// window.jQuery = require('jquery');
// window.$ = window.jQuery;
// // transit($);
// require('jquery.transit');
// jqueryTransit($);
require('./social.js');
require('./scrollSocialArea.js');
require('./speedDial.js');

require('material-design-lite/src/mdlComponentHandler.js');
require('material-design-lite/src/button/button.js');
require('material-design-lite/src/ripple/ripple.js');
require('material-design-lite/src/ripple/ripple.js');
smoothScroll = require('smooth-scroll/dist/js/smooth-scroll.min.js');
smoothScroll.init({
    selector: '[data-scroll]',
    selectorHeader: '[data-scroll-header]',
    speed: 500,
    easing: 'easeInOutCubic',
    offset: 0,
    updateURL: false
});

// require('material-design-lite/dist/material.min.js');


