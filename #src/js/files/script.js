window.addEventListener('resize', move);
let subLink = document.querySelectorAll('.menu__sub-link');

function move() {
	let catalog__content = document.querySelector(".catalog__content");
	let row = document.querySelector('.layout-row');
	let col = document.querySelector('.layout-col ');
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 1099.93) {
		for (let i = 0; i < subLink.length; i++) {
			subLink[i].classList.remove('menu__sub-link');
			subLink[i].classList.add('menu__link');
		}
	} else {
		for (let i = 0; i < subLink.length; i++) {
			subLink[i].classList.add('menu__sub-link');
			subLink[i].classList.remove('menu__link');
		}
	}
	if (viewport_width <= 1180) {
		if (catalog__content) {
			if (catalog__content.classList.contains('catalog__content_row')) {
				catalog__content.classList.remove('catalog__content_row');
				catalog__content.classList.add('catalog__content_col');
				row.classList.remove('_active');
				col.classList.add('_active');
			}
		}
	}
}

move();

//========================================================================================================================================================


//*автовысота для textarea


document.addEventListener("click", function (e) {
	const el = e.target;
	if (el.closest('textarea')) {
		el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
		el.classList.add('auto');
		el.addEventListener('input', e => {
			el.style.height = 'auto';
			el.style.height = (el.scrollHeight) + 10 + 'px';
		});
	}
});

//========================================================================================================================================================



if (window.matchMedia('(max-width: 1280px)').matches) {
	let tabsBlock = document.querySelectorAll('.catalog-modal__subcategory');
	let tabsItem = document.querySelectorAll('.catalog-modal__category');

	tabsBlock.forEach(element => {
		element.classList.remove('catalog-modal__subcategory_active');
	});
	tabsItem.forEach(element => {
		element.classList.remove('catalog-modal__category_active');
	});

};

//========================================================================================================================================================
//*табы для модалки каталога
let modalCatalog = document.querySelectorAll('.catalog-modal__body');
if (window.matchMedia('(min-width: 1281px)').matches) {
	for (let index = 0; index < modalCatalog.length; index++) {
		let cat = modalCatalog[index];
		let catalog_items = cat.querySelectorAll(".catalog-modal__category");
		let catalog_blocks = cat.querySelectorAll(".catalog-modal__subcategory");
		for (let index = 0; index < catalog_items.length; index++) {
			let catalog_item = catalog_items[index];
			catalog_item.addEventListener("mouseenter", function (e) {
				for (let index = 0; index < catalog_items.length; index++) {
					let catalog_item = catalog_items[index];
					catalog_item.classList.remove('catalog-modal__category_active');
					catalog_blocks[index].classList.remove('catalog-modal__subcategory_active');
				}
				catalog_item.classList.add('catalog-modal__category_active');
				catalog_blocks[index].classList.add('catalog-modal__subcategory_active');
				e.preventDefault();
			});
		}
	}
};

//========================================================================================================================================================
//*Плавающая линия для табов
const menu = document.querySelector(".float-line");
if (menu) {
	menu.addEventListener("mouseover", (event) => {
		if (event.target.classList.contains("float-line__item")) {
			menu.style.setProperty(
				"--underline-width",
				`${event.target.offsetWidth}px`
			);
			menu.style.setProperty(
				"--underline-offset-x",
				`${event.target.offsetLeft}px`
			);
		}
	});
	menu.addEventListener("mouseleave", () =>
		menu.style.setProperty("--underline-width", "0")
	);
}

//========================================================================================================================================================
//*переключатель layout в каталоге
let sort__layout_btns = document.querySelectorAll(".sort__layout-btn");


for (let index = 0; index < sort__layout_btns.length; index++) {
	let catalog__content = document.querySelector(".catalog__content");
	let row = document.querySelector('.layout-row');
	let col = document.querySelector('.layout-col ');
	let sort__layout_btn = sort__layout_btns[index];
	if (localStorage.getItem('catalog_layout') == 'row') {
		catalog__content.classList.add('catalog__content_row');
		catalog__content.classList.remove('catalog__content_col');
		row.classList.add('_active');
		col.classList.remove('_active');
	} else {
		catalog__content.classList.add('catalog__content_col');
		catalog__content.classList.remove('catalog__content_row');
		col.classList.add('_active');
		row.classList.remove('_active');
	}
	sort__layout_btn.addEventListener("click", function (e) {
		if (col.classList.contains('_active')) {
			catalog__content.classList.add('catalog__content_row');
			catalog__content.classList.remove('catalog__content_col');
			localStorage.setItem('catalog_layout', 'row')
		}
		if (row.classList.contains('_active')) {
			catalog__content.classList.remove('catalog__content_row');
			catalog__content.classList.add('catalog__content_col');
			localStorage.setItem('catalog_layout', 'col')
		}
		for (let index = 0; index < sort__layout_btns.length; index++) {
			let sort__layout_btn = sort__layout_btns[index];
			sort__layout_btn.classList.remove('_active');
		}
		sort__layout_btn.classList.add('_active');
	});
};


//========================================================================================================================================================

//========================================================================================================================================================
//*смена текста кнопки


if (document.querySelectorAll('.order__more-btn').length > 0) {
	let more_btn = document.querySelectorAll('.order__more-btn');
	for (let btn = 0; btn < more_btn.length; btn++) {
		const element = more_btn[btn];
		element.addEventListener("click", function (e) {
			if (!element.classList.contains('_active')) {
				element.innerHTML = 'Скрыть состав заказа';
				element.classList.add('btn-15_blck');
			} else {
				element.innerHTML = 'Показать состав заказа';
				element.classList.remove('btn-15_blck');
			}
		});
	}
};

//========================================================================================================================================================
//*смена цвета номера заказа по статусу
if (document.querySelectorAll('.order__status').length > 0) {
	let order_status = document.getElementsByClassName('order__status');
	for (let status = 0; status < order_status.length; status++) {
		const element = order_status[status];
		let color = getComputedStyle(element);
		color = color.backgroundColor;
		element.previousElementSibling.firstElementChild.style.color = color;
	};
};
//========================================================================================================================================================
//*progressBar для preloader
// function preloader() {
// 	document.querySelector('.preloader__wht').style.display = 'none';
// 	let images = document.images,
// 		images_total_count = images.length,
// 		images_loaded_count = 0,
// 		progress_bar = document.querySelector('.preloader__progress-bar'),
// 		preloader = document.querySelector('.preloader');
// 	preloader.style.display = 'flex'
// 	preloader.querySelector('.preloader__logo').style.display = 'flex';
// 	preloader.querySelector('.preloader__progress-bar').style.display = 'block';
// 	for (let i = 0; i < images_total_count; i++) {
// 		image_clone = new Image();
// 		image_clone.onload = image_loaded;
// 		image_clone.onerror = image_loaded;
// 		image_clone.src = images[i].src;

// 	}
// 	function image_loaded() {
// 		images_loaded_count++;
// 		progress_bar.style.width = (((100 / images_total_count) * images_loaded_count) << 0) + '%';

// 		if (images_loaded_count >= images_total_count) {
// 			setTimeout(() => {
// 				if (!preloader.classList.contains('done')) {
// 					preloader.classList.add('done');
// 					sessionStorage.setItem('loader', 'done');
// 				}
// 				if (document.querySelector('.wrapper')) {
// 					document.querySelector('.wrapper').classList.add('_loaded');
// 				}
// 			}, 500);
// 		}
// 	};
// };

function addLoadedClass() {
	if (!document.documentElement.classList.contains('loading')) {
		window.addEventListener("load", function () {
			setTimeout(function () {
				document.querySelector('.wrapper').classList.add('_loaded');
			}, 0);
		});
	}
}

addLoadedClass();

// if (!sessionStorage.getItem('loader')) {
// 	preloader()
// } else {
// 	document.querySelector('.wrapper').classList.add('_loaded');
// 	document.querySelector('.preloader').classList.add('done');
// }
//========================================================================================================================================================
//*zoom on scroll



(() => {
	window.addEventListener('scroll', function () {
		let scroll = document.documentElement.scrollTop;
		let zoom = document.querySelector('.about__image img');
		if (zoom) {
			zoom.style.transform = 'scale(' + (100 + scroll / 15) / 100 + ')';
		}

	});
})();
$(window).scroll(function () {
	var scroll = $(window).scrollTop();
	$(".about__image img").css({
		transform: 'scale(' + (100 + scroll / 5) / 100 + ')',
	});
});


$('._img-parallax').each(function () {
	var img = $(this);
	var imgParent = $(this).parent();
	function parallaxImg() {
		var speed = img.data('speed');
		var imgY = imgParent.offset().top;
		var winY = $(this).scrollTop();
		var winH = $(this).height();
		var parentH = imgParent.innerHeight();


		// The next pixel to show on screen      
		var winBottom = winY + winH;

		// If block is shown on screen
		if (winBottom > imgY && winY < imgY + parentH) {
			// Number of pixels shown after block appear
			var imgBottom = ((winBottom - imgY) * speed);
			// Max number of pixels until block disappear
			var imgTop = winH + parentH;
			// Porcentage between start showing until disappearing
			var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
		}
		img.css({
			top: imgPercent + '%',
			transform: 'translate(-50%, -' + imgPercent + '%)'
		});
	}
	$(document).on({
		scroll: function () {
			parallaxImg();
		}, ready: function () {
			parallaxImg();
		}
	});
});
//========================================================================================================================================================
//*очистка поля поиска

if (document.querySelector('.modal-search__search-input')) {
	const search__input = document.querySelector('.modal-search__search-input');
	const search__clear = document.querySelector('.modal-search__clear');
	search__clear.addEventListener("click", function (e) {
		search__input.value = "";
	});

}

$(document).ready(function () {
	$('select').niceSelect();
});


window.addEventListener('load', function () {
	const request = document.querySelector('.request');
	if (!request) {
		return;
	}
	const requestBlock = document.querySelectorAll('.bx-soa-customer-field');

	requestBlock.forEach(function (requestBlockItem) {
		const customerInput = requestBlockItem.querySelector('.form-control');

		if (customerInput.value !== '') {
			requestBlockItem.classList.add('active');
		}

		customerInput.addEventListener('focus', function () {
			requestBlockItem.classList.add('active');
		})
		customerInput.addEventListener('blur', function () {
			if (customerInput.value == '') {
				requestBlockItem.classList.remove('active');
			}
		})

	})
})




// global click events
const globalClickHandlers = {
	'js-open-modal': (node) => {
		if (node.dataset.closeAllModals !== undefined) {
			[...document.querySelectorAll(".modal.open")].map(n => closeModal(n))
		}
		openModal(document.querySelector(node.dataset.openModal))
	},
}
document.addEventListener("click", function (e) {
	var foundNodes = []
	var checkRecursive = (target) => {
		if (target === document || target == undefined) {
			return false
		}
		var cl = target.classList

		if (cl === undefined) {
			return false
		}
		var contains = false
		for (var c of Object.keys(globalClickHandlers)) {
			if (cl.contains(c)) {
				contains = true
				break
			}
		}
		if (contains) {
			foundNodes.push(target)
		}

		return checkRecursive(target.parentElement)
	}
	checkRecursive(e.target)

	var handlers = Object.entries(globalClickHandlers)
	foundNodes.map(node => {
		handlers.map(([className, callback]) => {
			if (node.classList.contains(className)) {
				callback(node)
			}
		})
	})
})


$(document).ready(() => {
	[...document.querySelectorAll('input')].filter(i => i.value.trim().length > 0)
		.map(i => i.classList.add('is-active'))
})

// just an end of a file


