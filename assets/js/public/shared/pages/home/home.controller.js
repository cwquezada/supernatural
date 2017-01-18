angular.module('HomeComponents')

.controller('HomeController', ['$scope', 'InterfaceServices',
	
	function($scope, InterfaceServices) {

		$scope.interface = InterfaceServices.interface;

}]);