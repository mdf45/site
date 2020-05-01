/**
*	Site-specific configuration settings for Highslide JS
*/
hs.graphicsDir = 'assets/templates/megapolis/js/highslide/highslide/graphics/';
hs.outlineType = 'custom';
hs.captionEval = 'this.thumb.title';


// Add the slideshow controller
hs.addSlideshow({
	slideshowGroup: 'group1',
	interval: 5000,
	repeat: false,
	useControls: true,
	fixedControls: 'fit',
	overlayOptions: {
		className: 'text-controls',
		opacity: 0.75,
		position: 'bottom center',
		offsetX: 0,
		offsetY: -10,
		hideOnMouseOut: true
	}
});

// Russian language strings
hs.lang = {
	cssDirection: 'ltr',
	loadingText: 'Загружаю...',
	loadingTitle: 'Нажмите для отмены',
	focusTitle: 'Нажмите чтобы поместить на передний план',
	fullExpandTitle: 'Развернуть до оригинального размера',
	creditsText: 'Использует <i>Highslide JS</i>',
	creditsTitle: 'Перейти на домашнюю страницу Highslide JS',
	previousText: 'Предыдущее',
	nextText: 'Следующее',
	moveText: 'Переместить',
	closeText: 'Закрыть',
	closeTitle: 'Закрыть (esc)',
	resizeTitle: 'Изменить размер',
	playText: 'Слайдшоу',
	playTitle: 'Начать слайдшоу (пробел)',
	pauseText: 'Пауза',
	pauseTitle: 'Приостановить слайдшоу (пробел)',
	previousTitle: 'Предыдущее (стрелка влево)',
	nextTitle: 'Следующее (стрелка вправо)',
	moveTitle: 'Переместить',
	fullExpandText: 'Оригинальный размер',
	number: 'Изображение %1 из %2',
	restoreTitle: 'Нажмите чтобы закрыть изображение, нажмите и перетащите для изменения местоположения. Для просмотра изображений используйте стрелки.'
};

// gallery config object
var config1 = {
	slideshowGroup: 'group1',
	width:300,
	numberPosition: 'caption',
	dimmingOpacity:0.75,
	transitions: ['expand', 'crossfade'],
	align:'center'
};

var config2 = {
	objectType: 'iframe', 
	width: 480, 
	height: 385,
	allowSizeReduction: false, 
	wrapperClassName: 'draggable-header no-footer', 
	preserveContent: false, 
	objectLoadTime: 'after'
};
