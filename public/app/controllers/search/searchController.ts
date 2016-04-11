/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../services/giphyAPISearchService.ts" />

'use strict';

class SearchController {
    static $inject = ['GiphyAPISearchService', '$uibModal'];
    //static $inject = ['GiphyAPISearchService'];
    
    private searchPhrase: string;
    private searchResult: any;
    private numberOfPages: number;
    private pages: number[] = [];
    
    constructor(
        private GiphyAPISearchService: GiphyAPISearchService,
        private $uibModal: ng.ui.bootstrap.IModalService
        ){}

    private searchFor(searchPhrase: string): void{
        this.searchPhrase = searchPhrase;
        
        this.GiphyAPISearchService.Search(searchPhrase)
            .then((result) => {
                this.searchResult = result;
                
                this.createPagination();
                
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
    
    private createPagination(): void {
        this.numberOfPages = Math.ceil(this.searchResult.pagination.total_count / this.GiphyAPISearchService.pageSize);
        
        for(let i = 1; i <= this.numberOfPages; i++){
            this.pages.push(i);
        }
    }
    
    private loadPage(page: number): void {
        console.log('laod page: ', page);
        this.GiphyAPISearchService.LoadPage(page)
            .then((result) => {
                this.searchResult = result;
                
                this.createPagination();
                
            }, (e) => {
                console.log('error fetching next page' ); //todo: display message on screen 
            });
    }
}

angular.module('gifSearchApp').controller('SearchController', SearchController);