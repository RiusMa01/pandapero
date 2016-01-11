angular.module('App').controller('AboutCtrl', function ($rootScope, $scope, ref, Users) {
	var usersRef = ref.child("users");
	
	console.log("Uid : " + $rootScope.uid);
	
	if($rootScope.uid == null)
	{
		$rootScope.uid = 0;
	}
	// Attach an asynchronous callback to read the data at our posts reference
	usersRef.child($rootScope.uid).on("value", function(snapshot) {
	  console.log(snapshot.val());
	  $scope.user = snapshot.val();
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

});