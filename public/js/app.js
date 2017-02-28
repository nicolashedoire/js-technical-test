// create angular app
var app = angular.module('app' , []);

app.controller('mainController', function($scope , $http , $location){

	var clientId     = 'client_id=d1942bc1c324349694c9';
	var clientSecret = '&client_secret=98ab2c8869c1828d1107affebdc865c59361d716'; 
	var params       = '?' + clientId + clientSecret;
	var users = [];

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
    	$scope.comments  = res.data;
    	$scope.comments_ = angular.copy($scope.comments);
    	$scope.array     = [];
    	$scope.filters   = [];

      	// ajout du nombre de mots par message
      	for(var i = 0; i < $scope.comments.length ; i++){
      		$scope.comments[i].bodyLength = $scope.comments[i].body.split(' ').length;
      		if(users.map(function(e) { return e.name; }).indexOf($scope.comments[i].user.login) == -1){
      			// on push le nombre d'utilisateur si il n'y osnt pas déjà dans users
      			users.push({name : $scope.comments[i].user.login , y : $scope.comments[i].bodyLength});
      		}else{
      			users.map(function(e) {
      				if(e.name === $scope.comments[i].user.login){
      					// on update le nombre de mots
      					e.y =  parseInt(e.y) + parseInt($scope.comments[i].bodyLength);
      				};
      			});
      		}
      	}

      	for(var i = 0 ; i < $scope.comments.length ; i++){
	      	if($scope.array.indexOf($scope.comments[i].user.login) == -1){
	      		$scope.array.push($scope.comments[i].user.login);
	      		$scope.filters.push({'name' : $scope.comments[i].user.login , selected: true});
	      	}
      	}

      	$scope.array_ = angular.copy($scope.array);


      	/// create chart
		Highcharts.chart('container', {
		    chart: {
		        type: 'pie',
		        animation: {
              			duration: 1000
           		}
		    },
		    title: {
		        text: 'Qui est le plus bavard ?'
		    },
		 	credits: {
		      enabled: false
		  	},
		    plotOptions: {
		        series: {
		            dataLabels: {
		                enabled: true,
		                format: '{point.name}: {point.y:.0f}'
		            }
		        }
		    },
		    tooltip: {
		        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> words<br/>'
		    },
		    series: [{
		        name: 'User',
		        colorByPoint: true,
		        data: users
		    }]
		});
    });



	// get new issues
    $scope.getIssue = function(){
    	// reset users array
    	users = [];

    	// construct different url
    	$location.url($scope.owner + '/' + $scope.repo + '/' + $scope.number);
    	$scope.url         = 'https://api.github.com/repos/' + $scope.owner + '/' + $scope.repo + '/issues/' + $scope.number + params;
    	$scope.commentsUrl = 'https://api.github.com/repos/' + $scope.owner + '/' + $scope.repo + '/issues/' + $scope.number  + '/comments' + params;

    	// get title body and avatar
		$http.get($scope.url).then(function(res){
	    	$scope.title          = res.data.title;
	    	$scope.user           = res.data.user.login;
	    	$scope.avatar         = res.data.user.avatar_url;
	    	$scope.message        = res.data.body;

	    });

	    // get comments
	    $http.get($scope.commentsUrl).then(function(res){
    	$scope.comments  = res.data;
    	$scope.comments_ = angular.copy($scope.comments);
    	$scope.array     = [];
    	$scope.filters   = [];

      	// ajout du nombre de mots par message
      	for(var i = 0; i < $scope.comments.length ; i++){
      		$scope.comments[i].bodyLength = $scope.comments[i].body.split(' ').length;
      		if(users.map(function(e) { return e.name; }).indexOf($scope.comments[i].user.login) == -1){
      			// on push le nombre d'utilisateur si il n'y osnt pas déjà dans users
      			users.push({name : $scope.comments[i].user.login , y : $scope.comments[i].bodyLength});
      		}else{
      			users.map(function(e) {
      				if(e.name === $scope.comments[i].user.login){
      					// on update le nombre de mots
      					e.y =  parseInt(e.y) + parseInt($scope.comments[i].bodyLength);
      				};
      			});
      		}
      	}

      	for(var i = 0 ; i < $scope.comments.length ; i++){
	      	if($scope.array.indexOf($scope.comments[i].user.login) == -1){
	      		$scope.array.push($scope.comments[i].user.login);
	      		$scope.filters.push({'name' : $scope.comments[i].user.login , selected: true});
	      	}
      	}

      	$scope.array_ = angular.copy($scope.array);


      	/// create chart
		Highcharts.chart('container', {
		    chart: {
		        type: 'pie',
		        animation: {
              			duration: 1000
           		}
		    },
		    title: {
		        text: 'Qui est le plus bavard ?'
		    },
		 	credits: {
		      enabled: false
		  	},
		    plotOptions: {
		        series: {
		            dataLabels: {
		                enabled: true,
		                format: '{point.name}: {point.y:.0f}'
		            }
		        }
		    },
		    tooltip: {
		        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> words<br/>'
		    },
		    series: [{
		        name: 'User',
		        colorByPoint: true,
		        data: users
		    }]
		});
    	});
    }

    // update comments list
	$scope.updateList = function() {
		var selectedUsers = [] , items = [] , comments = [];
		$scope.selectedList = $scope.filters.filter(function(item) {
			var name = item.name;
			if(item.selected){
				items.push(name);
				$scope.array.map(function(e) {
		      		if(e.name === name){
		      			selectedUsers.push(e);
		      		}
		      	});
				return item.selected;
			}
		});

		// update comments
		$scope.comments = $scope.comments_.filter(function(item){
			   	if(items.indexOf(item.user.login) != -1){
			   		comments.push(items);
			   		return item;
				}
			});
		};
});