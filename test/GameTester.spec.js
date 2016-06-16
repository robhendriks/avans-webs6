describe("Testing Games", function() {

  var gameListCtrl, gameFactory, userFactory, $rootScope;

  beforeEach(module('mahjong'));

  beforeEach(inject(function($controller, _GameFactory_, _UserFactory_, _$rootScope_){
    userFactory = _UserFactory_;
    gameFactory = _GameFactory_;
    $rootScope = _$rootScope_.$new();
    gameListCtrl = $controller('GameListCtrl', { $scope: $rootScope, GameFactory: gameFactory, UserFactory: userFactory});
    $rootScope.init();
  }));

  it('should have games', function(done){  
    var games = $rootScope.games;
    expect(games).to.be.an('array');
    done();
  });

  it('shoud have states', function(done){
    var states = $rootScope.states;
    expect(states).to.be.an('array');
    expect(states).to.have.length.above(0);
    done();  
  });
});
