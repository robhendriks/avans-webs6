describe("Testing GameCreate.js", function() {

  var gameCreateCtrl, gameFactory, templateFactory, $rootScope, $rootState;

  beforeEach(module('mahjong'));

  beforeEach(inject(function($controller, _GameFactory_, _TemplateFactory_, _$rootScope_){
    templateFactory = _TemplateFactory_;
    gameFactory = _GameFactory_;
    $rootScope = _$rootScope_.$new();
    gameListCtrl = $controller('GameCreateCtrl', { $scope: $rootScope, GameFactory: gameFactory, TemplateFactory: templateFactory, $state: {}});
    $rootScope.init();
  }));

  it('should have games', function(done){  
    expect($rootScope.minPlayers).to.equal(2);
    done();
  });
});