// create angular app
var app = angular.module('app' , []);

app.controller('mainController', function($scope , $http){

	// default values
	$scope.owner  = 'nodejs';
	$scope.repo   = 'node';
	$scope.number = '6867'; 

	// link api github https://developer.github.com/v3/issues/
	$http.get('https://api.github.com/repos/nodejs/node/issues/6867').then(function(res){
    	$scope.title          = res.data.title;
    	$scope.user           = res.data.user.login;
    	$scope.avatar         = res.data.user.avatar_url;
    	$scope.message        = res.data.body;
    });


    $scope.getIssue = function(){
    	
    	$scope.url = 'https://api.github.com/repos/' + $scope.owner + '/' + $scope.repo + '/issues/' + $scope.number;
    	console.log($scope.url);

		$http.get($scope.url).then(function(res){
	    	$scope.title          = res.data.title;
	    	$scope.user           = res.data.user.login;
	    	$scope.avatar         = res.data.user.avatar_url;
	    	$scope.message        = res.data.body;
	    });

    }
	
});