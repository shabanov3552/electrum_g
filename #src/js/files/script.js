window.addEventListener('resize', move);
let subLink = document.querySelectorAll('.menu__sub-link');

function move() {
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

}

move();
//========================================================================================================================================================
const catalogMobileMQ = window.matchMedia("(max-width: 1180px)");

function catalogLayoutChange(e) {
	let catalog__content = document.querySelector(".catalog__content");
	let row = document.querySelector('.layout-row');
	let col = document.querySelector('.layout-col ');
	if (e.matches) {
		setTimeout(() => {
			if (catalog__content) {
				catalog__content.classList.remove('catalog__content_row');
				catalog__content.classList.add('catalog__content_col');
				row.classList.remove('_active');
				col.classList.add('_active');
			}
		}, 100);
	}
};
// Register event listener
catalogMobileMQ.addListener(catalogLayoutChange);
// Initial check
catalogLayoutChange(catalogMobileMQ);


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


//========================================================================================================================================================
//*стиль хедера для главной

function styleForIndex() {
	let header = document.querySelector('.header');
	let mainScreen = document.querySelector('.main-screen');
	if (mainScreen) {
		header.classList.add('main-page');
	}
}
styleForIndex();

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
	if (catalog__content === null) {
		continue;
	}
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

//========================================================================================================================================================
// *zoom on scroll



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
	parallaxImg();
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


const shopListAction = (method, params) => {
	return async () => {
		let body = new FormData()
		body.append('sessid', window.BX.bitrix_sessid())
		if (undefined !== params) {
			(Object.entries(params)).map(([k, v]) => body.append(k, v))
		}

		let getParams = `?action=mkmatrix:main.shopList.${method}`

		let res = await fetch(
			"/bitrix/services/main/ajax.php" + getParams,
			{
				method: "POST",
				body
			}
		).then(r => r.json())

		if (res.status === "error") {
			console.error(res)
		}

		return res
	}
}

const fixShopListButtons = () => {
	if (undefined === window.shopList) {
		return
	}

	var itemNodes = [...document.querySelectorAll('.js-addToShopList')]

	if (!itemNodes.length) {
		return
	}

	var findNodes = (item) => itemNodes.filter(n => n.dataset.id == item.UF_ITEM)

	window.shopList.map(item => {
		var nodes = findNodes(item)
		if (!nodes.length) {
			return
		}

		nodes.map(node => node.innerText = "Добавлено " + item.UF_AMOUNT)
	})
}

const loadShopList = async () => {
	var action = shopListAction('getJsList')

	var badge = document.querySelector('.btn-shop-list .icon-count')

	var res = await action();

	if (res.status === "error") {
		return
	}

	var count = res.data.length || 0

	if (count > 0) {
		badge.style.display = ''
		badge.innerText = count
	} else {
		badge.style.display = 'none'
	}

	window.shopList = res.data
	fixShopListButtons()
}

// global click events
const globalClickHandlers = {
	'js-open-modal': (node) => {
		if (node.dataset.closeAllModals !== undefined) {
			[...document.querySelectorAll(".modal.open")].map(n => closeModal(n))
		}
		// openModal(document.querySelector(node.dataset.openModal))
		openModal(node.dataset.openModal)
	},

	// список покупок
	'js-addToShopList': async (node) => {
		if (node.innerText.startsWith('Добавлено')) {
			window.location = "/catalog/shop-list/"
			return;
		}

		var action = shopListAction('add', { itemId: parseInt(node.dataset.id) })

		res = await action();

		if (res.status !== "error") {
			node.innerText = "Добавлено"
		}
		loadShopList()
	},
	'js-shopListClear': async (node) => {
		var action = shopListAction('clearUser')

		res = await action();

		if (res.status !== "error") {
			window.location.reload()
		}
	},
	'js-shopListDeleteItem': async (node) => {
		var action = shopListAction('removeFromList', { itemId: parseInt(node.dataset.id) })

		res = await action();

		if (res.status !== "error") {
			window.location.reload()
		}
	},
	'js-shopListAmountDown': async (node) => {
		var input = node.closest('.js-amountContainer').querySelector('.js-shopListAmount')
		var totalNode = node.closest('.js-amountContainer').querySelector('.js-total')
		var action = shopListAction(
			'changeQuantity',
			{
				itemId: parseInt(input.dataset.id),
				amount: parseFloat(input.value)
			}
		)

		res = await action();

		if (res.status !== "error") {
			if (res.data > 0) {
				input.value = res.data
				totalNode.innerText = parseFloat(res.data) * input.dataset.price
			} else {
				window.location.reload()
			}
		}
	},
	'js-shopListAmountUp': async (node) => {
		var input = node.closest('.js-amountContainer').querySelector('.js-shopListAmount')
		var totalNode = node.closest('.js-amountContainer').querySelector('.js-total')
		var action = shopListAction(
			'changeQuantity',
			{
				itemId: parseInt(input.dataset.id),
				amount: parseFloat(input.value)
			}
		)

		res = await action();

		if (res.status !== "error") {
			if (res.data > 0) {
				input.value = res.data
				totalNode.innerText = parseFloat(res.data) * input.dataset.price
			} else {
				window.location.reload()
			}
		}
	},
	'js-addItem2Basket': async (node) => {
		var itemNode = node.closest('.js-item')
		if (!!itemNode.inBasket) {
			popup_open("basket");
			$(".scroll").getNiceScroll().show().resize();
			return;
		}
		var itemId = itemNode.dataset.id
		var amount = parseFloat(itemNode.querySelector('.js-shopListAmount').value)

		var data = {
			'ajax_basket': 'Y',
			'quantity': amount,
			'prop[0]': 0,
		}

		$.post({
			'url': window.location.pathname + `?action=ADD2BASKET&id=${itemId}`,
			data,
			'success': () => BX.onCustomEvent('OnBasketChange')
		})
	},
	'js-addItem2Compare': async (node) => {
		if (node.innerText === "Ошибка") {
			return
		}

		var itemNode = node.closest('.js-item')
		var itemId = parseInt(itemNode.dataset.id)

		var data = {}

		var checkbox = node.querySelector('[data-entity="compare-checkbox"]'),
			checked = true;

		if (checkbox) {
			checked = !checkbox.checked;
		}

		var action = checked ? "ADD_TO_COMPARE_LIST" : "DELETE_FROM_COMPARE_LIST"

		var response = await $.post({
			'url': `/catalog/compare/?action=${action}&id=${itemId}&ajax_action=Y`,
			data,
		})

		// checked = response.STATUS === "OK" ? checked : !checked;


		if (response.STATUS === "ERROR") {
			if (response.MESSAGE === "Товар не найден") {
				if (node !== null) {
					node.innerText = "Ошибка";
					node.classList.add('active')
					node.classList.remove('js-compare')
					return
				}
			}
		}

		BX.onCustomEvent('OnCompareChange')
		var compare = JSON.parse(localStorage.getItem('compareItems')) || [];
		if (checked) {
			compare.push(itemId)
			localStorage.setItem('compareItems', JSON.stringify(compare))
			node.classList.add('active')
		} else {
			compare = compare.filter(id => id != itemId)
			localStorage.setItem('compareItems', JSON.stringify(compare))
			node.classList.remove('active')
		}

		compareCount()
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

function closeModal(...args) {
	popup_close(...args)
}

function openModal(...args) {
	popup_open(...args)
}


function printBasket() {
	var basket = document.querySelector('.modal-basket')
	var mywindow = window.open('', 'PRINT');

	mywindow.document.write(
		`<html>
				<head>
					${document.head.innerHTML}
					<link href="/local/templates/main/css/style.css" type="text/css"  rel="stylesheet" />
				</head>
				<body>
					${basket.outerHTML}
				</body>
				<script>
					// document.addEventListener('DOMContentLoaded', () => {
						print()
						document.close()
						close()
					// })
				</script>
			</html>`
	)
	var innerModal = mywindow.document.querySelector('.modal-basket');
	if (innerModal) {

		innerModal.classList.add('_active')
		innerModal.querySelector('.modal-basket__print')?.remove()
		innerModal.querySelector('.modal-basket__order')?.remove()
		mywindow.document.title = "Электрум, моя корзина"
		mywindow.focus(); // necessary for IE >= 10*/
	}

	return true;
}

document.addEventListener("click", function (e) {
	if (e.target.closest('.js-sidebar-catalog-close') || !e.target.closest('.sidebar-catalog, .js-open-sidebar-catalog, .header__icon') && document.querySelector('.sidebar-catalog-open')) {
		closeCatalog()
	}
	// открыть модалку каталога
	if (bodyLockStatus && e.target.closest('.js-open-sidebar-catalog')) {
		e.preventDefault()
		document.querySelector('.sidebar-catalog-open') ? closeCatalog() : openCatalog()
	}
});

function openCatalog() {
	bodyLock();
	document.documentElement.classList.add("sidebar-catalog-open");
	if (window.matchMedia("(min-width: 991.98px)").matches && !isMobile.any()) {
		document.addEventListener("mouseover", sidebarCatalogActions);
		document.removeEventListener("click", sidebarCatalogActions);
	} else {
		document.addEventListener("click", sidebarCatalogActions);
		document.removeEventListener("mouseover", sidebarCatalogActions);
	}
}

function closeCatalog() {
	bodyUnlock();
	document.documentElement.classList.remove("sidebar-catalog-open", "sidebar-sub-catalog-open");
}
//#region Вспомогательные модули блокировки прокрутки и скочка ============================
let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
//#endregion

//#region Открыть/закрыть боковой каталог + Открытие закрытие подкатегорий в каталоге

function sidebarCatalogActions(e) {
	if (e.target.closest('[data-parent]')) {
		const targetElement = e.target.closest('[data-parent]');
		const subMenuId = targetElement.closest('[data-parent]').dataset.parent ? targetElement.closest('[data-parent]').dataset.parent : null;
		const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
		if (subMenu) {
			const activeLink = document.querySelector('._sub-menu-active');
			const activeBlock = document.querySelector('._sub-menu-open');


			if (activeLink && activeLink !== targetElement) {
				activeLink.classList.remove('_sub-menu-active');
				activeBlock.classList.remove('_sub-menu-open');
				document.documentElement.classList.remove('sidebar-sub-catalog-open');
			}
			document.documentElement.classList.add('sidebar-sub-catalog-open');
			targetElement.classList.add('_sub-menu-active');
			subMenu.classList.add('_sub-menu-open');
			e.preventDefault();
		} else {
			const activeLink = document.querySelector('._sub-menu-active');
			const activeBlock = document.querySelector('._sub-menu-open');


			if (activeLink) {
				activeLink.classList.remove('_sub-menu-active');
				activeBlock.classList.remove('_sub-menu-open');
				document.documentElement.classList.remove('sidebar-sub-catalog-open');
			}
		}
	}
	if (e.target.closest('.js-sidebar-catalog-back')) {
		document.documentElement.classList.remove('sidebar-sub-catalog-open');
		document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
		document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;
		e.preventDefault();
	}
}

//#endregion

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.popup').forEach(popup => {
		if (!popup.closest('.header')) {
			document.querySelector('.header').append(popup);
		}
	})
})