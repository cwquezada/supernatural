// 'use strict';

angular.module('AppConfig')

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 

	function($stateProvider, $urlRouterProvider, $locationProvider) {

	var states = [];
	var baseUrl = 'js/public/shared/pages/';

	// ----------------------------------------------------
	// Routes
	// ----------------------------------------------------

	// main root of app
	states.push({
		name: 'home',
		url: '/',
		deepStateRedirect: true,
		sticky: true,
		views: {
			'page@': {
				controller: 'HomeController', templateUrl: baseUrl + 'home/home.template.html'
			}
		}

	});

	// set state provider
	angular.forEach(states, function(state) {
		$stateProvider.state(state);
	})

	// set default
	$urlRouterProvider.otherwise('/');

	// use HTML5 history apu
	$locationProvider.html5Mode(true);

	app.run(function($rootScope, $state, $window, $timeout) {
		$rootScope.$state = $state;
		$rootScope.$on("$stateChangeSuccess", function() {
			// analytics update
		})
	})


}]);