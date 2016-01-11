angular.module('App').controller("CreateCtrl", function($rootScope, $scope, $location, $firebaseObject, ref, Auth, Recipes) {

	 /*$scope.newRecipe = {
	  	"name" : "Enter recipe's name",
	  	"description" : "Add description",
	  	"steps" : {
	  		0 : {
	  			"action": "First Step",
	  			"ingredient": 0,
	  			"volume": 0
	  		}
	  	}
	  };
*/
	$scope.newRecipe = {
		"steps" : [{
			"O" : {}
		}],
		"rate" : 3,
		"nb" : 1
	};
$scope.addStep = function(){
  	var index = getLength($scope.newRecipe.steps);
  	console.log(index);
  	$scope.newRecipe.steps[index] = {};
  };

  $scope.submit = function() {
  	console.log($scope.newRecipe);
    if ($scope.newRecipe) {
      Recipes.$add($scope.newRecipe);
      $location.url('/home');
  	}
  };

	getLength = function(obj) {
    	return Object.keys(obj).length;
	};

	Auth.$onAuth(function(authData) {
	    if (authData === null) {
	    	console.log("Not logged in yet");
	    	$scope.newRecipe.author = null;
	    } else {
	    	console.log("Logged in as", authData.uid);
			$scope.newRecipe.author = authData.facebook.id;
	    }
	});
});