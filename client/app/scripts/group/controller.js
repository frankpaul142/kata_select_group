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
		var groupedByCount = _(groups).countBy(function(item) {
			return item.id;
		});
		var all_equals = _reduce(groupedByCount);
		var grouped = _(groups).groupBy('group');

		if(all_equals && groups.length !== Object.keys(groupedByCount).length) {
      return when_all_equals(groupedByCount);
		}

		if(all_equals && groups.length === Object.keys(groupedByCount).length){
			return when_all_distincts(grouped);
		}
    return when_other_case(result,groupedByCount,grouped,to_commute,estocolmo_repeated,londres_repeated);

	};

  function  when_all_equals(groupedByCount){
    _(groupedByCount).each(function(value,key){ 
          result.push(key);   
    });

    result = _.sortBy(result, function(num) {
      return num;
    });
      
      return result.slice(0, Object.keys(groupedByCount).length/2);
  }

  function when_all_distincts(grouped){
    return _(grouped).chain()
    .map(function(value){
      return value[0].id;     
    })
    .sort()
    .value();
  }

  function when_other_case(result,groupedByCount,grouped,to_commute,estocolmo_repeated,londres_repeated){
    result= _(groupedByCount).chain()
    .map(function(value, key) {
      if(value>1){
        return key;
      }
    })
    .compact()
    .value();

    _(grouped).each(function(value){ 
      if(_(result).contains(value[0].id) || _(result).contains(value[1].id)){
        return;
      }
      result.push(value[0].id);       
    });

    result = _(result).sortBy(function(num) {
      return num;
    });

    _(grouped).each(function(value,key){
      if(_(result).contains(value[0].id) && _(result).contains(value[1].id)){
        to_commute.push(key);
      }
    });

    _(to_commute).each(function(value){
      estocolmo_repeated.push(grouped[value][0].id);
      londres_repeated.push(grouped[value][1].id);
    });
    if(_reduce(estocolmo_repeated)){
      result = _.without(result,estocolmo_repeated[0]);
    }
    if(_reduce(londres_repeated)){
      result = _.without(result,londres_repeated[0]);
    }
    return result;
  }

  function _reduce(data){
    return !!_(data).reduce(function(a, b){
      return (a === b) ? a : NaN;
    });
  }

	$scope.asign=function() {
		$scope.inputs=[];
		_($scope.quantity_teams).times(function(n){ 
			$scope.inputs.push({id: n + 1, group: n + 1});
			$scope.inputs.push({id: n + 1, group: n + 1}); 
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
