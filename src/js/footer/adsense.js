if ($("html").data('device') == 'pc') {
    if ($("body").hasClass('page-entry')) {
        addEventListener("DOMContentLoaded", function() {
            var $target = $('.entry-content img');
            $target.eq(0).after('<div class="adsense-wrapper entry-content-top"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7565301559797765" data-ad-slot="4072565909" ></ins></div>');
            (adsbygoogle = window.adsbygoogle || []).push({});
        }, false);
    }
} else {
    if ($("body").hasClass('page-entry')) {
        $('.adsense-wrapper.sp-list-top').remove();
    }
    (adsbygoogle = window.adsbygoogle || []).push({});
    (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-7565301559797765",
        enable_page_level_ads: true
    });
}
(adsbygoogle = window.adsbygoogle || []).push({});
(adsbygoogle = window.adsbygoogle || []).push({});