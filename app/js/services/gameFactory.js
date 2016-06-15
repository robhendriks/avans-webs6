'use strict';

var _ = require('underscore');

module.exports = function($http, UserFactory) {
  return {
    GET: function(arg, callback) {

      var url = 'http://mahjongmayhem.herokuapp.com/games';
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
    POST: function() {},
    DELETE: function() {}
  };
};
