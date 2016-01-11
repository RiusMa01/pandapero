/*
angular.module('App').controller('RecipeCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $stateParams, Recipes, Categories, Steps, Ingredients, Glasses) {

/*
  $http.get('api/data.json').
    success(function(data, status, headers, config) {
	    $scope.categories = data.categories;
		$scope.ingredients = data.ingredients;
		$scope.steps = data.steps;
		$scope.glasses = data.glasses;
		$scope.glass = $scope.glasses[0];
		$scope.recipe = data.recipes[$stateParams.recipeId];
	}).
    error(function(data, status, headers, config) {
      // log error
  });


	$scope.categories = Categories;
	$scope.ingredients = Ingredients;
	$scope.glasses = Glasses;
	$scope.steps = Steps;
	$scope.recipe = Recipes[$stateParams.recipeId];
	$scope.glassId = 0;

    

	$scope.prevGlass = function(){
		if($scope.glassId > 0){
			$scope.glassId--;
		}
		else
		{
			$scope.glassId = 0;
		}
	};
	$scope.nextGlass = function(){
		if($scope.glassId < $scope.glasses.length-1){
			$scope.glassId++;
		}
		else
		{
			$scope.glassId = $scope.glasses.length-1;
		}
	};

});
*/

angular.module('App').controller('RecipeCtrl', function ($rootScope, $scope, $stateParams, $location, $firebaseArray, $firebaseObject, ref, Auth, Users) {
	// Get Objects
	// No need to synchronyze
	// Attach an asynchronous callback to read the data at our posts reference
	console.log($stateParams.recipeId);
	var recipeRef = ref.child("recipes").child($stateParams.recipeId);
	$scope.recipe = $firebaseObject(recipeRef);
	console.log($scope.recipe);

	$scope.recipe.$loaded(function(recipe){

	});

	Users.$loaded(function(users){
				// Set Recipe Author
		$scope.author = users.$getRecord($scope.recipe.author);
		angular.forEach($scope.recipe.comments, function(comment){
			comment.author = users.$getRecord(comment.author);
		})
	});

	$scope.start = function(){
		console.log("Redirection..");
		//Todo
	};

	Auth.$onAuth(function(authData) {
	    if (authData === null) {
	    	console.log("Not logged in yet");
	    	$scope.user = null;
	    } else {
	    	console.log("Logged in as", authData.uid);
			$scope.user = $firebaseObject(ref.child("users").child(authData.facebook.id));
	    }

	});

	$scope.redirectToAction = function(){
		console.log("Redirection to action : ", $scope.recipe.$id);
	  	$location.url('/action/' + $scope.recipe.$id);
	};

	$scope.redirectToFeedback = function(){
		console.log("Redirection to feedback : ", $scope.recipe.$id);
	  	$location.url('/feedback/' + $scope.recipe.$id);
	};
});
