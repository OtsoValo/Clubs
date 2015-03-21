angular.module('PortalApp')

.controller('widgetCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

    // SETUP

    // Widget Configuration
    $scope.portalHelpers.config = {
        "title": "Clubs Widget",
        "icon": "icon-bell"
    };
  
  	$scope.insertClub = { name: "", description: "", calendarLink: "" };

    // Show loading message in the first column
    $scope.portalHelpers.showView('loading.html', 1);

    // Show loading animation
    $scope.portalHelpers.toggleLoading(true);

    $scope.getNewClubData = function () {
        $scope.portalHelpers.invokeServerFunction('getCreatedClubData').then(function (result) {
            $scope.createdClubData = result;
        });
    }

  	// Insert a new Club into the database
    $scope.insertClubData = function () {
      //	console.log($scope.insertClub.name);
        if ($scope.insertClub.name.length > 50)
            alert('value should be less than 50 characters');
        else {
            $scope.portalHelpers.invokeServerFunction('insertClub', { name: $scope.insertClub.name, description: $scope.insertClub.description, calendarLink: $scope.insertClub.calendarLink }).then(function (result) {
              	console.log("result" + result);
                $scope.createdClubData = result;
            });
        }
    };

    // DETAILS VIEW EXAMPLE
    $scope.showView2 = function () {
        $scope.portalHelpers.showView('view2.html', 2);
    }

    $scope.showView3 = function () {
        $scope.portalHelpers.showView('view3.html', 3);
    }

    // PORTAL DATA SOURCE EXAMPLE

    // Get data for the widget
    $http.get('/ImportantLinks/JSONSource').success(function (data) {
        // Make data available in the scope
        $scope.links = data;
        // Turn off loading animation
        $scope.portalHelpers.toggleLoading(false);
        // Show main view
        $scope.portalHelpers.showView('main.html', 1);
    });

    // OPEN API EXAMPLE
    $scope.portalHelpers.invokeServerFunction('getOpenData').then(function (result) {
        $scope.openDataExampleData = result;
    });


}])
// Custom directive example
.directive('DirectiveName', ['$http', function ($http) {
    return {
        link: function (scope, el, attrs) {

        }
    };
}])
// Custom filter example
.filter('FilterName', function () {
    return function (input, arg1, arg2) {
        var output = input;
        return output;
    }
});