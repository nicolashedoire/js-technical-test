// create angular app
var app = angular.module('app' , []);

app.controller('mainController', function($scope , $http , $location){

	// default values
	$scope.owner  = 'nodejs';
	$scope.repo   = 'node';
	$scope.number = '6867'; 
	$scope.url    =  'https://api.github.com/repos/' + $scope.owner + '/' + $scope.repo + '/issues/' + $scope.number;
	$scope.commentsUrl = $scope.url + '/comments';

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
    });



	// get new issues
    $scope.getIssue = function(){
    	$location.url($scope.owner + '/' + $scope.repo + '/' + $scope.number);
    	$scope.url         = 'https://api.github.com/repos/' + $scope.owner + '/' + $scope.repo + '/issues/' + $scope.number;
    	$scope.commentsUrl = $scope.url + '/comments';
		$http.get($scope.url).then(function(res){
	    	$scope.title          = res.data.title;
	    	$scope.user           = res.data.user.login;
	    	$scope.avatar         = res.data.user.avatar_url;
	    	$scope.message        = res.data.body;

	    });
	    $http.get($scope.commentsUrl).then(function(res){
    		$scope.comments = res.data;
    	});
    }
	
});