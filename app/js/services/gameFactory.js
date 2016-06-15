'use strict';

var _ = require('underscore');

module.exports = function($http, UserFactory) {
	return {
		GET: function(id, callback) {

			if (_.isFunction(id)) {
				callback = id;
				$http({
						method: 'GET',
						url: 'http://mahjongmayhem.herokuapp.com/games'
					}).then(function(response) {
						callback(response.data);
					}, function(response) {
						callback(null);
					});
			} else {
				$http({
					method: 'GET',
					url: 'http://mahjongmayhem.herokuapp.com/games/' + id
				}).then(function(response) {
					callback(response.data);
				}, function(response) {
					callback(null);
				});
			}
		},
		PUT: function() {},
		POST: function() {},
		DELETE: function() {}
	};
};
