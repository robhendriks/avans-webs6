'use strict';

module.exports = function() {

  return {
    restrict: 'AE',
    replace: true,
    scope: {
      tileModel: '=',
      render: '@'
    },
    templateUrl: '/js/templates/tile.dir.html',
    controller: function($scope, TileFactory, $element) {

    },
    link: function(scope, element, attributes) {

    }
  };

};
 
