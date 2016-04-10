/// <reference path="../../typings/angularjs/angular.d.ts" />

'use strict';

class GiphyAPISearchService {
    
    static $inject = ['$q', '$http'];
    
    private searchUrl: string = 'http://api.giphy.com/v1/gifs/search?q=';
    private apiKey: string = 'dc6zaTOxFJmzC';
    private pageSize: number = 15;
    
    constructor(private $q: ng.IQService, private $http: ng.IHttpService){}
    
    //http://api.giphy.com/v1/gifs/search?q=puppies&api_key=dc6zaTOxFJmzC   
    
    public Search(phrase: string): ng.IPromise<{}> {
        var q = this.$q.defer();
        
        this.$http({
            method: 'GET',
            url: this.searchUrl + phrase + '&api_key=' + this.apiKey + '&limit=' + this.pageSize
        }).success((result) =>{
            q.resolve(result);
        }).error((e) =>{
            q.reject(e);
        });
        
        return q.promise;
    }
}

angular.module('gifSearchApp').service('GiphyAPISearchService', GiphyAPISearchService)