angular.module('InterfaceComponents')

.controller('InterfaceController', ['$scope', '$http', '$timeout', 'InterfaceServices', 'InterfaceAnimations', 

	function($scope, $http, $timeout, InterfaceServices, InterfaceAnimations) {

		$scope.interface = InterfaceServices.interface;

		$scope.closeContact = function() {
			$scope.name = null;
			$scope.email = null;
			$scope.message = null;
			$scope.contactForm.$setPristine();
			$scope.interface.isContact = false;
		}

		$timeout(function() {
			InterfaceAnimations.morphMessage('#message-recieved');
			$scope.interface.isForm = false;
			$scope.interface.isRecieved = true;
			$scope.interface.isLost = false;
		}, 6000)

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