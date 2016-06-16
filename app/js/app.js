'use strict';

require('angular/angular');
require('angular-cookies/angular-cookies');
require('angular-ui-router/release/angular-ui-router');
require('angular-socket-io/socket');

var app = angular.module('mahjong', ['ui.router', 'ngCookies', 'btford.socket-io']);

app.directive('tile', require('./directives/tileDirective'));

app.factory('userService', require('./services/userService'));
app.factory('gameService', require('./services/gameService'));
app.factory('tileService', require('./services/tileService'));
app.factory('playerService', require('./services/playerService'));
app.factory('templateService', require('./services/templateService'));
app.factory('httpRequestInterceptor', require('./services/httpRequestInterceptor'));

app.controller('MainCtrl', require('./controllers/main'));
app.controller('GameListCtrl', require('./controllers/gameList'));
app.controller('GameViewCtrl', require('./controllers/gameView'));
app.controller('GameCreateCtrl', require('./controllers/gameCreate'));
app.controller('GameBoardCtrl', require('./controllers/gameBoard'));
app.controller('PlayerListCtrl', require('./controllers/playerList'));

app.config(require('./config/routes'));

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});
