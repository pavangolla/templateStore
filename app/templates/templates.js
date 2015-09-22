angular.module('templateStore.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
			when('/templates', {
				templateUrl: 'templates/templates.html',
				controller:'TemplateCtrl'
			}).
			when('/templates/:templateId', {
				templateUrl: 'templates/template-details.html',
				controller:'TemplateDetailsCtrl'
			})
}])
.controller('TemplateCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('json/templates.json').success(function(data) {
		$scope.templates = data;
	});
}])
.controller('TemplateDetailsCtrl', ['$scope', '$http', '$filter', '$routeParams',	 function($scope, $http, $filter, $routeParams) {
	var templateId = $routeParams.templateId;
	$http.get('json/templates.json').success(function(data) {
	$scope.template = $filter('filter')(data, function(d) {
		return d.id == templateId;
	})[0];
	$scope.mainImage = $scope.template.images[0].name;
	});
	$scope.setImage = function(image) {
		$scope.mainImage = image.name;
	}

}]);