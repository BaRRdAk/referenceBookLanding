function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

function closePopup() {
  $('.t651__btn').removeClass('btn_active');
  $('.popup').removeClass('popup_show');
  $('.popup').not('.popup_show').css('display', 'none');
}

function showPopup() {
  $('.btn_wrapper').removeClass('t651__btn_animate');
  $('.btn-text').css('display', 'none');
  $('.popup').css('display', 'block');
  $('.popup').addClass('t651__popup_show');
  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
      closePopup()
    }
  })
}

function init() {
  if (window.$isMobile) {
    if ($('.t651__phone').length == 0) {
      return
    }
    t651_phone = $('.t651__phone').html().replace(/\s+/g, '');
    $('.t651__btn').click(function() {
      window.location.href = "tel:" + t651_phone;
      $('.btn_wrapper').removeClass('t651__btn_animate');
      $('.btn-text').css('display', 'none')
    });
    return
  }
  var obj = $('.t651__btn');
  obj.click(function(e) {
    if (obj.hasClass("btn_active")) {
      closePopup();
      return
    }
    obj.addClass("btn_active");
    showPopup();
    e.preventDefault();
  })
  
  $(window).bind('scroll', throttle(function() {
    if ($(window).scrollTop() > $(window).height()) {
      if ($('.btnTop').css('display') == "none") {
        $('.btnTop').css("display", "block");
      }
    } else {
      if ($('.btnTop').css('display') == "block") {
        $('.btnTop').css("display", "none");
      }
    }
  }, 200));
  
  $('.btnTop').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
    return false;
  });

  
  $( "#formCall" ).submit(function( event ) {
    $('.formContent').css('display', 'none');
    $('.blockinput-success').css('display', 'block');
    event.preventDefault();
  });
  
}
