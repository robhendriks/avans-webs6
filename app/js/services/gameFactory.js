'use strict';

var _ = require('underscore');

module.exports = function($timeout) {
	return {
		GET: function(id, callback) {

			$timeout(function() {
				var games = [
					{id: 1, title: 'Foo'},
					{id: 2, title: 'Bar'}
				];

				if (_.isFunction(id)) {
					return id(games);
				}

				var game = _.findWhere(games, {id: id});
				callback(game);
			}, 0);
			
		},
		PUT: function() {},
		POST: function() {},
		DELETE: function() {}
	};
};
