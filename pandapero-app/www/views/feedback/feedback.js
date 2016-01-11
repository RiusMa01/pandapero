angular.module('App').controller('FeedbackCtrl', function ($rootScope, $scope, $location, $stateParams, $firebaseArray, $firebaseObject, ref, Auth, Users) {
	$scope.comment = {};

	console.log($stateParams.recipeId);
	var recipeRef = ref.child("recipes").child($stateParams.recipeId);
	$scope.recipe = $firebaseObject(recipeRef);
	$scope.comments = $firebaseArray(recipeRef.child("comments"));
	console.log($scope.recipe);

	Auth.$onAuth(function(authData) {
	    if (authData === null) {
	    	console.log("Not logged in yet");
	    	$scope.user = null;
	    } else {
	    	console.log("Logged in as", authData.uid);
			$scope.comment.author = authData.facebook.id;
	    }

	});

	$scope.sendComments = function(){
		$scope.comments.$add($scope.comment);
		if($scope.recipe.hasOwnProperty("rate")){
			console.log("recipe has rate");
			$scope.recipe.rate = ($scope.recipe.rate*$scope.recipe.nb+parseInt($scope.comment.rate))/($scope.recipe.nb+1);
			console.log($scope.recipe.rate);
			$scope.recipe.nb++;
			$scope.recipe.$save();
		}
		$location.url("/recipes/" + $stateParams.recipeId);
	};
});