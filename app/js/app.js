'use strict';

require('angular/angular');
require('angular-cookies/angular-cookies');
require('angular-ui-router/release/angular-ui-router');
require('angular-socket-io/socket');

var app = angular.module('mahjong', ['ui.router', 'ngCookies', 'btford.socket-io']);

app.directive('tile', require('./directives/tileDirective'));

app.factory('UserFactory', require('./services/userFactory'));
app.factory('GameFactory', require('./services/gameFactory'));
app.factory('TileFactory', require('./services/tileFactory'));
app.factory('PlayerFactory', require('./services/playerFactory'));
app.factory('TemplateFactory', require('./services/templateFactory'));
app.factory('httpRequestInterceptor', require('./services/httpRequestInterceptor'));

app.controller('ProfileCtrl', require('./controllers/profile'));
app.controller('GameListCtrl', require('./controllers/gameList'));
app.controller('GameDetailsCtrl', require('./controllers/gameDetails'));
app.controller('GameBoardCtrl', require('./controllers/gameBoard'));
app.controller('GameUserListCtrl', require('./controllers/gameUserList'));
app.controller('GameInfoCtrl', require('./controllers/gameInfo'));
app.controller('GameCreateCtrl', require('./controllers/gameCreate'));

app.config(require('./config/routes'));

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});
