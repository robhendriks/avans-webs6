describe("Testing GameCreate.js", function() {

  var gameCreateCtrl, gameService, templateService, $rootScope, $rootState;

  beforeEach(module('mahjong'));

  beforeEach(inject(function($controller, _gameService_, _templateService_, _$rootScope_){
    templateService = _templateService_;
    gameService = _gameService_;
    $rootScope = _$rootScope_.$new();
    gameListCtrl = $controller('GameCreateCtrl', { $scope: $rootScope, gameService: gameService, templateService: templateService, $state: {}});
    $rootScope.init();
  }));

  it('Min players should be set', function(done){  
    expect($rootScope.minPlayers).to.equal(2);
    done();
  });

  it('Min players should be set', function(done){  
    expect($rootScope.maxPlayers).to.equal(32);
    done();
  });
});