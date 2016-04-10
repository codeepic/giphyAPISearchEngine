/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../services/giphyAPISearchService.ts" />

'use strict';

class SearchController {
    static $inject = ['GiphyAPISearchService', '$uibModal'];
    //static $inject = ['GiphyAPISearchService'];
    
    private searchPhrase: string;
    private searchResult: any;
    
    constructor(
        private GiphyAPISearchService: GiphyAPISearchService,
        private $uibModal: ng.ui.bootstrap.IModalService
        ){
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
    
    private openModal(gif: any): void{
        
        let modalInstance = this.$uibModal.open({
                templateUrl: '/app/controllers/gifModal/gifModal.html',
                controller: 'GifModalController',
                controllerAs: 'vm',
                resolve: {
                    passedGifData: gif
                }
            });
    }
    
}

angular.module('gifSearchApp').controller('SearchController', SearchController);