(function() {
	"use strict";

	var app = angular.module('app', [
		'ngAnimate',
		'ui.router',
		'ct.ui.router.extras'
	]);

	app.factory('InterfaceServices', ['$rootScope', function($rootScope) {

		var root = {};

		root.interface = {
			isContact: false,
			isForm: true,
			isRecieved: false,
			isLost: false,
			isLoading: false
		}

		return root;

	}]);

	app.factory('InterfaceAnimations', ['$rootScope', function($rootScope) {

		var root = {};

		root.morphMessage = function(toShape) {
			TweenMax.to('#get-in-touch', 2.125, { morphSVG: { shape: toShape }, ease: Power2.easeInOut });
		}

		return root;

	}]);

	app.controller('MainController', ['$scope', '$http', '$timeout', 'InterfaceServices', 'InterfaceAnimations', 

		function($scope, $http, $timeout, InterfaceServices, InterfaceAnimations) {

			$scope.interface = InterfaceServices.interface;

			$scope.closeContact = function() {
				$scope.name = null;
				$scope.email = null;
				$scope.message = null;
				$scope.contactForm.$setPristine();
				$scope.interface.isContact = false;
				InterfaceAnimations.morphMessage('#get-in-touch');
			}

			$scope.openContact = function() {
				$scope.interface.isContact = true;
				$scope.interface.isForm = true;
				$scope.interface.isRecieved = false;
				$scope.interface.isLost = false;
			}

			$scope.submitForm = function(isValid) {

				$scope.interface.isLoading = true;

				if ($scope.contactForm.honeyPot.$viewValue != undefined) {
					isValid = false;
				}

				if (isValid) {

					$http.post('/contact', {
						name: $scope.contactForm.name.$viewValue,
						email: $scope.contactForm.email.$viewValue,
						message: $scope.contactForm.message.$viewValue
					})

					.then(function onSuccess(sailsResponse) {
						InterfaceAnimations.morphMessage('#message-recieved');
						$scope.interface.isForm = false;
						$scope.interface.isRecieved = true;
						$scope.interface.isLost = false;
						$scope.contactForm.$setPristine();
					})

					.catch(function onError(sailsResponse) {
						InterfaceAnimations.morphMessage('#communication-lost');
						$scope.interface.isForm = false;
						$scope.interface.isRecieved = false;
						$scope.interface.isLost = true;
					})

					.finally(function eitherWay() {
						$scope.interface.isLoading = false;
					})

				}

			};

		}
		
	]);

	app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 

		function($stateProvider, $urlRouterProvider, $locationProvider) {

		var states = [];
		var baseUrl = 'dist/angular/shared/pages/';

		states.push({
			name: 'home',
			url: '/',
			deepStateRedirect: true,
			sticky: true,
			views: {
				'page@': {
					templateUrl: baseUrl + 'home/home.template.html'
				}
			}

		});

		angular.forEach(states, function(state) {
			$stateProvider.state(state);
		})

		$urlRouterProvider.otherwise('/');

		$locationProvider.html5Mode(true);

	}]);

	app.run(['$rootScope', '$state', '$window', '$timeout', 

		function($rootScope, $state, $window, $timeout) {
			$rootScope.$state = $state;
			$rootScope.$on("$stateChangeSuccess", function() {
			// analytics update
		})

	}]);

})();