function count_twitter(selector, startCount) {

	var url = location.href;
	url = url.replace('geeks-dev.hateblo.jp', 'www.geeks-dev.com')
	if (typeof startCount === "undefined") {
		url = url.replace('/entry', '') + "/"
	}
	$.ajax({
		url: "http://jsoon.digitiminimi.com/twitter/count.json",
		dataType: "jsonp",
		data: {
			url: url
		},
		//取得に成功した時の処理
		success: function(obj) {
			var count = obj.count;
			if (typeof startCount === "undefined") {
				count_twitter(selector, count);
			} else {
				$(selector).html(parseInt(startCount) + parseInt(count));
			}
		},
		//取得に失敗した時の処理
		error: function() {
			if (typeof startCount === "undefined") {
				count_twitter(selector, 0);
			}
		},
		//完了した時の処理
		complete: function() {
			return false;
		}
	});
}

function count_hatebu(selector, startCount) {

	var url = location.href;
	url = url.replace('geeks-dev.hateblo.jp', 'www.geeks-dev.com')
	if (typeof startCount === "undefined") {
		url = url.replace('/entry', '') + "/"
	}
	// console.log(url)

	$.ajax({
		url: 'http://api.b.st-hatena.com/entry.count',
		dataType: 'jsonp',
		jsonpCallback: 'callback',
		data: {
			url: url
		},
		success: function(count) {
			if (!count) {
				count = 0;
			}
			if (typeof startCount === "undefined") {
				count_hatebu(selector, count);
			} else {
				$(selector).html(parseInt(startCount) + parseInt(count));
			}
		},
		error: function(err) {
			if (typeof startCount === "undefined") {
				count_hatebu(selector, 0);
			}
		},
		complete: function() {
			return false;
		}
	});
}

function count_facebook(selector, startCount) {
	//Ajax通信
	var url = location.href;
	url = url.replace('geeks-dev.hateblo.jp', 'www.geeks-dev.com')
	if (typeof startCount === "undefined") {
		url = url.replace('/entry', '') + "/"
	}
	// console.log(url);
	$.ajax({
		url: "http://graph.facebook.com/",
		dataType: "json",
		data: {
			id: url
		},
		//取得に成功した時の処理
		success: function(obj) {
			//データが存在しない場合は0扱い
			var count = obj.shares;
			if (typeof(obj.shares) === 'undefined') {
				count = 0;
			}
			// if (typeof startCount === "undefined") {
			// 	count_facebook(selector, count);
			// } else {
			// 	$(selector).html(startCount + count);
			// }
			$(selector).html(count);
		},
		//取得に失敗した時の処理
		error: function() {
			// if (typeof startCount === "undefined") {
			$(selector).html(0);
			// }
		},
		//完了した時の処理
		complete: function() {
			return false;
		}

	});
}

function count_pocket(selector, startCount) {

	var url = location.href;
	url = url.replace('geeks-dev.hateblo.jp', 'www.geeks-dev.com')
	if (typeof startCount === "undefined") {
		url = url.replace('/entry', '') + "/"
	}

	$.ajax({
		type: "get",
		dataType: "xml",
		url: "http://query.yahooapis.com/v1/public/yql",
		data: {
			q: "SELECT content FROM data.headers WHERE url='https://widgets.getpocket.com/v1/button?label=pocket&count=vertical&v=1&url=" + url + "' and ua='#Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'",
			format: "xml",
			env: "http://datatables.org/alltables.env"
		},
		success: function(data) {
			var content = jQuery(data).find("content").text();
			var match = content.match(/<em id="cnt">(\d+)<\/em>/i);
			var count = 0;
			if (match !== null) {
				count = match[1];
			}
			if (typeof startCount === "undefined") {
				count_pocket(selector, count);
			} else {
				$(selector).html(parseInt(startCount) + parseInt(count));
			}
		},
		//取得に失敗した時の処理
		error: function() {
			if (typeof startCount === "undefined") {
				count_pocket(selector, 0);
			}
		},
		//完了した時の処理
		complete: function() {
			return false;
		}
	});
}

function count_feedly(selector) {
	var url = "http://www.geeks-dev.com";
	// var url = location.origin;
	$.ajax({
		type: "get",
		dataType: "json",
		url: "http://query.yahooapis.com/v1/public/yql",
		data: {
			q: "SELECT content FROM data.headers WHERE url='http://knowledgecolors.net/mt/mt-static/fsc2/getFeedlyInfo.php?feedkey=" + url + "&resmax=' and ua='#Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'",
			format: "json",
			env: "http://datatables.org/alltables.env"
		},
		success: function(data) {
			var count = 0;
			var content = data.query.results.resources.content;
			var match = content.match(/<strong>(\d+)<\/strong>/i);
			if (match !== null) {
				count = match[1];
			}
			$(selector).html(parseInt(count));
		},
		//取得に失敗した時の処理
		error: function() {
			$(selector).html('error');
		},
		//完了した時の処理
		complete: function() {
			return false;
		}
	});
}

function subWindowOpen(location, windowName, width, height) {
	var option = "width=" + width + ",height=" + height + "menubar=no, toolbar=no, scrollbars=yes";

	if (typeof window.screenX != "undefined") {
		// Chrome
		option +=",screenX=" + (window.screenX + (window.screen.availWidth - width) / 2) + ",screenY=" + (window.screenY + (window.screen.availHeight - height) / 2);

	} else if (typeof window.screenLeft != "undefined") {
		// IE
		option += ",left=" + (window.screenLeft + (window.screen.availWidth - width) / 2) + ",top=" + (window.screenTop + (window.screen.availHeight - height) / 2);
	}
	window.open(location, windowName, option);
}

function popupTweet() {
	var url = location.href;
	var title = document.title;
	var openURL = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url) + "&original_referer=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(title) + "&via=geeksdev";

	subWindowOpen(openURL, 'popup', 600, 630);
}

function popupFb(){
	var url = location.href;
	var openURL = "http://www.facebook.com/share.php?u=" + encodeURIComponent(url);

	subWindowOpen(openURL, 'popup', 600, 630);
}

function popupHatebu(){
	var url = location.href;
	var openURL = "http://b.hatena.ne.jp/entry/" + url;

	subWindowOpen(openURL, 'popup', 830, 600);
}

function popupPocket(){

	var url = location.href;
	var title = document.title;
	var openURL = "http://getpocket.com/edit?url=" + encodeURIComponent(url) + '&title=' + title;

	subWindowOpen(openURL, 'popup', 600, 630);
}

$(function() {
	$('.sns-twitter').bind('click',popupTweet);
	$('.sns-facebook').bind('click',popupFb);
	$('.sns-bookmark').bind('click',popupHatebu);
	$('.sns-pocket').bind('click',popupPocket);
})

$(window).load(function() {


	if (location.pathname.split('/')[1] == 'entry') {

		count_twitter('.sns-twitter .count');
		count_facebook('.sns-facebook .count');
		count_hatebu('.sns-bookmark .count');
		count_pocket('.sns-pocket .count');
		count_feedly('.feedly-count');

	}


});;