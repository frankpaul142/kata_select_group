'use strict';
var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._;
}]);
angular.module('App', [
  'ngRoute',
  'Group',
  'underscore'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'scripts/main/views/dashboard.html'
  });
});
