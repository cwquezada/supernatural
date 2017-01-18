var app = angular.module('app', [
	'ngAnimate',
	'ui.router',
	'ct.ui.router.extras',
	'AppServices',
	'AppConfig',
	'InterfaceComponents',
	'HomeComponents',
	'ContactComponents'
]);

angular.module('AppServices', []);
angular.module('AppConfig', []);
angular.module('InterfaceComponents', []);
angular.module('HomeComponents', []);
angular.module('ContactComponents', []);

