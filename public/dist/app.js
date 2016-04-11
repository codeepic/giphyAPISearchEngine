/// <reference path="../typings/angularjs/angular.d.ts" />
(function (angular) {
    'use strict';
    angular.module('gifSearchApp', [
        'ngRoute',
        'ui.bootstrap'
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
// 
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
        //public numberOfPages: number;
        this.searchUrl = 'http://api.giphy.com/v1/gifs/search?q=';
        this.apiKey = 'dc6zaTOxFJmzC';
        this.pageSize = 15;
    }
    //http://api.giphy.com/v1/gifs/search?q=puppies&api_key=dc6zaTOxFJmzC   
    GiphyAPISearchService.prototype.Search = function (phrase) {
        var q = this.$q.defer();
        this.phrase = phrase;
        this.$http({
            method: 'GET',
            url: this.searchUrl + phrase + '&api_key=' + this.apiKey + '&limit=' + this.pageSize
        }).success(function (result) {
            //this.CreatePagination(result);
            q.resolve(result);
        }).error(function (e) {
            q.reject(e);
        });
        return q.promise;
    };
    GiphyAPISearchService.prototype.LoadPage = function (page) {
        var q = this.$q.defer();
        var offset = (page - 1) * this.pageSize;
        this.$http({
            method: 'GET',
            url: this.searchUrl + this.phrase + '&api_key=' + this.apiKey + '&limit=' + this.pageSize + '&offset=' + offset
        }).success(function (result) {
            //this.CreatePagination(result);
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
/// <reference path="../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
'use strict';
var GifModalController = (function () {
    function GifModalController($uibModalInstance, passedGifData) {
        this.$uibModalInstance = $uibModalInstance;
        this.passedGifData = passedGifData;
        console.log('Gif Modal Controller init !!');
    }
    GifModalController.prototype.cancel = function () {
        this.$uibModalInstance.dismiss();
    };
    GifModalController.$inject = ['$uibModalInstance', 'passedGifData'];
    return GifModalController;
})();
angular.module('gifSearchApp').controller('GifModalController', GifModalController);
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../services/giphyAPISearchService.ts" />
'use strict';
var SearchController = (function () {
    function SearchController(GiphyAPISearchService, $uibModal) {
        this.GiphyAPISearchService = GiphyAPISearchService;
        this.$uibModal = $uibModal;
        this.pages = [];
    }
    SearchController.prototype.searchFor = function (searchPhrase) {
        var _this = this;
        this.searchPhrase = searchPhrase;
        this.GiphyAPISearchService.Search(searchPhrase)
            .then(function (result) {
            _this.searchResult = result;
            _this.createPagination();
        }, function (e) {
            console.log('error fetching ', searchPhrase); //todo: display message on screen 
        });
    };
    SearchController.prototype.openModal = function (gif) {
        var modalInstance = this.$uibModal.open({
            templateUrl: '/app/controllers/gifModal/gifModal.html',
            controller: 'GifModalController',
            controllerAs: 'vm',
            resolve: {
                passedGifData: gif
            }
        });
    };
    SearchController.prototype.createPagination = function () {
        this.numberOfPages = Math.ceil(this.searchResult.pagination.total_count / this.GiphyAPISearchService.pageSize);
        for (var i = 1; i <= this.numberOfPages; i++) {
            this.pages.push(i);
        }
    };
    SearchController.prototype.loadPage = function (page) {
        var _this = this;
        console.log('laod page: ', page);
        this.GiphyAPISearchService.LoadPage(page)
            .then(function (result) {
            _this.searchResult = result;
            _this.createPagination();
        }, function (e) {
            console.log('error fetching next page'); //todo: display message on screen 
        });
    };
    SearchController.$inject = ['GiphyAPISearchService', '$uibModal'];
    return SearchController;
})();
angular.module('gifSearchApp').controller('SearchController', SearchController);
