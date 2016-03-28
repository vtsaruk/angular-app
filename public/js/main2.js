  // $(document).ready(function(){

  //     //search result items hover
  //     $('.search-right-side-girls-item').mouseenter(function(){
  //         $(this).find('.search-right-side-girls-item-list').fadeIn();
  //     });
  //     $('.search-right-side-girls-item').mouseleave(function(){
  //         $(this).find('.search-right-side-girls-item-list').fadeOut();
  //     });
  //     //gifts left sub-menu open
  //     $('.list-cat-ul li').click(function(e){
  //       e.preventDefault();
  //       $(this).children('ul').show();
  //       $(this).find('img').attr('src','img/list-cat-right-bottom.png');
  //       $(this).siblings().children('ul').hide();
  //       $(this).siblings().find('img').attr('src','img/list-cat-right-arrow.png');
  //     });
  //     //gifts open popup
  //     $('.gifts-bouquet-item .btn-send').click(function(){
  //       $('.gifts-popup-container,.gifts-popup').show();
  //     });
  //     $('.gifts-popup, #gifts-popup-cancel').click(function(){
  //       $('.gifts-popup-container,.gifts-popup').hide();
  //     });
  //     //card active
  //     $('.gifts-popup-card-left-side .card').click(function(){
  //       $(this).addClass('active');
  //       $(this).siblings().removeClass('active');
  //     });
  //      //change-email popup
  //     $('#change-email').click(function(e){
  //       e.preventDefault();
  //       $('.modal-change-email').fadeIn(300);
  //       $('.modal-change-email-form').fadeIn(500);
  //     });
  //     $('.modal-change-email').click(function(e){
  //       $('.modal-change-email').fadeOut(300);
  //       $('.modal-change-email-form').fadeOut(500);
  //     });
  //     $('.vote-lady .girl-item').click(function(){
  //       $(this).children('.girls-info').addClass('active');
  //       $(this).parent().siblings().find('.girls-info').removeClass('active');
  //     });
  //     // main-members-item active items
  //     $('.main-members-item').click(function(){
  //       $(this).addClass('active');
  //       $(this).siblings().removeClass('active');
  //     });
  //     $('.main-members-chat-status').click(function(){
  //       alert('click status button!');
  //     });
  //     //gifts-tabs active items
  //     $('.gifts-tabs li a').click(function(e){
  //       e.preventDefault();
  //       var item = $(this).closest('li'),
  //           contentItem = $('.gifts-tabs-item'),
  //           itemPos = item.index();
  //           contentItem.eq(itemPos)
  //                       .add(item)
  //                       .addClass('active')
  //                       .siblings().removeClass('active');
  //     });
  //     //main-members-nav active items
  //     $('.main-members-nav li a').click(function(e){
  //       e.preventDefault();
  //       var item = $(this).closest('li'),
  //           contentItem = $('.main-members-wrap'),
  //           itemPos = item.index();
  //           contentItem.eq(itemPos)
  //                       .add(item)
  //                       .addClass('active')
  //                       .siblings().removeClass('active');
  //     });
  //     $('.message-tabs-item').click(function(e){
  //         var messageItem = $(this),
  //           contentItem_m = $('.main-content'),
  //           itempos_M = messageItem.index();
  //           contentItem_m.eq(itempos_M)
  //                       .add(messageItem)
  //                       .addClass('active')
  //                       .siblings().removeClass('active');
  //     });
  //     //form tabs
  //       $('.form-register-tabs button').click(function(){
  //           $(this).addClass('active');
  //           $(this).siblings().removeClass('active');
  //           $('.form-register form').toggleClass('hidden');
  //       });
  //     //girls-info hover
  //       $('.girls-info').mouseenter(function(){
  //         $(this).children('.girls-fix-info').fadeIn(300);
  //       });
  //       $('.girls-info').mouseleave(function(){
  //         $(this).children('.girls-fix-info').fadeOut(300);
  //       });
  //       //owl
  //       var owl = $("#owl-demo");

		//   owl.owlCarousel({
		//       items : 2, //10 items above 1000px browser width
		//       itemsDesktop : [1000,2], //5 items between 1000px and 901px
		//       itemsDesktopSmall : [900,3], // betweem 900px and 601px
		//       itemsTablet: [600,2], //2 items between 600 and 0
		//       itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
		//   });

		//   // Custom Navigation Events
		//   $(".next").click(function(){
		//     owl.trigger('owl.next');
		//   })
		//   $(".prev").click(function(){
		//     owl.trigger('owl.prev');
		//   })
  //     var owl2 = $("#owl-demo2");

  //     owl2.owlCarousel({
  //         items : 1, //10 items above 1000px browser width
  //         itemsDesktop : [1000,2], //5 items between 1000px and 901px
  //         itemsDesktopSmall : [900,3], // betweem 900px and 601px
  //         itemsTablet: [600,2], //2 items between 600 and 0
  //         itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
  //     });

  //     // Custom Navigation Events
  //     $(".next").click(function(){
  //       owl2.trigger('owl.next');
  //     })
  //     $(".prev").click(function(){
  //       owl2.trigger('owl.prev');
  //     })




  //    //owl3

  //      var owl3 = $("#owl-demo3");

  //     owl3.owlCarousel({
  //         items : 4, //10 items above 1000px browser width
  //         itemsDesktop : [1000,2], //5 items between 1000px and 901px
  //         itemsDesktopSmall : [900,3], // betweem 900px and 601px
  //         itemsTablet: [600,2], //2 items between 600 and 0
  //         itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
  //     });

  //     // Custom Navigation Events
  //     $(".next").click(function(){
  //       owl3.trigger('owl.next');
  //     })
  //     $(".prev").click(function(){
  //       owl3.trigger('owl.prev');
  //     })


  //     var owl4 = $("#owl-demo4");

  //     owl4.owlCarousel({
  //         items : 1, //10 items above 1000px browser width
  //         itemsDesktop : [1000,2], //5 items between 1000px and 901px
  //         itemsDesktopSmall : [900,3], // betweem 900px and 601px
  //         itemsTablet: [600,2], //2 items between 600 and 0
  //         pagination:true,
  //         itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
  //     });

  //     // Custom Navigation Events
  //     $(".next").click(function(){
  //       owl4.trigger('owl.next');
  //     })
  //     $(".prev").click(function(){
  //       owl4.trigger('owl.prev');
  //     })

  //     var owl5 = $("#owl-demo5");

  //     owl5.owlCarousel({
  //         items : 4, //10 items above 1000px browser width
  //         itemsDesktop : [1000,2], //5 items between 1000px and 901px
  //         itemsDesktopSmall : [900,3], // betweem 900px and 601px
  //         itemsTablet: [600,2], //2 items between 600 and 0
  //         pagination:true,
  //         itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
  //     });

  //     // Custom Navigation Events
  //     $(".next").click(function(){
  //       owl5.trigger('owl.next');
  //     })
  //     $(".prev").click(function(){
  //       owl5.trigger('owl.prev');
  //     })

  //   });