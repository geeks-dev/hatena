/**
 * Speed dials
 */

var MaterialSpeedDial = function() {};

// Add mouse event on element
MaterialSpeedDial.upgradeItem = function(item) {
	if (item instanceof Element) {
		if (item.firstElementChild !== null) {
			if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
				item.firstElementChild.addEventListener("touchend", function(e) {
					item.classList.toggle("is-active");
				});
			}else{
				item.firstElementChild.addEventListener("mouseenter", function(e) {
					item.classList.add("is-active");
				});
				// On mouse leave
				item.addEventListener("mouseleave", function(e) {
					item.classList.remove("is-active");
				});
			}
		}
	}
};

// Add events on multiple elements
MaterialSpeedDial.upgradeItems = function(items) {
	for (var i = 0; i < items.length; i++) {
		MaterialSpeedDial.upgradeItem(items[i]);
	}
};

document.addEventListener("DOMContentLoaded", function() {

	// Upgrading speed dials
	var items = document.getElementsByClassName("mdl-speed-dial");
	MaterialSpeedDial.upgradeItems(items);

});