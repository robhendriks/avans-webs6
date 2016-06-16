'use strict';

module.exports = function() {

  var th = 96 / 2;
  var tw = 70 / 2;

  return {
    restrict: 'AE',
    replace: 'true',
    scope: {
      tileModel: '='
    },
    templateUrl: '/js/templates/tile.dir.html',
    link: function(scope, element, attributes) {
      var tileModel = scope.tileModel;
      var className = 'tile-' + tileModel.tile.suit + tileModel.tile.name;
      
      element.addClass(className);

      element.css('left', tileModel.xPos * tw+ 'px');
      element.css('top', (tileModel.yPos * th) - (tileModel.zPos * 10) + 'px');
      element.css('z-index', '' + tileModel.zPos * 10);
    }
  };

};
 
