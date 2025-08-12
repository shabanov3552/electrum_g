function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
	document.addEventListener("click", function (e) {
		let target = e.target
		if (!target.closest('.menu__link_dropdown')) return;
		target.classList.toggle('_active');
	});
} else {
	document.querySelector('html').classList.add('_pc');
}



let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//=================

window.addEventListener("load", (event) => {
	const phoneLinkElements = document.querySelectorAll('#phone-link');

	if (phoneLinkElements.length > 0) {
		phoneLinkElements.forEach(phoneLink => {
			const smallElements = phoneLink.querySelectorAll('small');

			if (smallElements.length > 0) {
				smallElements.forEach(small => {
					while (small.firstChild) {
						// Перемещаем текстовое содержимое из <small> в родителя
						small.parentNode.insertBefore(small.firstChild, small);
					}
					// Удаляем элемент <small>
					small.remove();
				});
			} else {
				console.log("Элементы <small> не найдены.");
			}
		});
	}
});

//Menu
const menuMobileMQ = window.matchMedia("(min-width: 768px)");

function someFunctionMQ(e) {
	let iconMenu = document.querySelector(".header__icon");
	let menuClose = document.querySelector(".menu__close");
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	let headerLogo = document.querySelector(".header__logo");
	iconMenu.addEventListener("click", function (el) {
		document.documentElement.classList.add('menu-open');
		if (e.matches) {
			if (unlock) {
				body_lock(delay);
				menuBody.classList.add("_active");
				headerLogo.classList.add("_active");
			}
		} else {
			if (unlock) {
				menuBody.classList.add("_active");
				headerLogo.classList.add("_active");
				// openCatalog()
				body_lock(delay);

			}
		}
	});
	menuClose.addEventListener("click", function (e) {
		document.documentElement.classList.remove('menu-open');
		document.querySelector('.header').classList.remove('open');
		popup_close();
		body_lock(delay);
		menuBody.classList.remove("_active");
		headerLogo.classList.remove("_active");
	});
}
// Register event listener
menuMobileMQ.addListener(someFunctionMQ);
// Initial check
someFunctionMQ(menuMobileMQ);
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================
//=================
//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}
//=================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например:
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/

// SPOLLERS
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// Получение обычных слойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// Инициализация обычных слойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// Получение слойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// Инициализация слойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	// Работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active') && spollerTitle.nextElementSibling) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					if (spollerTitle.nextElementSibling) {
						spollerTitle.nextElementSibling.hidden = false;
					}
				}
			});
		}
	}
	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}
//=================


//=================
//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	let input_focus = curent_popup?.querySelector('.input');
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}

		let menu = document.querySelector('.header');
		curent_popup.classList.add('_active');
		menu.classList.add('open');
		history.pushState('', '', '#' + item);
		if (input_focus) {
			setTimeout(() => {
				input_focus.focus();
			}, 550);
		}
		document.documentElement.classList.add('popup-open');
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			let menu = document.querySelector('.header');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
			menu.classList.remove('open');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		document.documentElement.classList.remove('popup-open');
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});

//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
//========================================
//Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
//========================================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}

//#region Gallery
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
	gallery_init();
}
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		if (el.matches('._swiper')) continue
		lightGallery(el, {
			counter: false,
			selector: 'a',
			download: false
		});
	}
}
//#endregion

function showMore(targetBlocks) {
	//#region Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
	let _slideUp = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = `${target.offsetHeight}px`;
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = !showmore ? true : false;
				!showmore ? target.style.removeProperty('height') : null;
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				!showmore ? target.style.removeProperty('overflow') : null;
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				// Создаем событие 
				document.dispatchEvent(new CustomEvent("slideUpDone", {
					detail: {
						target: target
					}
				}));
			}, duration);
		}
	}
	let _slideDown = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.hidden = target.hidden ? false : null;
			showmore ? target.style.removeProperty('height') : null;
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				// Создаем событие 
				document.dispatchEvent(new CustomEvent("slideDownDone", {
					detail: {
						target: target
					}
				}));
			}, duration);
		}
	}
	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
	//#endregion
	let showMoreBlocks;
	let showMoreBlocksRegular;
	let mdQueriesArray;
	if (targetBlocks) {
		targetBlocks.forEach(targetBlock => {
			initItem(targetBlock);
		});
	} else {
		window.addEventListener('load', (e) => {
			showMoreBlocks = document.querySelectorAll('[data-showmore]');
			if (showMoreBlocks.length) {
				// Получение обычных объектов
				showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
					return !item.dataset.showmoreMedia;
				});
				// Инициализация обычных объектов
				showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

				document.addEventListener("click", showMoreActions);
				window.addEventListener("resize", showMoreActions);

				// Получение объектов с медиа запросами
				mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
				if (mdQueriesArray && mdQueriesArray.length) {
					mdQueriesArray.forEach(mdQueriesItem => {
						// Событие
						mdQueriesItem.matchMedia.addEventListener("change", function () {
							initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
						});
					});
					initItemsMedia(mdQueriesArray);
				}
			}
		});
	}

	function initItemsMedia(mdQueriesArray) {
		mdQueriesArray.forEach(mdQueriesItem => {
			initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
		});
	}

	function initItems(showMoreBlocks, matchMedia) {
		showMoreBlocks.forEach(showMoreBlock => {
			initItem(showMoreBlock, matchMedia);
		});
	}

	function initItem(showMoreBlock, matchMedia = false) {
		showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
		showMoreBlock.classList.add('_show-more-init')
		let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]');
		let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]');
		showMoreContent = Array.from(showMoreContent).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
		showMoreButton = Array.from(showMoreButton).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
		const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
		if (!showMoreContent.closest('._showmore-active')) {
			if (matchMedia.matches || !matchMedia) {
				if (hiddenHeight < getOriginalHeight(showMoreContent)) {
					_slideUp(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = false;
				} else {
					_slideDown(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = true;
				}
			} else {
				_slideDown(showMoreContent, 0, hiddenHeight);
				showMoreButton.hidden = true;
			}
		} else if (showMoreContent.closest('._showmore-active') && !(matchMedia.matches || !matchMedia)) {
			showMoreButton.hidden = true;
		} else if (showMoreContent.closest('._showmore-active') && (matchMedia.matches || !matchMedia)) {
			showMoreButton.hidden = false;
		}
	}

	function getHeight(showMoreBlock, showMoreContent) {
		let hiddenHeight = 0;
		const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
		if (showMoreType === 'items') {
			const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
			const showMoreItems = showMoreContent.children;
			if (showMoreContent.children.length <= showMoreTypeValue) {
				return
			}
			for (let index = 1; index < showMoreItems.length; index++) {
				const showMoreItem = showMoreItems[index - 1];
				hiddenHeight += showMoreItem.offsetHeight;
				if (index == showMoreTypeValue) break
			}
		} else if (showMoreType === 'parag') {
			const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 2;
			const showMoreItems = showMoreContent.children;
			if (showMoreContent.children.length <= showMoreTypeValue) {
				return
			}
			for (let index = 1; index < showMoreItems.length; index++) {
				const showMoreItem = showMoreItems[index - 1];
				hiddenHeight += showMoreItem.offsetHeight;
				if (index == showMoreTypeValue) break
			}
		} else {
			const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
			hiddenHeight = showMoreTypeValue;
		}
		return hiddenHeight;
	}

	function getOriginalHeight(showMoreContent) {
		let parentHidden;
		let hiddenHeight = showMoreContent.offsetHeight;
		showMoreContent.style.removeProperty('height');
		if (showMoreContent.closest(`[hidden]`)) {
			parentHidden = showMoreContent.closest(`[hidden]`);
			parentHidden.hidden = false;
		}
		let originalHeight = showMoreContent.offsetHeight;
		parentHidden ? parentHidden.hidden = true : null;
		showMoreContent.style.height = `${hiddenHeight}px`;
		return originalHeight;
	}

	function showMoreActions(e) {
		const targetEvent = e.target;
		const targetType = e.type;
		if (targetType === 'click') {
			if (targetEvent.closest('[data-showmore-button]')) {
				const showMoreButton = targetEvent.closest('[data-showmore-button]');
				const showMoreBlock = showMoreButton.closest('[data-showmore]');
				const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
				const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500';
				const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
				if (!showMoreContent.classList.contains('_slide')) {
					showMoreBlock.classList.contains('_showmore-active') ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
					showMoreBlock.classList.toggle('_showmore-active');
				}
			}
		} else if (targetType === 'resize') {
			showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
			mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
		}
	}

}
//#region Обработа медиа запросов из атрибутов 
function dataMediaQueries(array, dataSetValue) {
	// Получение объектов с медиа запросами
	const media = Array.from(array).filter(function (item, index, self) {
		if (item.dataset[dataSetValue]) {
			return item.dataset[dataSetValue].split(",")[0];
		}
	});
	// Инициализация объектов с медиа запросами
	if (media.length) {
		const breakpointsArray = [];
		media.forEach(item => {
			const params = item.dataset[dataSetValue];
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		// Получаем уникальные брейкпоинты
		let mdQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mdQueries = uniqArray(mdQueries);
		const mdQueriesArray = [];

		if (mdQueries.length) {
			// Работаем с каждым брейкпоинтом
			mdQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// Объекты с нужными условиями
				const itemsArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				mdQueriesArray.push({
					itemsArray,
					matchMedia
				})
			});
			return mdQueriesArray;
		}
	}
}
//#endregion

showMore();
//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}
async function form_submit(e) {
	let btn = e.target;
	let form = btn.closest('form');
	let error = form_validate(form);
	if (error == 0) {
		let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
		let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
		const message = form.getAttribute('data-message');
		const ajax = form.getAttribute('data-ajax');
		const test = form.getAttribute('data-test');

		//SendForm
		if (ajax) {
			e.preventDefault();
			let formData = new FormData(form);
			form.classList.add('_sending');
			let response = await fetch(formAction, {
				method: formMethod,
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				form.classList.remove('_sending');
				if (message) {
					popup_open(message + '-message');
				}
				form_clean(form);
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		}
		// If test
		if (test) {
			e.preventDefault();
			popup_open(message + '-message');
			form_clean(form);
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}
		e.preventDefault();
	}
}
function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}
function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.addEventListener("input", function (e) {
		if (input.value.length > 3) {
			input.classList.remove('_error');
			input.parentElement.classList.remove('_error');
			let input_error = input.parentElement.querySelector('.form__error');
			if (input_error) {
				input.parentElement.removeChild(input_error);
			}
		}
	});
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

let viewPass = document.querySelectorAll('.form__viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classList.toggle('_active');
	});
}


//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				if (input.getAttribute('data-type') === "pass" && !input.parentElement.querySelector('.form__viewpass').classList.contains('_active')) {
					input.setAttribute('type', 'password');
				}
				if (input.classList.contains('_date')) {
					/*
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
					*/
				}
				if (input.classList.contains('_phone')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask("+7(x99) 999 9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						definitions: {
							x: {
								validator: '[0-79-9]'
							}
						},
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			if (input.classList.contains('_date')) {
				const calendarItem = datepicker(input, {
					customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					overlayButton: 'Применить',
					overlayPlaceholder: 'Год (4 цифры)',
					startDay: 1,
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
				const dataFrom = input.getAttribute('data-from');
				const dataTo = input.getAttribute('data-to');
				if (dataFrom) {
					calendarItem.setMin(new Date(dataFrom));
				}
				if (dataTo) {
					calendarItem.setMax(new Date(dataTo));
				}
			}
		}
	}
}
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}

//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}

document.addEventListener("click", function (e) {
	if (e.target.closest('.input-clear')) {
		let input = e.target.closest('.input-clear').parentElement.querySelector('input')
		input.value = '';
	}
});
let scr_body = document.querySelector('body');
let scr_items = document.querySelectorAll('._scr-item');
let scrolling = true;
let scrollDirection = 0;
let currentScroll;

//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll);
function scroll_scroll() {
	let src_value = currentScroll = pageYOffset;
	let header = document.querySelector('header.header');
	let mainScreen = document.querySelector('.main-screen');
	if (header !== null) {
		if (src_value > 100) {
			header.classList.add('_scroll');
		} else {
			header.classList.remove('_scroll');
		}
	}

	if (mainScreen && window.innerWidth > 767.98) {
		let menu_right = document.querySelectorAll('.menu-right__btn');
		if (src_value < window.innerHeight - 150) {
			for (let index = 0; index < menu_right.length; index++) {
				menu_right[index].classList.add('menu-right__btn_white');
			}
		} else {
			for (let index = 0; index < menu_right.length; index++) {
				menu_right[index].classList.remove('menu-right__btn_white');
			}
		}
	}

	if (scr_items.length > 0) {
		for (let index = 0; index < scr_items.length; index++) {
			let scr_item = scr_items[index];
			let scr_item_offset = offset(scr_item).top;
			let scr_item_height = scr_item.offsetHeight;
			let scr_item_point = window.innerHeight - (window.innerHeight - scr_item_height / 3);
			if (window.innerHeight > scr_item_height) {
				scr_item_point = window.innerHeight - scr_item_height / 3;
			}
			if ((src_value > scr_item_offset - scr_item_point) && src_value < (scr_item_offset + scr_item_height)) {
				scr_item.classList.add('_active');
			} else {
				scr_item.classList.remove('_active');
			}
		}
	}
	if (src_value > scrollDirection) {
		// downscroll code
	} else {
		// upscroll code
	}
	scrollDirection = src_value <= 0 ? 0 : src_value;
}
setTimeout(function () {
	//document.addEventListener("DOMContentLoaded", scroll_scroll);
	scroll_scroll();
}, 100);

//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('._goto');
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		let goto_link = goto_links[index];
		goto_link.addEventListener('click', function (e) {
			let target_block_class = goto_link.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		});
	}
}
function _goto(target_block, speed, offset = 0) {
	let header = '';
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: 1000,
		header: header,
		offset: offset,
		easing: 'easeInOutCubic',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
}

//SameFunctions
function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle




function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("min");
da.init();
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
		// loop: true,
		thumbs: {
			swiper: {
				el: '.slider-product__nav',
				slidesPerView: 3.3,
				spaceBetween: 10,
				// loop: true,
				breakpoints: {
					767.98: {
						direction: "vertical",
					},
				},
			},
		},
	});
}

// if (document.querySelector('.compare__row')) {
// 	new Swiper('.compare__row', {
// 		speed: 800,
// 		observer: true,
// 		observeParents: true,
// 		scrollbar: {
// 			el: ".swiper-scrollbar",
// 			draggable: true,
// 		},
// 		grabCursor: true,
// 		breakpoints: {
// 			320: {
// 				slidesPerView: 2,
// 			},
// 			1280: {
// 				slidesPerView: 2,
// 			},
// 			1540: {
// 				slidesPerView: 3,
// 			},
// 		}
// 	});
// }

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

if (document.querySelector('.b2b-features__slider')) {

	const sliders = document.querySelectorAll('.b2b-features__slider');
	for (let i = 0; i < sliders.length; i++) {
		const slider = sliders[i];
		const className = `b2b-features__slider_${i + 1}`;
		const slides = slider.querySelectorAll('.b2b-features__slide');
		slider.classList.add(className);
		if (slides.length > 1) {
			slider.insertAdjacentHTML('afterend', `
				<div class="b2b-features__slider-nav">
					<button type="button" class="swiper-button swiper-button_prev">
						<svg width="14" height="38" viewBox="0 0 14 38" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0.702148 18.4072L0.536133 18.5029L0.591797 18.5986L0.536133 18.6943L0.702148 18.7891L11.3291 37.1982L14 35.6562L4.15332 18.5986L14 1.54199L11.3291 0L0.702148 18.4072Z" fill="white" />
						</svg>
					</button>
					<button type="button" class="swiper-button swiper-button_next">
						<svg width="14" height="38" viewBox="0 0 14 38" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M13.2979 18.4072L13.4639 18.5029L13.4082 18.5986L13.4639 18.6943L13.2979 18.7891L2.6709 37.1982L0 35.6562L9.84668 18.5986L0 1.54199L2.6709 0L13.2979 18.4072Z" fill="white" />
						</svg>
					</button>
				</div>
			`)

			// Создаем слайдер
			new Swiper(`.${className}`, { // Указываем скласс нужного слайдера
				slidesPerView: 'auto',
				spaceBetween: 0,
				speed: 300,

				// Кнопки "влево/вправо"
				navigation: {
					prevEl: `.${className}+.b2b-features__slider-nav .swiper-button_prev`,
					nextEl: `.${className}+.b2b-features__slider-nav .swiper-button_next`,
				},
			});
		}
	}
}



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
//#region Получение хеша в адресе сайта
function getHash() {
   if (location.hash) { return location.hash.replace('#', ''); }
}
//#endregion

//#region Указание хеша в адресе сайта
function setHash(hash) {
   hash = hash ? `#${hash}` : window.location.href.split('#')[0];
   history.pushState('', '', hash);
}
//#endregion

//#region Обработа медиа запросов из атрибутов 
function dataMediaQueries(array, dataSetValue) {
   // Получение объектов с медиа запросами
   const media = Array.from(array).filter(function (item, index, self) {
      if (item.dataset[dataSetValue]) {
         return item.dataset[dataSetValue].split(",")[0];
      }
   });
   // Инициализация объектов с медиа запросами
   if (media.length) {
      const breakpointsArray = [];
      media.forEach(item => {
         const params = item.dataset[dataSetValue];
         const breakpoint = {};
         const paramsArray = params.split(",");
         breakpoint.value = paramsArray[0];
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
         breakpoint.item = item;
         breakpointsArray.push(breakpoint);
      });
      // Получаем уникальные брейкпоинты
      let mdQueries = breakpointsArray.map(function (item) {
         return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      });
      mdQueries = uniqArray(mdQueries);
      const mdQueriesArray = [];

      if (mdQueries.length) {
         // Работаем с каждым брейкпоинтом
         mdQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);
            // Объекты с нужными условиями
            const itemsArray = breakpointsArray.filter(function (item) {
               if (item.value === mediaBreakpoint && item.type === mediaType) {
                  return true;
               }
            });
            mdQueriesArray.push({
               itemsArray,
               matchMedia
            })
         });
         return mdQueriesArray;
      }
   }
}
//#endregion

function tabsInit() {
   const tabs = document.querySelectorAll('[data-tabs]');
   let tabsActiveHash = [];

   if (tabs.length > 0) {
      const hash = getHash();
      if (hash && hash.startsWith('tab-')) {
         tabsActiveHash = hash.replace('tab-', '').split('-');
      }
      tabs.forEach((tabsBlock, index) => {
         tabsBlock.classList.add('_tab-init');
         tabsBlock.setAttribute('data-tabs-index', index);
         tabsBlock.addEventListener("click", setTabsAction);
         initTabs(tabsBlock);
      });

      // Получение слойлеров с медиа запросами
      let mdQueriesArray = dataMediaQueries(tabs, "tabs");
      if (mdQueriesArray && mdQueriesArray.length) {
         mdQueriesArray.forEach(mdQueriesItem => {
            // Событие
            mdQueriesItem.matchMedia.addEventListener("change", function () {
               setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
         });
      }
   }
   // Установка позиций заголовков
   function setTitlePosition(tabsMediaArray, matchMedia) {
      tabsMediaArray.forEach(tabsMediaItem => {
         tabsMediaItem = tabsMediaItem.item;
         let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
         let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
         let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
         let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
         tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
         tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
         tabsContentItems.forEach((tabsContentItem, index) => {
            if (matchMedia.matches) {
               tabsContent.append(tabsTitleItems[index]);
               tabsContent.append(tabsContentItem);
               tabsMediaItem.classList.add('_tab-spoller');
            } else {
               tabsTitles.append(tabsTitleItems[index]);
               tabsMediaItem.classList.remove('_tab-spoller');
            }
         });
      });
   }
   // Работа с контентом
   function initTabs(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
      let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

      if (tabsActiveHashBlock) {
         const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
         tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
      }
      if (tabsContent.length) {
         tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
         tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
         tabsContent.forEach((tabsContentItem, index) => {
            tabsTitles[index].setAttribute('data-tabs-title', '');
            tabsContentItem.setAttribute('data-tabs-item', '');

            if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
               tabsTitles[index].classList.add('_tab-active');
            }
            tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
         });
      }
   }
   function setTabsStatus(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      function isTabsAnamate(tabsBlock) {
         if (tabsBlock.hasAttribute('data-tabs-animate')) {
            return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
         }
      }
      const tabsBlockAnimate = isTabsAnamate(tabsBlock);
      if (tabsContent.length > 0) {
         const isHash = tabsBlock.hasAttribute('data-tabs-hash');
         tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
         tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
         tabsContent.forEach((tabsContentItem, index) => {
            if (tabsTitles[index].classList.contains('_tab-active')) {
               if (tabsBlockAnimate) {
                  _slideDown(tabsContentItem, tabsBlockAnimate);
               } else {
                  tabsContentItem.hidden = false;
               }
               if (isHash && !tabsContentItem.closest('.popup')) {
                  setHash(`tab-${tabsBlockIndex}-${index}`);
               }
            } else {
               if (tabsBlockAnimate) {
                  _slideUp(tabsContentItem, tabsBlockAnimate);
               } else {
                  tabsContentItem.hidden = true;
               }
            }
         });
      }
   }
   function setTabsAction(e) {
      const el = e.target;
      if (el.closest('[data-tabs-title]')) {
         const tabTitle = el.closest('[data-tabs-title]');
         const tabsBlock = tabTitle.closest('[data-tabs]');
         if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
            let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
            tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock) : null;
            tabActiveTitle.length ? tabActiveTitle[0].classList.remove('_tab-active') : null;
            tabTitle.classList.add('_tab-active');
            setTabsStatus(tabsBlock);
         }
         e.preventDefault();
      }
   }
}

document.addEventListener('DOMContentLoaded', tabsInit);