// import $ from 'jquery'

import WOW from 'wow.js'
import Swiper from 'swiper/bundle'; 
import {SwiperCore, Scrollbar, Pagination, Navigation, Autoplay, Controller} from 'swiper/core';

window.jQuery = $
window.$ = $



document.addEventListener('DOMContentLoaded', () => {


	// SET CONFIG  
	new WOW().init();
	Swiper.use([Navigation]);
	Swiper.use([Scrollbar]);
	Swiper.use([Pagination]);
	Swiper.use([Autoplay]);
	Swiper.use([Controller]); 
	// SET CONFIG END



	// HEADER FUNCTIONS
	$(".newheader-contacts__phone_caret").click(function(){
		$(this).toggleClass('active')
		$('.newheader-contacts-block').toggleClass('active')
	});

	// Закрываем попап с контактами при клике вне блока
	$(document).mouseup(function (e){ 
		var div = $(".newheader-contacts"); 
		if (!div.is(e.target) 
		    && div.has(e.target).length === 0) { 
				$('.newheader-contacts-block, .newheader-contacts__phone_caret').removeClass('active')
		}
	});

	if ($(window).width() >= 768){
		$('.newheader-contacts__phone').hover(
			function(){
				$(".newheader-contacts__phone_caret").click();
			},
			function(){
				$(".newheader-contacts__phone_caret").click();
			}
		);
	}


 
	// CATALOG 


		// Кнопка открытия меню
		$('.newheader-main__catalog').click(function(e){
			e.preventDefault();
			$('.burger').toggleClass('on')
			$('.newheader-catalog').toggleClass('open')
			$(".mobile_menu_container").toggleClass("loaded");
			$('body').toggleClass('fixed') // Фиксим боди чтобы не скролился
		});

		// Отображаем нужное подменю
		$('.newheader-catalog >ul >li').hover(function(e){ 
			// e.preventDefault(); 
			if ($(this).has('.newheader-catalog__wrap').length){
				$('.newheader-catalog >ul >li').removeClass('active');
				$(this).addClass('active')
			}
		})

		// Отключаем ссылки первого уровня, если есть подменю
		// $('.newheader-catalog > ul > li > a').click(function(e){
		// 	if ($(this).siblings('.newheader-catalog__wrap').length){
		// 		e.preventDefault()
		// 	}
		// });

		// Открытие меню первого уровня при двойном клике
		// $('.newheader-catalog > ul > li > a').dblclick(function(e){
		// 	window.location.assign($(this).attr('href'));
		// });



		$(".mobile_menu_container .parent").click(function(e) {
			e.preventDefault();
			$(".mobile_menu_container .activity").removeClass("activity");
			$(this).siblings("ul").addClass("loaded").addClass("activity");
		});

		$(document).on("click", ".mobile_menu", function(e) {
			e.preventDefault();
			$(".mobile_menu_container").addClass("loaded");
			$(".mobile_menu_overlay").fadeIn();
		});

		$( ".mobile_menu_container .back").click(function(e) {
			e.preventDefault();
			$(".mobile_menu_container .activity").removeClass("activity");
			$(this).parent().parent().removeClass("loaded");
			$(this).parent().parent().parent().parent().addClass("activity");
		});

		// Скрываем больше 5 элементов в подменю
		$('.newheader-catalog__wrap ul ul').each(function(i,elem){
			if (elem.childElementCount > 5){
				$(elem).after('<span '+'onmouseover='+"$(this).prev().addClass('full');$(this).addClass('hidden');" +' class="more">Еще'+'<img src="/bitrix/templates/stomatorg/images/dist/header/caret.svg">'+'</span>')
			}
		});

		

		// Закрыть меню если открыто и клик вне блока
		$(document).mouseup(function (e){ 
			var div = $(".newheader-catalog,.mobile_menu_container"); 
			if (!div.is(e.target) // если клик был не по нашему блоку
				&& div.has(e.target).length === 0 // и не по его дочерним элементам
				&& !$('.newheader-main__catalog').is(e.target) &&  $('.newheader-main__catalog').has(e.target).length == 0// и не по кнопке каталог
				&& div.hasClass('open')) { //И меню открыто 
					$('.newheader-main__catalog').click();
			}
		});


		// Свайп внутри меню
		let menuMobile = document.getElementById('mobile_menu_container');
		menuMobile.addEventListener('touchstart',handleTouchStart,false);
		menuMobile.addEventListener('touchmove',handleTouchMove,false);

		let x1 = null;
		let y1 = null;
		

		function handleTouchStart(event){
			x1 = event.touches[0].clientX;
			y1 = event.touches[0].clientY;
		}

		function handleTouchMove(event){
			let x2 = event.touches[0].clientX;
			let y2 = event.touches[0].clientY;
			if (!x1 || ((x2 - x1) < 70) || Math.abs(y2 - y1) > 70){
				return false
			}else{
				console.log('swipe')
			} 
			x1 = null;
			y1 = null;
			$('.loaded.activity').find('a.back').click();
		}

	// / HEADER FUNCTIONS END


	// SIDEBAR MOBILE MENU
		$('.left-menu__opener').click(function(){
			$(this).toggleClass('active')
			$('#left-menu').toggleClass('active')
		})

		$(document).mouseup(function (e){ 
			var div = $("#left-menu"); 
			if (!div.is(e.target) // если клик был не по нашему блоку
				&& div.has(e.target).length === 0 // и не по его дочерним элементам
				&& !$('.left-menu__opener').is(e.target) &&  $('.left-menu__opener').has(e.target).length == 0// и не по кнопке открытия
				&& div.hasClass('active')) { //И меню открыто 
					$('.left-menu__opener').click();
			}
		});

	// SIDEBAR MOBILE MENU END


	// SIDEBAR SLIDER

	// Вырубаем автоплей если 1 слайд
	if($(".sidebar-banners .sidebar-banners__item").length == 1) {
		$('.sidebar-banners .swiper-wrapper').addClass( "disabled" );
	}

	var sidebarSlider = new Swiper('.sidebar-banners', {
		loop: true,
		
		autoplay: {
			delay: 7000,
			disableOnInteraction: true,
		},
		pagination: {
			el: '.sidebar-banners .swiper-pagination',
			dynamicBullets: true,
			clickable: true,
		},
		
	});

	

	// SIDEBAR SLIDER END


	// PRODUCT DAY SLIDER

	// Вырубаем автоплей если 1 слайд
	if($(".product-day-slider .product-day-slider-item").length == 1) {
		$('.product-day-slider .swiper-wrapper').addClass( "disabled" );
	}

	var productDaySlider = new Swiper('.product-day-slider', {
		loop: true,
		
		autoplay: {
			delay: 7000,
			disableOnInteraction: true,
		},
		navigation: {
			nextEl: '.swiper-button-next__productday',
			prevEl: '.swiper-button-prev__productday',
		},
		breakpoints: {
			320: {
			slidesPerView: 1,
			spaceBetween: 0
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 10
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 10
			},
			992: {
				slidesPerView: 1,
				spaceBetween: 0
			},
		}
		
	});

	// PRODUCT DAY SLIDER END


	// PRODUCT DAY SIDEBAR SLIDER

	// Вырубаем автоплей если 1 слайд
	if($(".productday-sidebar-slider .productday-sidebar-slider-item").length == 1) {
		$('.productday-sidebar-slider .swiper-wrapper').addClass( "disabled" );
	}

	var productDaySidebarSlider = new Swiper('.productday-sidebar-slider', {
		loop: true,
		
		autoplay: {
			delay: 7000,
			disableOnInteraction: true,
		},
		navigation: {
			nextEl: '.swiper-button-next__productday_sidebar',
			prevEl: '.swiper-button-prev__productday_sidebar',
		},

		
	});

	// PRODUCT DAY SIDEBAR SLIDER END
 


	// TOPSLIDER

	var topSlider = new Swiper('.topslider-main', {
		loop: true,
		pagination: {
		  el: '.topslider-main .swiper-pagination-top',
		  dynamicBullets: true,
		  clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next__topslider ',
			prevEl: '.swiper-button-prev__topslider',
		},
	  });

	// TOPSLIDER END

	// FILTERSLIDER
	if ($('.swiper-filterslider').length){

		const swiperFilters = Array;
		$('.swiper-filterslider').each(function(){
			var id = $(this).data('id')
			
			swiperFilters[id] = new Swiper ('.swiper-filterslider[data-id="'+id+'"]', {
				grabCursor: true,
				observer: true,
				slidesPerView: 5,
				slidesPerColumn: 1,
				runCallbacksOnInit: true,
				breakpoints: {
				  320: {
					slidesPerView: 1.2,
					spaceBetween: 10
				  },
				  576: {
					slidesPerView: 2,
					spaceBetween: 10
				  },
				  768: {
					slidesPerView: 3,
					spaceBetween: 5,
				  },
				  992: {
					spaceBetween: 10,
					slidesPerView: 3,
				  },
				  1300: {
					slidesPerView: 4
				  },
				  1640: {
					slidesPerView: 5
				  }
				},
				spaceBetween: 10,
				navigation: {
				  nextEl: '.swiper-button-next__filterslider[data-id="'+id+'"]',
				  prevEl: '.swiper-button-prev__filterslider[data-id="'+id+'"]',
				},
				// And if we need scrollbar
				scrollbarHide:false,
				updateOnImagesReady: true
			})


			$('.filterslider-categories[data-id="'+id+'"]').on( 'click', 'li', function() {
				var filter = $(this).attr('data-filter');		
				$('.swiper-filterslider[data-id="'+id+'"] .swiper-slide').css('display', 'none')
				$('.swiper-filterslider[data-id="'+id+'"] .swiper-slide' + filter).css('display', '')
				$( '.filterslider-categories[data-id="'+id+'"] li' ).removeClass( 'active' );
				$( this ).addClass( 'active' );
				
				swiperFilters[id].updateSize();
				swiperFilters[id].updateSlides();
				swiperFilters[id].updateSlidesClasses();
				swiperFilters[id].slideTo(0);
				// filterSlider.scrollbar.updateSize();
				// filterSlider.updateProgress();
				
				return false;
			});

			// Init First tab
			if ($('.filterslider-categories[data-id="'+id+'"] li').length){
				$('.filterslider-categories[data-id="'+id+'"] li').eq(0).click();
			}

		});

	}

	

	




	// Инкремент / декремент инпута 
	$(".filterslider-item-buy__wrapper .incr,.catalog-elements-item-buy__wrapper .incr, .element-buttons-count .incr").click(function(){
		var input = $(this).siblings("input")
		input.val(parseInt(input.val()) + 1);
	})
	$(".filterslider-item-buy__wrapper .decr,.catalog-elements-item-buy__wrapper .decr,.element-buttons-count .decr").click(function(){
		var input = $(this).siblings("input")
		if (parseInt(input.val()) > 1){
			input.val(parseInt(input.val()) - 1);
		}
		
	})

	// FILTERSLIDER END



	// NEWSBLOCK FUNCTIONS 
	if ($('.newsblock-categories li').length){

		$('.newsblock-categories li').click(function(e){
			$('.newsblock-categories li').removeClass('active');
			$(this).addClass('active');
		})

		const swiperNews = Array;
		$('.newsblock-categories li').each(function(i,elem){
				swiperNews[elem.dataset.category] = new Swiper('.swiper-news[data-category="'+elem.dataset.category+'"]', {
				slidesPerView: 6,
				spaceBetween: 10,
				slidesPerColumn: 1,
				// And if we need scrollbar
				scrollbar: {
					el: '.swiper-scrollbar',
					hide: false,
				},
				breakpoints: {
					320: {
						slidesPerView: 1.5,
					},
					450: {
						slidesPerView: 2.5,
					},
					576: {
						slidesPerView: 3,
					},
					768: {
						slidesPerView: 3.5,
					},
					992: {
					  slidesPerView: 4,
					},
					1300: {
					  slidesPerView: 6,
					}
				  },
			});
		})

		// Отображаем первый слайдер из категории при загрузке страницы
		var firstCat = $('.newsblock-categories li').eq(0).data('category');
		$('.swiper-news[data-category="'+firstCat+'"]').fadeIn(300);
		setTimeout(function () {
			swiperNews[firstCat].update();
		}, 400);

	
		//Отображаем нужный слайдер при смене категорий
		$('.newsblock-categories li').click(function(){
			var cat = $(this).data('category')
			$('.swiper-news').fadeOut(0);
			$('.swiper-news[data-category="'+cat+'"]').fadeIn(100);
			setTimeout(function () {
				swiperNews[cat].update();
			}, 100);
	
		})
	}

	// NEWSBLOCK FUNCTIONS  END



	// REVIEWS BLOCK
	var swiperReviews = new Swiper(".swiper-reviews", {
        effect: "coverflow",
        grabCursor: true,
        loop: true,
        // spaceBetween: 45,
        centeredSlides: true,
        // centeredSlidesBounds: true,
        slidesPerView: 5,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        },
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1.3,
				// spaceBetween: 10,
				// centeredSlides: true,
			},
			// when window width is >= 576px
			576: {
				slidesPerView: 3,
				modifier: 100,
				spaceBetween: 10,
			},
			// when window width is >= 1300px
			1300: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			// when window width is >= 1640px
			1640: {
				slidesPerView: 5,
				spaceBetween: 45,
			}
		},
        pagination: {
        //   el: ".swiper-pagination"
        }
      });
	
	// REVIEWS BLOCK END
	

	// SLIDER BRANDS

	var swiperBrands = new Swiper('.swiper-brands', {
		// Optional parameters
		direction: 'horizontal',

		slidesPerView: 'auto',
		slidesPerColumn: 2,
		spaceBetween: 20,
		freeMode: true,
		resizeReInit: true,
		observer: true,


		// autoplay: {
		// 	delay: 5000,
		// },

	  
	  
		// Navigation arrows
		navigation: {
		  nextEl: '.swiper-brands .swiper-button-next',
		  prevEl: '.swiper-brands .swiper-button-prev',
		},
	  
		// And if we need scrollbar
		scrollbar: {
		  el: '.swiper-scrollbar',
		  hide: false,
		//   dragSize: 55
		},

		breakpoints: {
			// when window width is >= 320px
			320: {
				spaceBetween: 6
			},
			// when window width is >= 768px
			768: {
				spaceBetween: 20,
			}
		}
	  });

	if ($('.swiper-brands').length){
		$(window).resize(function(){
			swiperBrands.destroy(false,true);
			swiperBrands.init();
			swiperBrands.updateSize();
			swiperBrands.updateSlides();
			swiperBrands.updateSlidesClasses();
			swiperBrands.slideTo(0);
			swiperBrands.scrollbar.updateSize()
		});
	}
	
	// $(window).trigger('resize')

	// SLIDER BRANDS END


	  
	//   ADVANTAGES FUNCTIONS


	$(".advantages-item__img").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
		$(this).removeClass("animated")  
	})
	
	$(".advantages-item").hover(function(){
		$(this).find('.advantages-item__img').addClass("animated");        
	})

	// ADVANTAGES FUNCTIONS END
	


	// ELEMENT FUNCTIONS

	// ФИКС ПЛАШКА СПРАВА
	if ($('.element-stickyinfo').length){
		$(window).scroll(function(){
			// stickyInfoCard();
		})

		$(window).resize(function(){
			// stickyInfoCard();
		})
	}

	function stickyInfoCard(){
		if ($(window).width() >= 768){
			var top = $('.element-topinfo').offset().top - 20
			var fromTop = $(window).scrollTop();
			if ($(window).width() > 991){
				var bot = $('.filterslider').offset().top
			}else{
				var bot = $('.tabs-list').offset().top
			}
			
			
			var width = $('.element-stickyinfo').innerWidth();
			var height = $('.element-stickyinfo').height();
			var delta = parseInt($('.tabs-content').css('margin-bottom'));
			
			if ((fromTop + delta + height) > bot){	
				$('.element-stickyinfo').css({
					'position':'fixed',
					'width':width,
					'top': bot - fromTop - height - delta,
				});
			}else if (fromTop <= top){
				$('.element-stickyinfo').css({
					'position':'relative',
					'width':'auto',
					'top': 'auto',
				});
			}else{
				$('.element-stickyinfo').css({
					'position':'fixed',
					'width':width,
					'top': 20,
				});
			}
		}else{
			$('.element-stickyinfo').css({
				'position':'static',
				'width':'auto',
				'top': 'auto',
			});
		}	
	}
	// ФИКС ПЛАШКА СПРАВА END


	// Слайдер с миниатюрами
	var swiperThumb = new Swiper(".element-gallery-thumb", {
        // loop: true,
        direction: "horizontal",
        spaceBetween: 10,
        slidesPerView: 4,
		breakpoints: {
			// when window width is >= 768px
			768: {
				direction: "vertical",
				slidesPerView: 4,
				navigation: {
					nextEl: '.element-gallery-thumb__wrapper .swiper-button-next',
					prevEl: '.element-gallery-thumb__wrapper .swiper-button-prev',
				},
			}
		}
      });
	// Слайдер с миниатюрами END
	
	// Слайдер с основной картинкой
	var swiperMain = new Swiper(".element-gallery-main", {
		// loop: true,
		thumbs: {
			swiper: swiperThumb
		}
	});
	// Слайдер с основной картинкой END


	// Если находимся в карточке товара - накинуть класс на футер
	if ($('.element-stickyinfo').length){
		$('.newfooter').addClass('element')
	}



	// ELEMENT FUNCTIONS END


	// SECTION FUNCTION

	//the product of a day function
	$('.catalog-elements-item-productday__timer,.product-day-slider-item-productday__timer,.element-productday__timer,.productday-sidebar-slider-item-productday__timer').countdown({compact: true, description: '',until: new Date(new Date().setHours(24,0,0,0))});

	// CATALOG SLIDER

	// Вырубаем автоплей если 1 слайд
	if($(".catalog-banners .catalog-banner").length == 1) {
		$('.catalog-banners .swiper-wrapper').addClass( "disabled" );
	}
	if($(".catalog-banners_mobile .catalog-banner").length == 1) {
		$('.catalog-banners_mobile .swiper-wrapper').addClass( "disabled" );
	}

	var catalogSlider = new Swiper('.catalog-banners', {
		loop: true,
		autoHeight: true,
		autoplay: {
			delay: 7000,
			disableOnInteraction: true,
		},
		pagination: {
			el: '.catalog-banners .swiper-pagination',
			clickable: true,
			dynamicBullets: true,
		},
		 
	});
	var catalogSlider = new Swiper('.catalog-banners_mobile', {
		loop: true,
		autoHeight: true,
		autoplay: {
			delay: 7000,
			disableOnInteraction: true,
		},
		pagination: {
			el: '.catalog-banners_mobile .swiper-pagination',
			clickable: true,
			dynamicBullets: true,
		},
		 
	});

	// CATALOG SLIDER END


	// SECTION FUNCTIONS END


	// TABS NAV
	$('.tabs-list__item').click(function(){
		var id = $(this).data('tab')
		$('.tabs-list__item, .tabs-content-item').removeClass('active')
		$(this).addClass('active')
		$('#'+id).addClass('active')
		if ($(window).width() < 768){
			$('html').animate({ 
				scrollTop: $('#'+id).offset().top - 90
			}, 500 
			);
		}
		// stickyInfoCard()
	});
	// TABS NAV END




	// CATALOG-FILTER
	$(".bx-filter-search").on("keyup", function() {
		var value = $(this).val().toLowerCase();
	
		$(this).closest('.bx-filter-block').find('.checkbox').each(function(index) {

				var row = $(this);
	
				var id = row.find('.bx-filter-param-text').text().toLowerCase();
	
				if (id.indexOf(value) !== 0) {
					row.hide();
				}
				else {
					row.show();
				}
			
		});
		$(this).closest('.bx-filter-block').css("height",'auto')
	});

	$("body").on('click','.dropdown-toggle',function(){
		$(this).toggleClass('open')
	});
	$(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".dropdown-toggle"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0) { // и не по его дочерним элементам
			div.removeClass('open'); // скрываем его
		}
	});

	$("body").on('click','.catalog-topfilter-show',function(){
		$('.bx-filter').addClass('visible')
		$('body').addClass('fixed');
	});

	$('.bx-filter__close').click(function(){
		$('.bx-filter').removeClass('visible')
		$('body').removeClass('fixed');
	});
	// CATALOG-FILTER END



	// ACCORDION
	$('.accordion__title').click(function(){
		$(this).closest('.accordion').toggleClass('open')
	})
	// ACCORDION END


	// QUESTIONS
	$('.questions-item, .contacts-travel-item').click(function(){
		$(this).siblings().removeClass('active')
		$(this).addClass('active')
		var id = $(this).data('id')
		$('.question-answers-item').removeClass('active')
		$('#'+id).addClass('active')
		
		if ($(window).width() < 768){
			if ($("#"+id).length){
				$('html, body').animate({
					scrollTop: $("#"+id).offset().top - 120
				}, 1000);
			}
			
		}
	})
	
	var firstLoadComplete = false;
	$('.questions-block-item').click(function(){
		$('.questions-block-item').removeClass('active')
		$(this).addClass('active')
		var content = $(this).data('content')
		$('.questions-block-content').css('display','none')
		$('.questions-block-content#'+content).css('display','block')
		if ($(window).width() < 768 && firstLoadComplete){
			if ($("#"+content).length){
				$('html, body').animate({
					scrollTop: $("#"+content).offset().top - 120
				}, 1000);
			}
			
		}
		firstLoadComplete = true;
	})

	// init first tab
	if ($('.questions-block-item ').length){
		$('.questions-block-item').eq(0).click();
	}



	// QUESTIONS END



	// PAYMENT
	$('.payment-select').change(function(){
		var id = $(this).find('option:selected').data('value');
		$('.payment-mobtable').fadeOut(0);
		$('#'+id).fadeIn(600);

	});
	// PAYMENT END



	// DELIVERY
		$('.delivery__question').click(function(){
			$(this).toggleClass('active')
			$('#' + $(this).data('id')).toggleClass('active')
		});
	// DELIVERY END


	// SUBSCRIPTION
		$('.subscription-item-body-list__title').click(function(){
			$(this).toggleClass('active')
		})

		$('.subscription-field__edit').click(function(){
			var input = $(this).siblings('.subscription-field__input').prop('readonly', false);
			input.focus();
		});

		$('.subscription-field__input').focusout(function(){
			$(this).prop('readonly', true);
		});
	// SUBSCRIPTION END



	// Сокращения текстов
	function shortTextInit(){

		var texts = $('.short-text');

		texts.each(function(i, elem){
			var height = (parseInt($(this).css('line-height'), 10) || 0) * 2
			var mb = (parseInt($(this).css('margin-bottom'), 10) || 0)

			$(this).css({
				'max-height':height,
				'margin-bottom':0
			});

			// $(this).wrap("<div class='short-text-wrapper'></div>")
			$(this).after('<button class="short-text__btn">Развернуть</button>')
			$(this).siblings('.short-text__btn').css('margin-bottom',mb)
		
		})
	}
	shortTextInit();

	$('.short-text__btn').click(function(){
		if ($(this).html() == 'Развернуть'){
			$(this).siblings('.short-text').css('max-height','')
			$(this).html('Свернуть')
		}else{
			$(this).html('Развернуть')
			$(this).siblings('.short-text').css('max-height',(parseInt($(this).css('line-height'), 10) || 0) * 2)
		}
	});


	




})


