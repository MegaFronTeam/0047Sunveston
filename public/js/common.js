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
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			dynamicBullets: true,
			dynamicMainBullets: 4,
		},
		on: {
			slideChange: function () {
				for (const item of catalogCardSwiper) {
					if (item.activeIndex < 9) {
						item.el.childNodes[3].children[0].childNodes[0].innerText = `0${item.activeIndex + 1}`;
					} else {
						item.el.childNodes[3].children[0].childNodes[0].innerText =  item.activeIndex + 1;
					}
				}
			},
		}
	});
	if (catalogCardSwiper.length > 0) {
		for (const item of catalogCardSwiper) {
			if (item.slides.length < 9) {
				item.el.childNodes[3].children[0].childNodes[1].innerText = `/0${item.slides.length}`;
			} else {
				item.el.childNodes[3].children[0].childNodes[1].innerText = `/${item.slides.length}`;
			}
		}
	}

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

	document.addEventListener('click', (event) => {
		let ddTarget = event.target.closest('.dd-head-header-js');
		let ddWrapTarget = event.target.closest('.dd-wrap-js');
		if (ddTarget) {
			let clickedHead = this;
			$(ddTarget).parent().toggleClass('active');
			$(ddTarget)
				.next()
				.slideToggle(function () {
				});
				$(ddTarget).toggleClass('active');
		}; 
		if (!ddWrapTarget) {
			$('.dd-head-header-js').parent().removeClass('active');
			$('.dd-head-header-js')
				.next()
				.slideUp(function () {
				});
				$('.dd-head-header-js').removeClass('active');
		};
	});

	document.addEventListener('click', (event) => {
		let popupBtnTarget = event.target.closest('.popup-btn-js');
		let popupTarget = event.target.closest('.popup-js');
		let popupCloseTarget = event.target.closest('.popup-js .close');
		let popups = document.querySelectorAll('.popup-js');
		if (popupBtnTarget) {
			popupTarget.classList.toggle('active');
			popupTarget.querySelector('.popup-btn-js').classList.toggle('active');
		} 
		if (!popupTarget) {
			for (const popup of popups) {
				popup.classList.remove('active');
				popup.querySelector('.popup-btn-js').classList.remove('active');
			}
		}
		if (popupCloseTarget) {
			let wrap = popupCloseTarget.closest('.popup-js');
			wrap.classList.remove('active');
			wrap.querySelector('.popup-btn-js').classList.remove('active');
		}
	})

	document.addEventListener('click', function(event) {
		let searchBlockTarget = event.target.closest('.search-block');
		if (searchBlockTarget) {
			let searchBlock = document.querySelector('.search-block');
			let searchBlockInput = document.querySelector('.search-block input');
			searchBlockInput.addEventListener('input', function() {
				if(searchBlockInput.value.length > 0) {
					searchBlock.querySelector('.search-block__delete').classList.add('active');
					searchBlock.querySelector('.search-block__result').classList.add('active');
				} else {
					searchBlock.querySelector('.search-block__delete').classList.remove('active');
					searchBlock.querySelector('.search-block__result').classList.remove('active');
				}
			});
			searchBlock.querySelector('.search-block__delete').addEventListener('click', function() {
				searchBlockInput.value = '';
				searchBlockInput.focus();
				searchBlock.querySelector('.search-block__delete').classList.remove('active');
				searchBlock.querySelector('.search-block__result').classList.remove('active');
			})
		}
	})
	
	document.addEventListener('click', function(event) {
		let toggleMapBtnTarget = event.target.closest('.top-nav__btn--map-js');
		if(toggleMapBtnTarget) {
			if (window.matchMedia('(max-width: 992px)').matches) {
				let toggleMapBtn = document.querySelector('.top-nav__btn--map-js');
				let mapBlock = document.querySelector('.sCatalog__map');
				toggleMapBtn.classList.toggle('active');
				mapBlock.classList.toggle('active');
				$('body').toggleClass('fixed-map');
			};
		}
	})
	window.addEventListener('resize', () => {
		if (window.matchMedia('(min-width: 992px)').matches ) {
			let toggleMapBtn = document.querySelector('.top-nav__btn--map-js');
			let mapBlock = document.querySelector('.sCatalog__map');
			if(toggleMapBtn && mapBlock) {
				toggleMapBtn.classList.remove('active');
				mapBlock.classList.remove('active');
			}
			$('body').removeClass('fixed-map');
		}
	}, { passive: true });

	const sProdCardThumbSwiper = new Swiper('.sProdCard__thumb-slider--thumb-js', {
		slidesPerView: 'auto',
		spaceBetween: 3,
		// direction: 'vertical',
		navigation: {
			nextEl: '.sProdCard__thumb-arrow-wrap .swiper-button-next',
			prevEl: '.sProdCard__thumb-arrow-wrap .swiper-button-prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 6,
				direction: 'vertical',
			},
			1200: {
				slidesPerView: 4,
				direction: 'vertical',
			}
		},
	});
	const sProdCardSwiper2 = new Swiper('.sProdCard__slider--js', {
		slidesPerView: 1,
		navigation: {
			nextEl: '.sProdCard__swiper-wrap .sProdCard__main-slider-arrow-wrap .swiper-button-next',
			prevEl: '.sProdCard__swiper-wrap .sProdCard__main-slider-arrow-wrap .swiper-button-prev',
		},
		thumbs: {
			swiper: sProdCardThumbSwiper,
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			dynamicBullets: true,
			dynamicMainBullets: 4,
		},
		on: {
			slideChange: function () {
				if (sProdCardSwiper2.activeIndex < 9) {
					sProdCardSwiper2.el.childNodes[3].children[0].childNodes[0].innerText = `0${sProdCardSwiper2.activeIndex + 1}`;
				} else {
					sProdCardSwiper2.el.childNodes[3].children[0].childNodes[0].innerText =  sProdCardSwiper2.activeIndex + 1;
				}
				// for (const item of sProdCardSwiper2) {
				// }
			},
		}
	});	
	if (sProdCardSwiper2) {
		if (sProdCardSwiper2.slides.length < 9) {
			sProdCardSwiper2.el.childNodes[3].children[0].childNodes[1].innerText = `/0${sProdCardSwiper2.slides.length}`;
		} else {
			sProdCardSwiper2.el.childNodes[3].children[0].childNodes[1].innerText = `/${sProdCardSwiper2.slides.length}`;
		}
		// for (const item of sProdCardSwiper2) {
		// 	if (item.slides.length < 9) {
		// 		sProdCardSwiper2.el.childNodes[3].children[0].childNodes[1].innerText = `/0${sProdCardSwiper2.slides.length}`;
		// 	} else {
		// 		sProdCardSwiper2.el.childNodes[3].children[0].childNodes[1].innerText = `/${sProdCardSwiper2.slides.length}`;
		// 	}
		// }
	}

	$('.side-panel').hcSticky({
    stickTo: $('.sProdCard__col'),
		top: 97+24,
		mobileFirst: true,
		disable: true,
		responsive: {
			998: {
				disable: false,
			}
		}
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