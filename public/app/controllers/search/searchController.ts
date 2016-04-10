/// <reference path="../../../typings/angularjs/angular.d.ts" />
///<reference path="../../services/giphyAPISearchService.ts" />

'use strict';

class SearchController {
    static $inject = ['GiphyAPISearchService'];
    
    constructor(private GiphyAPISearchService: GiphyAPISearchService){
        console.log('Search Controller init !!');
    }

    private searchFor(searchPhrase: string): void{
        this.GiphyAPISearchService.Search(searchPhrase)
            .then((result) => {
                console.log('success: ', result);
            }, (e) => {
               console.log('error fetching ' , searchPhrase); //todo: display message on screen 
            });
    }
    
}

angular.module('gifSearchApp').controller('SearchController', SearchController);