//=====================================================================================

(function ($) {
  $(window).on("scroll", function () {
    var bodyScroll = $(window).scrollTop(),
      navbar = $(".main_nav"),
      logo = $(".main_nav .navbar-brand> img");

    if (bodyScroll > 100) {
      navbar.addClass("nav-scroll");
    } else {
      navbar.removeClass("nav-scroll");
    }
  });

  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  $('[data-fancybox="gallery"]').fancybox({
    animationEffect: "zoom-in-out",
    transitionEffect: "slide",
    transitionEffect: "slide",
  });

  //=====================================================================================
  //  Youtube and Vimeo video popup control
  //=====================================================================================

  jQuery(function () {
    jQuery("a.video-popup").YouTubePopUp();
    //jQuery("a.video-popup").YouTubePopUp( { autoplay: 0 } ); // Disable autoplay
  });
})(jQuery);
