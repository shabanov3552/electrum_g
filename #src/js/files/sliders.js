//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			lightGallery(slider, {
				counter: false,
				selector: 'a',
				download: false
			});
		}
	}
}


let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}


if (document.querySelector('.advantages__slider')) {
	new Swiper('.advantages__slider', {
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		speed: 800,
		thumbs: {
			swiper: {
				el: '.advantages__row',
				slidesPerView: 6,
				simulateTouch: true,
				loop: true,
				breakpoints: {
					320: {
						slidesPerView: 2,
						//spaceBetween: 20,
					},
					940: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1280: {
						slidesPerView: 4,
					},
					1440: {
						slidesPerView: 5,
						loop: true,
					},
					1920: {
						loop: false,
						slidesPerView: 6,
					},
				},
			}
		},
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		simulateTouch: false,
		loop: true,
		parallax: true,
	});
}

if (document.querySelector('.partners__slider')) {
	new Swiper('.partners__slider', {
		autoplay: {
			delay: 1000,
			disableOnInteraction: false,
		},
		centeredSlides: true,
		slidesPerGroup: 1,
		observer: true,
		observeParents: true,
		slidesPerView: 3,
		speed: 1000,
		observeSlideChildren: true,
		initialSlide: 3,
		loop: true,
		breakpoints: {
			320: {
				spaceBetween: 20,
				slidesPerView: 1,
			},
			1200: {
				spaceBetween: 100,
				slidesPerView: 3,
			},
		},
	});
}

if (document.querySelector('.slider-product__big')) {
	new Swiper('.slider-product__big', {
		navigation: {
			nextEl: '.slider-product__next',
			prevEl: '.slider-product__prev'
		},
		loop: true,
		thumbs: {
			swiper: {
				el: '.slider-product__nav',
				slidesPerView: 3.3,
				loop: true,
				breakpoints: {
					767.98: {
						direction: "vertical",
					},
				},
			},
		},
	});
}

if (document.querySelector('.compare__row')) {
	new Swiper('.compare__row', {
		speed: 800,
		observer: true,
		observeParents: true,
		scrollbar: {
			el: ".swiper-scrollbar",
			draggable: true,
		},
		grabCursor: true,
		breakpoints: {
			320: {
				slidesPerView: 2,
			},
			1280: {
				slidesPerView: 2,
			},
			1540: {
				slidesPerView: 3,
			},
		}
	});
}

if (document.querySelector('.certificates__slider')) {
	new Swiper('.certificates__slider', {
		observer: true,
		observeParents: true,
		loop: true,
		autoHeight: true,
		breakpoints: {
			320: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			1366: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},
		pagination: {
			el: '.certificates__fraction',
			clickable: true,
			type: 'fraction'
		},
		// Arrows
		navigation: {
			nextEl: '.certificates__next',
			prevEl: '.certificates__prev'
		},
	});
}