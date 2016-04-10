/// <reference path="../typings/angularjs/angular.d.ts" />

(function(angular) {
	'use strict';

	angular.module('gifSearchApp', [
        'ngRoute'
        ]).config(config);
    
	function config($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/', {
				templateUrl: '/app/controllers/search/search.html',
				controller: 'SearchController',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
    
})(angular);