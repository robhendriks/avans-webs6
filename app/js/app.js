'use strict';

require('angular/angular');
require('angular-ui-router/release/angular-ui-router');

var app = angular.module('mahjong', ['ui.router']);

app.factory('GameFactory', require('./services/gameFactory'));
app.factory('TileFactory', require('./services/tileFactory'));

app.controller('UserCtrl', require('./controllers/user'));
app.controller('GameListCtrl', require('./controllers/gameList'));
app.controller('GameDetailsCtrl', require('./controllers/gameDetails'));

app.config(require('./config/routes'));

app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}]);
