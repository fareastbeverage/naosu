(function ($) {
  "use strict";

  $.ajaxSetup({
      headers: {'X-CSRF-Token': $("#_csrf").val()}
  });

  //prevent html injection
  function escapeHTML(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

  // Preloader (if the #preloader div exists)
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Header and Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-scrolled');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-scrolled');
    }
  });

  // Back to top button
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Intro background carousel
  $("#intro-carousel").owlCarousel({
    autoplay: true,
    dots: false,
    loop: true,
    animateOut: 'fadeOut',
    items: 1
  });

  // Initiate the wowjs animation library
  new WOW().init();


  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Smooth scroll for the navigation and links with .scrollto classes
  $('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (! $('#header').hasClass('header-scrolled')) {
            top_space = top_space - 40;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.main-nav, .mobile-nav').length) {
          $('.main-nav .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.main-nav, .mobile-nav');
  var main_nav_height = $('#header').outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();
  
    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
          bottom = top + $(this).outerHeight();
  
      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('active');
        main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('active');
      }
    });
  });

  // jQuery counterUp (used in Whu Us section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 }
    }
  });

  //subscription form validation
  $("#subscription_form").bootstrapValidator({
        message: 'This value is not valid.',
        excluded: [':disabled'],
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your email.'
                    }
                    /* 
                    regexp: {
                        regexp: /^.{1,}@siaksiong.com.my$/,
                        message: 'Please enter a valid company email.'
                    }*/
                }
            }
        }
    })
    .on('error.field.bv', function(e, data) {
        data.element.removeClass('is-valid').addClass('is-invalid');
        data.element.parents('.form-group').find('small').addClass('text-danger');
        $("#email_err").html("");
    })
    .on('success.field.bv', function(e, data) {
        data.element.removeClass('is-invalid').addClass('is-valid');
        $("#email_err").html("");
    })
    .on('success.form.bv', function(e) {
        //$("#subscription-button").prop("disabled",false);
        e.preventDefault();
        var email = escapeHTML($('input[name=email]').val());
        alert('yes');

        $.ajax({
            url: 'php/subscription.php',
            method: 'post',
            data: {email: email},
            success: function(response) {
                alert('done');
                //trigger submisison
                if (response.startsWith('ERROR')) {
                  //showing error message
                  alert(response);
                } else if (response.startsWith('SUBSCRIBED')) {
                  //show error stating that this email has already been subscribed
                  $("#email_input").removeClass('is-valid').addClass('is-invalid');
                  $("#email_err").html("<small class='text-danger'>This email has already been subscribed.</small>");
                } else {
                  //show success alert notification
                  $("#subscription_content").html("<br><h4>Thank you for subscribing!</h4><p>Check your email for confirmation message.</p>");
                  
                }

                //open thank you modal
                //close
            }
        });
    });

})(jQuery);

