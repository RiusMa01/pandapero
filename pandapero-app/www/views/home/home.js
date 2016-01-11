/*
angular.module('App').controller('HomeCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, Recipes, Categories, Ingredients, Auth) {

  $http.get('api/data.json').
    success(function(data, status, headers, config) {
	    $scope.categories = data.categories;
		$scope.ingredients = data.ingredients;
		$scope.steps = data.steps;
		$scope.recipes = data.recipes;
	}).
    error(function(data, status, headers, config) {
      // log error
  });

	$scope.categories = Categories;
	$scope.ingredients = Ingredients;
	$scope.recipes = Recipes;
	

  $scope.order = 'rating';
  $scope.setOrderBy = function(order){
  	$scope.order =  order;
  };

  $scope.shuffleArray = function() {
	  var m = $scope.recipes.length, t, i;

	  // While there remain elements to shuffle
	  while (m) {
	    // Pick a remaining element…
	    i = Math.floor(Math.random() * m--);

	    // And swap it with the current element.
	    t = $scope.recipes[m];
	    $scope.recipes[m] = $scope.recipes[i];
	    $scope.recipes[i] = t;
	  }
	  $scope.order = "";
  };

  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log("Not logged in yet");
    } else {
      console.log("Logged in as", authData.uid);
    }
    $scope.authData = authData; // This will display the user's name in our view
  });

  
});
*/

angular.module('App').controller('HomeCtrl', function ($rootScope, $scope, $location, $firebaseArray, $firebaseObject, ref, Auth, Datas, Users, Recipes) {

	//$scope.recipes = Recipes;
	$scope.datas = Datas;
	console.log("Datas : ", $scope.datas);

	// Initialize Cards Recipes
	Recipes.$loaded(function(recipes){
		$scope.recipes = recipes;
		console.log("Recipes : ", $scope.recipes);

		$scope.randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
		console.log("Random recipe", $scope.randomRecipe);

		
		$scope.lastAdded = recipes.$getRecord(Datas.last_added);
		console.log("Last added", $scope.lastAdded);

		if($scope.user){
			if($scope.user.hasOwnProperty('last_prep')){
				$scope.lastPrep = recipes.$getRecord($scope.user.last_prep);
				console.log("Last prep", $scope.lastPrep);	
			}
		}

		
	});

	/*
	$scope.nextRandomRecipe = function(){
		$scope.randomRecipe = Recipes[Math.floor(Math.random() * Recipes.length)];
	};

	$scope.order = 'rating';
	$scope.setOrderBy = function(order){
		$scope.order =  order;
	};

  $scope.shuffleArray = function() {
	  var m = $scope.recipes.length, t, i;

	  // While there remain elements to shuffle
	  while (m) {
	    // Pick a remaining element…
	    i = Math.floor(Math.random() * m--);

	    // And swap it with the current element.
	    t = $scope.recipes[m];
	    $scope.recipes[m] = $scope.recipes[i];
	    $scope.recipes[i] = t;
	  }
	  $scope.order = "";
  };
  */

  Auth.$onAuth(function(authData) {
    if (authData === null) {
    	console.log("Not logged in yet");
    	$scope.user = null;
    } else {
    	console.log("Logged in as", authData.uid);
		$scope.user = $firebaseObject(ref.child("users").child(authData.facebook.id));
    }

  });

  $scope.redirectToCreate = function(){
  	$location.url('/create');
  }
  
});
