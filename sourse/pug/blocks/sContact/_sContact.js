"use strict";
function eventHandler() {
	var myMap;
	ymaps.ready(init);
	
	function init () {
		let coords = [],
				sContactItems = document.querySelectorAll('.sContact__item');
		
		sContactItems.forEach((item) => coords.push(JSON.parse(item.dataset.coords)));

		myMap = new ymaps.Map('map', {
				center: coords[0],
				zoom: 14
		}, {
				searchControlProvider: 'yandex#search'
		});
		let myPlacemark = new ymaps.Placemark(coords[0], {}, {
			iconLayout: 'default#image',
			iconImageHref: 'img/svg/map-pin-2.svg',
			iconImageSize: [48, 77],
			iconImageOffset: [-24, -38]
		});
		myMap.geoObjects.add(myPlacemark);

		for (let i = 0; i < sContactItems.length; i++) {
			sContactItems[i].addEventListener('click', () => {
				sContactItems.forEach((item) => item.classList.remove('active'));
				sContactItems[i].classList.add('active');

				myMap.setCenter(coords[i]);
				myPlacemark.geometry.setCoordinates(coords[i]);
			});
		}
	};
};

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}