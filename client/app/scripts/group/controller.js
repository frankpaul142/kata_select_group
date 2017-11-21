'use strict';

angular.module('Group')
.controller('group', function ($scope) {
  $scope.controller_loaded = 'Group loaded!';
  $scope.getMembers=function(groups){
	var groupedByCount = _.countBy(groups, function (item) {
	    return item.id;
	});
	var grouped= _.groupBy(groups,'group');
	var result=_.map(groupedByCount, function(value,key){ 
			if(value>1)
			return key;
			
  	});
  	result=_.without(result,undefined);
  	_.each(grouped, function(value,key){ 
  			if(_.contains(result, value[0].id)||_.contains(result, value[1].id))
  				return;
  				result.push[value[0].id];
	});
  	return result;
  }
  $scope.asign=function(){
  	for(var i=1;i<=$scope.quantity_teams;i++){
  		$('#inputs').append('<div class="row"><div class="col-sm-4"><input ng-model="Group['+i+'][0]" /></div><div class="col-sm-4"><input ng-model="Group['+i+'][1]" /></div></div>');
  	}
  }
  $scope.createArray=function(){
  		console.log($scope.Group);
	}

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group.html',
    controller: 'group'
  });
});
