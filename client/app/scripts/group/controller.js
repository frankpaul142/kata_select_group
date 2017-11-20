'use strict';

angular.module('Group')
.controller('group', function ($scope) {
  $scope.controller_loaded = 'Group loaded!';
  $scope.getMembers=function(groups){
	var groupedByCount = _.countBy(groups, function (item) {
	    return item.id;
	});
	console.log(groupedByCount);
	var result=_.map(groupedByCount, function(value,key){ 
			if(value>1)
			return key;
			
  	});

  	result=_.without(result,undefined);
  	return result;
  }

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group.html',
    controller: 'group'
  });
});
