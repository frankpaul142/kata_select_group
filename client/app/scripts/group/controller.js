'use strict';

angular.module('Group')
.controller('group', function ($scope) {
	$scope.controller_loaded = 'Group loaded!';
	$scope.inputs=[];
	$scope.result='';
	var result=[];
	var to_commute=[];
	var estocolmo_repeated=[];
	var londres_repeated=[];
	$scope.getMembers=function(groups){
		var groupedByCount = _.countBy(groups, function (item) {
			return item.id;
		});
		var all_equals=!!_.reduce(groupedByCount,function(a, b){ return (a === b) ? a : NaN; });
		var grouped= _.groupBy(groups,'group');
		if(all_equals && groups.length !== Object.keys(groupedByCount).length ){
			_.each(groupedByCount, function(value,key){ 
					result.push(key);		
			});
			result = _.sortBy(result, function(num) {
				return num;
			});
			return result.slice(0,Object.keys(groupedByCount).length/2);
		}

		if(all_equals && groups.length === Object.keys(groupedByCount).length){
			_.each(grouped, function(value){ 
					result.push(value[0].id);			
			});
			result = _.sortBy(result, function(num) {
				return num;
			});
			return result;
		}
		result=_.map(groupedByCount, function(value,key){ 
		if(value>1){
			return key;
		} 
		
		});

		result=_.without(result,undefined);
		_.each(grouped, function(value){ 
			if(_.contains(result, value[0].id) || _.contains(result, value[1].id)){
				return;
			}
			result.push(value[0].id);				
		});

		result = _.sortBy(result, function(num) {
		return num;
		});

		_.each(grouped, function(value,key){
			if(_.contains(result, value[0].id) && _.contains(result, value[1].id)){
				to_commute.push(key);
			}
		});

		_.each(to_commute, function(value){
			estocolmo_repeated.push(grouped[value][0].id);
			londres_repeated.push(grouped[value][1].id);
		});
		if(!!_.reduce(estocolmo_repeated,function(a, b){ return (a === b) ? a : NaN; })){
			result = _.without(result,estocolmo_repeated[0]);
		}
		if(!!_.reduce(londres_repeated,function(a, b){ return (a === b) ? a : NaN; })){
			result = _.without(result,londres_repeated[0]);
		}
		return result;
	};

	$scope.asign=function() {
		$scope.inputs=[];
		_($scope.quantity_teams).times(function(n){ 
			$scope.inputs.push({'id':n+1,'group':n+1});
			$scope.inputs.push({'id':n+1,'group':n+1}); 
		});
	};

	$scope.calculate=function(){
		$scope.result = $scope.getMembers($scope.inputs);
	};
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group.html',
    controller: 'group'
  });
});
