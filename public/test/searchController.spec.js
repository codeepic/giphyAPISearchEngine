console.log("controller spec below");

describe("Search Controller", function(){

    var scope,
        $controller,
        $httpBackend,
        GiphyAPISearchService,
        $uibModal;
    
    beforeEach(module('gifSearchApp'));

    beforeEach(inject(function (_$rootScope_, _$controller_, _$httpBackend_, _GiphyAPISearchService_, _$uibModal_) {
            scope = _$rootScope_.$new();
            
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
            GiphyAPISearchService = _GiphyAPISearchService_;
            $uibModal = _$uibModal_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should have GiphyAPISearchService defined", function() {
        expect(GiphyAPISearchService).toBeDefined();
    });
    
    
    it("should have $uibModal service defined", function() {
        expect($uibModal).toBeDefined();
    });
    
});
