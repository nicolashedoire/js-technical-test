// create angular app
var app = angular.module('app' , []);

app.controller('mainController', function($scope , $http , $location){

	var clientId     = 'client_id=d1942bc1c324349694c9';
	var clientSecret = '&client_secret=98ab2c8869c1828d1107affebdc865c59361d716'; 
	var params       = '?' + clientId + clientSecret;

	// default values
	$scope.owner  = 'nodejs';
	$scope.repo   = 'node';
	$scope.number = '6867'; 
	$scope.url    =  'https://api.github.com/repos/' + $scope.owner + '/' + $scope.repo + '/issues/' + $scope.number + params;
	$scope.commentsUrl = 'https://api.github.com/repos/' + $scope.owner + '/' + $scope.repo + '/issues/' + $scope.number + '/comments' + params;

	$location.url($scope.owner + '/' + $scope.repo + '/' + $scope.number);

	// link api github https://developer.github.com/v3/issues/
	$http.get($scope.url).then(function(res){
    	$scope.title          = res.data.title;
    	$scope.user           = res.data.user.login;
    	$scope.avatar         = res.data.user.avatar_url;
    	$scope.message        = res.data.body;
    });


    $http.get($scope.commentsUrl).then(function(res){
    	$scope.comments = res.data;
    	$scope.array    = [];
    	$scope.filters  = [];
      	for(var i = 0 ; i < $scope.comments.length ; i++){
	      	if($scope.array.indexOf($scope.comments[i].user.login) == -1){
	      		$scope.array.push($scope.comments[i].user.login);
	      		$scope.filters.push({'name' : $scope.comments[i].user.login , selected: true});
	      	}
      	}
      	
      	$scope.array_ = angular.copy($scope.array);
    });



	// get new issues
    $scope.getIssue = function(){
    	$location.url($scope.owner + '/' + $scope.repo + '/' + $scope.number);
    	$scope.url         = 'https://api.github.com/repos/' + $scope.owner + '/' + $scope.repo + '/issues/' + $scope.number + params;
    	$scope.commentsUrl = 'https://api.github.com/repos/' + $scope.owner + '/' + $scope.repo + '/issues/' + $scope.number  + '/comments' + params;
		$http.get($scope.url).then(function(res){
	    	$scope.title          = res.data.title;
	    	$scope.user           = res.data.user.login;
	    	$scope.avatar         = res.data.user.avatar_url;
	    	$scope.message        = res.data.body;

	    });
	    $http.get($scope.commentsUrl).then(function(res){
    		$scope.comments = res.data;
	    	$scope.array    = [];
	    	$scope.filters  = [];
	      	for(var i = 0 ; i < $scope.comments.length ; i++){
		      	if($scope.array.indexOf($scope.comments[i].user.login) == -1){
		      		$scope.array.push($scope.comments[i].user.login);
		      		$scope.filters.push({'name' : $scope.comments[i].user.login , selected: true});
		      	}
	      	}

	      	$scope.array_ = angular.copy($scope.array);
    	});
    }
	
});