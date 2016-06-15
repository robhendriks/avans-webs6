'use strict';

module.exports = function(UserFactory, $scope, $location) {
  $scope.user = null;
  
  $scope.init = function() {
    UserFactory.me(function(user, needsRefresh) {
      $scope.user = user;
      if (needsRefresh) {
        console.log('reload');
        $location.url($location.path());
      }
    });
  };

  $scope.hasUser = function() {
    return !!$scope.user;
  };

  $scope.init();
};
