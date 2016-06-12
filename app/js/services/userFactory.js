'use strict';

module.exports = function($location, $cookies) {
	return {
		me: function(callback) {
			if (this.user) {
				return callback(this.user);
			}

			var user;
			if (user = $cookies.getObject('user')) {
				this.user = user;
				return callback(user);
			}

			var query = $location.search();
			if (!query.username || !query.token) {
				return callback(false);
			}

			this.user = {
				username: query.username,
				token: query.token
			};

			$cookies.putObject('user', this.user);
			callback(this.user, true);
		}
	};
};

