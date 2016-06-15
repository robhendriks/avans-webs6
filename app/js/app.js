'use strict';

require('angular/angular');
require('angular-cookies/angular-cookies');
require('angular-ui-router/release/angular-ui-router');

var app = angular.module('mahjong', ['ui.router', 'ngCookies']);

app.factory('UserFactory', require('./services/userFactory'));
app.factory('GameFactory', require('./services/gameFactory'));
app.factory('TileFactory', require('./services/tileFactory'));

app.controller('ProfileCtrl', require('./controllers/profile'));
app.controller('GameListCtrl', require('./controllers/gameList'));
app.controller('GameDetailsCtrl', require('./controllers/gameDetails'));
app.controller('GameUserListCtrl', require('./controllers/gameUsers'));

app.config(require('./config/routes'));

app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode(true);
}]);
