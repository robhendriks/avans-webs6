describe("Testing Games", function() {

  var gameListCtrl, gameService, userService, $rootScope;

  beforeEach(module('mahjong'));

  beforeEach(inject(function($controller, _gameService_, _userService_, _$rootScope_){
    userService = _userService_;
    gameService = _gameService_;
    $rootScope = _$rootScope_.$new();
    gameListCtrl = $controller('GameListCtrl', { $scope: $rootScope, gameService: gameService, userService: userService});
    $rootScope.init();
    $rootScope.getGames(true);
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

