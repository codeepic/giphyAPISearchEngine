/// <reference path="../typings/angularjs/angular.d.ts" />
(function (angular) {
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
/// <reference path="../../typings/angularjs/angular.d.ts" />
'use strict';
var Capitalize = (function () {
    function Capitalize() {
    }
    Capitalize.filter = function () {
        return function (input) {
            if (typeof input === 'string') {
                return input.charAt(0).toUpperCase() + input.slice(1);
            }
            else {
                return;
            }
        };
    };
    Capitalize.$inject = [];
    return Capitalize;
})();
angular.module('gifSearchApp').filter('capitalize', Capitalize.filter);
/// <reference path="../../typings/angularjs/angular.d.ts" />
'use strict';
var GiphyAPISearchService = (function () {
    function GiphyAPISearchService($q, $http) {
        this.$q = $q;
        this.$http = $http;
        this.searchUrl = 'http://api.giphy.com/v1/gifs/search?q=';
        this.apiKey = 'dc6zaTOxFJmzC';
    }
    //http://api.giphy.com/v1/gifs/search?q=puppies&api_key=dc6zaTOxFJmzC   
    GiphyAPISearchService.prototype.Search = function (phrase) {
        var q = this.$q.defer();
        this.$http({
            method: 'GET',
            url: this.searchUrl + phrase + '&api_key=' + this.apiKey
        }).success(function (result) {
            q.resolve(result);
        }).error(function (e) {
            q.reject(e);
        });
        return q.promise;
    };
    GiphyAPISearchService.$inject = ['$q', '$http'];
    return GiphyAPISearchService;
})();
angular.module('gifSearchApp').service('GiphyAPISearchService', GiphyAPISearchService);
/// <reference path="../../../typings/angularjs/angular.d.ts" />
///<reference path="../../services/giphyAPISearchService.ts" />
'use strict';
var SearchController = (function () {
    function SearchController(GiphyAPISearchService) {
        this.GiphyAPISearchService = GiphyAPISearchService;
        console.log('Search Controller init !!');
    }
    SearchController.prototype.searchFor = function (searchPhrase) {
        var _this = this;
        this.searchPhrase = searchPhrase;
        this.GiphyAPISearchService.Search(searchPhrase)
            .then(function (result) {
            console.log('success: ', result);
            _this.searchResult = result;
        }, function (e) {
            console.log('error fetching ', searchPhrase); //todo: display message on screen 
        });
    };
    SearchController.$inject = ['GiphyAPISearchService'];
    return SearchController;
})();
angular.module('gifSearchApp').controller('SearchController', SearchController);