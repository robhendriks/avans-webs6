'use strict';

module.exports = function($location, $cookies) {
  return {
    get: function(callback) {
      if (this.user) {
        return this.user;
      }

      var user;
      if (user = $cookies.getObject('user')) {
        return this.user = user;
      }

      var query = $location.search();
      if (!query.username || !query.token) {
        return null;
      }

      this.user = {
        username: query.username,
        token: query.token
      };

      $cookies.putObject('user', this.user);
      return this.user;
    }
  };
};

