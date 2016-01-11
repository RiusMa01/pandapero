angular.module('App').controller('TutorialCtrl', function ($scope, $location, $ionicPopup, ref, Auth, Users) {


  $scope.login = function() {
    Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
      // User successfully logged in
      addUser(authData);
      $location.url('/');
    }).catch(function(error) {
      if (error.code === "TRANSPORT_UNAVAILABLE") {
        Auth.$authWithOAuthPopup("facebook").then(function(authData) {
          // User successfully logged in. We can log to the console
          // since we’re using a popup here
          addUser(authData);
          console.log(authData);
          $location.url('/');
        });
      } else {
        // Another error occurred
        console.log(error);
      }
    });
  };

  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log("Not logged in yet");
    } else {
      console.log("Logged in as", authData.uid);
      addUser(authData);
    }
    $scope.authData = authData; // This will display the user's name in our view
  });

  addUser = function(authData){
    var usersRef = ref.child("users");
    console.log("indexFor: ", Users.$indexFor(authData.facebook.id));
    if(Users.$indexFor(authData.facebook.id) == -1){
      console.log("Add user: ", authData.facebook.id);
      usersRef.child(authData.facebook.id).set({
        "nickname" : authData.facebook.displayName,
        "facebook": authData.facebook
      });  
    }
  };


});
