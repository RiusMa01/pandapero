angular.module('App').controller('ActionCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $stateParams, $location, Categories, Ingredients, Steps, Glasses, Recipes) {

  	var activeStep = 0;

  /*$http.get('api/data.json').
    success(function(data, status, headers, config) {
	    $scope.categories = data.categories;
		$scope.ingredients = data.ingredients;
		$scope.steps = data.steps;
		$scope.glass = data.glasses[$stateParams.glassId];
		$scope.recipe = data.recipes[$stateParams.recipeId];

	  	$scope.steps[$scope.recipe.steps[activeStep]].show = "show";
	}).
    error(function(data, status, headers, config) {
      // log error
  });*/

	$scope.categories = Categories;
	$scope.ingredients = Ingredients;
	$scope.steps = Steps;
	$scope.glass = Glasses[$stateParams.glassId];
	$scope.recipe = Recipes[$stateParams.recipeId];

    $scope.fill_level = 0;

	var startimg="img/glass/vecto/5.png";
	$scope.image=startimg;

	var canvas = document.getElementById('tempCanvas');
	var context = canvas.getContext('2d');

	$scope.drawGlass = function(){
		//$scope.fill_level  = fill_level;
		var source = new Image();
		source.src = startimg;
		canvas.width = source.width;
		canvas.height = source.height;

		//img source
		context.drawImage(source,0,0);
		//clip the mask
		context.globalCompositeOperation = 'source-atop';
		//context.clip();
		//draw bg rect
		context.fillStyle = 'black';
		context.fillRect(0,canvas.height-$scope.fill_level,canvas.width,canvas.height);
		
		context.fill();

		var imgURI = canvas.toDataURL();
		$timeout( function(){
			$scope.image = imgURI;
		}, 200);

	};



  $scope.nextStep = function(){
  	
	$scope.fill_level += $scope.steps[$scope.recipe.steps[activeStep]].appValue;
	$scope.drawGlass();

  	if(activeStep < $scope.recipe.steps.length-1)
  	{
	  	$scope.steps[$scope.recipe.steps[activeStep]].show = "";
	  	activeStep++;
	  	$scope.steps[$scope.recipe.steps[activeStep]].show = "show";
	}else{
		$scope.finish();
	}


  };

  $scope.previousStep = function(){

  	$scope.fill_level -= $scope.steps[$scope.recipe.steps[activeStep]].appValue;
	$scope.drawGlass();

  	if(activeStep > 0)
  	{
	  	$scope.steps[$scope.recipe.steps[activeStep]].show = "";
	  	activeStep--;
	  	$scope.steps[$scope.recipe.steps[activeStep]].show = "show";
	}

  };

  $scope.finish = function(){
  	$ionicPopup.prompt({
      title: 'Congrats !',
      inputPlaceholder: 'Enter a number [0-5]',
      okText: 'Validate'
    }).then(function (rate) {
      localStorage.setItem('firstVisit', '1');
      $location.url('/');
      //set new rate
      // TODO
      //increment popularity
      // TODO
    });
  };

});