angular.module('App', ['ionic', 'ionic.utils', 'ionic.contrib.ui.hscrollcards', 'firebase', 'ng-mfb'])

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'views/home/home.html',
      controller: 'HomeCtrl'
    })
    .state('recipe', {
      url: '/recipes/:recipeId',
      templateUrl: 'views/recipe/recipe.html',
      controller: 'RecipeCtrl'
    })
    .state('feedback', {
      url: '/feedback/:recipeId',
      templateUrl: 'views/feedback/feedback.html',
      controller: 'FeedbackCtrl'
    })
    .state('create', {
      url: '/create',
      templateUrl: 'views/create/create.html',
      controller: 'CreateCtrl'
    })
    .state('action', {
      url: '/recipes/:recipeId',
      templateUrl: 'views/action/action.html',
      controller: 'ActionCtrl'
    })
    .state('tuto', {
      url: '/tuto',
      templateUrl: 'views/tuto/tuto.html',
      controller: 'TutorialCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about/about.html',
      controller: 'AboutCtrl'
    });

  $urlRouterProvider.otherwise('/');
})

.run(function($ionicPlatform, $location, $localstorage, $rootScope, Auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log("Not logged in yet");
      $location.url('/tuto');
    } else {
      console.log("Logged in as", authData.uid);
    }
  });
  
})

.controller('NavbarCtrl', function ($scope, $ionicSideMenuDelegate) {

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
});
