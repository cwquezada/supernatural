angular.module('AppServices')

app.factory('InterfaceServices', function($rootScope) {

	var root = {};

	root.interface = {
		isContact: false,
		isForm: true,
		isRecieved: false,
		isLost: false,
		isLoading: false
	}

	return root;

});

app.factory('InterfaceAnimations', function() {

	var root = {};

	root.morphMessage = function(toShape) {
		TweenMax.to('#get-in-touch', 2.125, { morphSVG: { shape: toShape }, ease: Power2.easeInOut });
	}

	return root;

});