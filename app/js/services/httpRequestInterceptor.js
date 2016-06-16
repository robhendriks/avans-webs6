'use strict';

module.exports = function($rootScope, userService) {
  return {
    request: function(config) {
      var user = userService.get();
      if (user !== null) {
        config.headers['x-token'] = user.token;
        config.headers['x-username'] = user.username;
      }
      return config;
    }
  };
};
