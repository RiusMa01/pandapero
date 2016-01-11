angular.module('ionic.utils', [])
.factory("ref", function() {
  return new Firebase("https://dazzling-torch-8341.firebaseio.com/");
})

.factory("Auth", function($firebaseAuth) {
  var ref = new Firebase("https://dazzling-torch-8341.firebaseio.com/users");
  return $firebaseAuth(ref);
})

.factory('Datas', function($firebaseObject){
  var ref = new Firebase("https://dazzling-torch-8341.firebaseio.com/datas");
  return $firebaseObject(ref);
})

.factory("Recipes", function($firebaseArray) {
  var ref = new Firebase("https://dazzling-torch-8341.firebaseio.com/recipes");
  return $firebaseArray(ref);
})

.factory("Users", function($firebaseArray) {
  var ref = new Firebase("https://dazzling-torch-8341.firebaseio.com/users");
  return $firebaseArray(ref);
})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);