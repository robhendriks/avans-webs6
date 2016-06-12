'use strict';

var _ = require('underscore');

module.exports = function($http) {
	return {
		GET: function(id, callback) {

			var query = '';
			if (_.isFunction(id)) {
				callback = id;
			} else {
				query = '/' + id;
			}

			$http({
				method: 'GET',
				url: 'http://mahjongmayhem.herokuapp.com/games' + query
			}).then(function(response) {
				callback(response.data);
			}, function(response) {
				callback(null);
			});
			
		},
		PUT: function() {},
		POST: function() {},
		DELETE: function() {}
	};
};
