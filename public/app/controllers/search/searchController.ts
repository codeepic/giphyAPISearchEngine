/// <reference path="../../../typings/angularjs/angular.d.ts" />
///<reference path="../../services/giphyAPISearchService.ts" />

'use strict';

class SearchController {
    static $inject = ['GiphyAPISearchService'];
    
    private searchPhrase: string;
    private searchResult: any;
    
    constructor(private GiphyAPISearchService: GiphyAPISearchService){
        console.log('Search Controller init !!');
    }

    private searchFor(searchPhrase: string): void{
        this.searchPhrase = searchPhrase;
        
        this.GiphyAPISearchService.Search(searchPhrase)
            .then((result) => {
                console.log('success: ', result);
                this.searchResult = result;
            }, (e) => {
               console.log('error fetching ' , searchPhrase); //todo: display message on screen 
            });
    }
    
}

angular.module('gifSearchApp').controller('SearchController', SearchController);