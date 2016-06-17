'use strict';

module.exports = function($http) {
  return {

    getPlayersByGameId: function(gameId, callback) {
      $http({
        method: 'GET',
        url: 'http://mahjongmayhem.herokuapp.com/Games/' + gameId + '/Players'
      })
        .then(function(response) {
          callback(null, response.data);
        }, function(response) {
          callback(null, false);
        });
    },

    joinGameById: function(gameId, callback) {
      $http({
        method: 'POST',
        url: 'http://mahjongmayhem.herokuapp.com/Games/' + gameId + '/Players'
      })
        .then(function(response) {
          callback(null, response.data);
        }, function(response) {
          callback(null, false);
        });
    },

    startGameById: function(gameId, callback) {
      $http({
        method: 'POST',
        url: 'http://mahjongmayhem.herokuapp.com/Games/' + gameId + '/Start'
      })
        .then(function(response) {
          callback(null, response.data);
        }, function(response) {
          callback(null, false);
        });
    },

    matchForGameId: function(gameId, tiles, callback) {
       $http({
        method: 'POST',
        url: 'http://mahjongmayhem.herokuapp.com/Games/' + gameId + '/Tiles/matches',
        data: tiles
      })
        .then(function(response) {
          callback(null, response.data);
        }, function(response) {
          callback(response.data, null);
        });
    }

  }
};
