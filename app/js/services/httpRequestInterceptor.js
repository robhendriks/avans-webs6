'use strict';

module.exports = function($rootScope, UserFactory) {
  return {
    request: function(config) {
      var user = UserFactory.get();
      if (!!user) {
        config.headers['x-token'] = user.token;
        config.headers['x-username'] = user.username;
      }
      return config;
    }
  };
};
