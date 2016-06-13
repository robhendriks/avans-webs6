'use strict';

var _ = require('underscore');

module.exports = function($http, UserFactory) {
	return {
		GET: function(id, callback) {

			if (_.isFunction(id)) {
				callback = id;

				UserFactory.me(function(user) {
					var query = {};
					if (user) {
						query.player = user.username;
					}

					$http({
						method: 'GET',
						url: 'http://mahjongmayhem.herokuapp.com/games',
						params: query
					}).then(function(response) {
						callback(response.data);
					}, function(response) {
						callback(null);
					});
				})
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
