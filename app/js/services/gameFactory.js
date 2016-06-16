'use strict';

var _ = require('underscore');

module.exports = function($http, UserFactory) {
  return {
    GET: function(arg, callback) {

      var url = 'http://mahjongmayhem.herokuapp.com/Games';
      var params = {};
      if (_.isFunction(arg)) {
        callback = arg;
      } else if (_.isObject(arg)) {
        params = arg;
      } else {
        url += '/' + arg;
      }

      $http({
        method: 'GET',
        url: url,
        params: params
      })
        .then(function(response) {
          callback(response.data);
        }, function(response) {
          callback(response);
        });

    },
    PUT: function() {},
    POST: function(game, callback) {

      $http({
        method: 'POST',
        url: 'http://mahjongmayhem.herokuapp.com/Games',
        data: game
      })
        .then(function(response) {
          callback(response.data);
        }, function(response) {
          callback(null);
        });

    },
    DELETE: function(id, callback) {

      $http({
        method: 'DELETE',
        url: 'http://mahjongmayhem.herokuapp.com/Games/' + id
      })
        .then(function(response) {
          callback();
        }, function(response) {
          callback();
        });

    }
  };
};
