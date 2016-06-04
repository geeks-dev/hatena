$(function() {
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 460) {
			$('#scroll-social-btn').addClass('d-fixed');
		} else {
			$('#scroll-social-btn').removeClass('d-fixed');
		}
	});
});