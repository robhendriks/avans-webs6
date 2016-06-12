'use strict';

require('angular/angular');

var app = angular.module('mahjong', []);

app.controller('GameListCtrl', require('./controller/gameList'));
app.controller('GameDetailsCtrl', require('./controller/gameDetails'));
