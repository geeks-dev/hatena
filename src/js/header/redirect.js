var urls = ['entry', 'archive', 'search', 'about', 'preview']
	// var pathname = '/search'
var pathname = location.pathname.replace(/^\//g, '').replace(/\/.*/, '');
var redirect = true;
for (var i in urls) {
	if (urls[i].indexOf(pathname) == 0) {
		redirect = false
	}
}

if (redirect) {
	location.href = location.origin + '/entry/' + pathname;
}

