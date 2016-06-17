'use strict';

var _ = require('underscore');

module.exports = function($http) {
  return {

    getTemplates: function(callback) {
      var data;
      if ((data = localStorage.getItem('template_cache')) !== null) {
        return callback(null, JSON.parse(data));
      }

      $http({
        method: 'GET',
        url: 'http://mahjongmayhem.herokuapp.com/GameTemplates'
      })
        .then(function(response) {
          localStorage.setItem('template_cache', JSON.stringify(response.data));
          callback(null, response.data);
        }, function(response) {
          callback(null, false);
        });
      }

  };
};
