'use strict';

var _ = require('underscore');

module.exports = function($http) {
  return {
    GET: function(callback) {
      var result;
      if (result = localStorage.getItem('tplcache')) {
        console.log('templates from cache');
        return callback(JSON.parse(result));
      }

      $http({
        method: 'GET',
        url: 'http://mahjongmayhem.herokuapp.com/GameTemplates'
      })
        .then(function(response) {
          localStorage.setItem('tplcache', JSON.stringify(response.data));
          callback(response.data);
        }, function(response) {
          callback(null);
        });

    }
  };
};
