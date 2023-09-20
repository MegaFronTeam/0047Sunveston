"use strict";

const $ = jQuery;


function eventHandler() {

	JSCCommon.init()


	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener('scroll', () => {
		JSCCommon.setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

	const catalogCardSwiper = new Swiper('.catalog-card__swiper--js', {
		slidesPerView: 'auto',
		init: false,
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			dynamicBullets: true,
			dynamicMainBullets: 4,
		},
		on: {
			slideChange: function () {
				if (catalogCardSwiper.activeIndex < 9) {
					catalogCardSwiper.el.childNodes[3].children[0].childNodes[0].innerText = `0${catalogCardSwiper.activeIndex + 1}`;
				} else {
					catalogCardSwiper.el.childNodes[3].children[0].childNodes[0].innerText =  catalogCardSwiper.activeIndex + 1;
				}
			},
			init: function() {
				if (catalogCardSwiper.slides.length < 9) {
					catalogCardSwiper.el.childNodes[3].children[0].childNodes[1].innerText = `/0${catalogCardSwiper.slides.length}`;
				} else {
					catalogCardSwiper.el.childNodes[3].children[0].childNodes[1].innerText = `/${catalogCardSwiper.slides.length}`;
				}
			},
		}
	});

	catalogCardSwiper.init();

	window.addEventListener('scroll', () => {
		if(window.scrollY > 220) {
			$('.scroll-to-top').addClass('show');
		} else {
			$('.scroll-to-top').removeClass('show');
		}
	}, { passive: true })
	$('.scroll-to-top').on('click', function() {
		window.scrollTo(0, 0);
	});
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }