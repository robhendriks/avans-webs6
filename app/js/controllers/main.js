'use strict';

module.exports = function($scope) {

  function init() {
    $scope.spinner = false;
  }

  $scope.showSpinner = function() {
    $scope.spinner = true;
  };

  $scope.hideSpinner = function() {
    $scope.spinner = false;
  };

  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.resolve) {
      $scope.showSpinner();
    }
  });

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (toState.resolve) {
      $scope.hideSpinner();
    }
  });

  init();

};
