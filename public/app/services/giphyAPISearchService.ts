/// <reference path="../../typings/angularjs/angular.d.ts" />

'use strict';

class GiphyAPISearchService {
    
    static $inject = ['$q', '$http'];
    
    //public numberOfPages: number;
    private searchUrl: string = 'http://api.giphy.com/v1/gifs/search?q=';
    private apiKey: string = 'dc6zaTOxFJmzC';
    public phrase: string;
    public pageSize: number = 15;
    
    constructor(private $q: ng.IQService, private $http: ng.IHttpService){}
    
    //http://api.giphy.com/v1/gifs/search?q=puppies&api_key=dc6zaTOxFJmzC   
    
    public Search(phrase: string): ng.IPromise<{}> {
        let q = this.$q.defer();
        
        this.phrase = phrase;
        
        this.$http({
            method: 'GET',
            url: this.searchUrl + phrase + '&api_key=' + this.apiKey + '&limit=' + this.pageSize 
        }).success((result) =>{
            //this.CreatePagination(result);
            q.resolve(result);
        }).error((e) =>{
            q.reject(e);
        });
        
        return q.promise;
    }
    
    public LoadPage(page: number): ng.IPromise<{}> {
        let q = this.$q.defer();
        
        let offset = (page - 1)  * this.pageSize;
        
        this.$http({
            method: 'GET',
            url: this.searchUrl + this.phrase + '&api_key=' + this.apiKey + '&limit=' + this.pageSize + '&offset=' + offset
        }).success((result) =>{
            //this.CreatePagination(result);
            q.resolve(result);
        }).error((e) =>{
            q.reject(e);
        });
        
        return q.promise;
    }
    
    // private CreatePagination(result){
    //     this.numberOfPages = Math.ceil(result.pagination.total_count / this.pageSize);
    // }
}

angular.module('gifSearchApp').service('GiphyAPISearchService', GiphyAPISearchService)