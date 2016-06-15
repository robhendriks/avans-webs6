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
		ADD: function(template, min, max, callback) {
			UserFactory.me(function(user){
				$http({
				method: 'POST',
				url: 'http://mahjongmayhem.herokuapp.com/Games',
				data: {
					'templateName': template,
					'minPlayers': min,
					'maxPlayers': max
				},
				headers: {
					'x-username': user.username,
					'x-token': user.token
				}
				}).then(function(response){
					callback(response.data);
				}, function(response) {
					callback(response);
				});
			});
		},
		JOIN: function(gameid, callback) {
			if(gameid == null){
				callback(null);
			}
			else{
				UserFactory.me(function(user){
					$http({
						method: 'POST',
						url: 'http://mahjongmayhem.herokuapp.com/games/' + gameid + '/players',
						headers: {
							'x-username': user.username,
							'x-token': user.token
						}
					}).then(function(response) {
						callback(response.data);
					}, function(response){
						callback(response.data);
					});
				});
			}
		},
		DELETE: function() {},
		GETTEMPLATES: function(callback){
			$http({
				method: 'GET',
				url: 'http://mahjongmayhem.herokuapp.com/GameTemplates'
			}).then(function(response){
				callback(response.data);
			}, function(response){
				callback(null);
			});
		}
	};
};
