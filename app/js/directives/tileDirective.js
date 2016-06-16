'use strict';

module.exports = function() {

  return {
    restrict: 'AE',
    replace: 'true',
    scope: {
      tileModel: '='
    },
    templateUrl: '/js/templates/tile.dir.html',
    controller: function($scope, $element) {
    },
    link: function(scope, element, attributes) {
      element.css('background', 'red'); 
    }
  };

};
 
