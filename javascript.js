angular.module('PortalApp')

.controller('widgetCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

    // SETUP

    // Widget Configuration
    $scope.portalHelpers.config = {
        "title": "Clubs Widget",
        "icon": "icon-bell"
    };

    // Initialize input variable
    $scope.insertValue = { value: "" };

    // Show loading message in the first column
    $scope.portalHelpers.showView('loading.html', 1);

    // Show loading animation
    $scope.portalHelpers.toggleLoading(true);

    // DATABASE EXAMPLE

    $scope.getDbData = function () {
        $scope.portalHelpers.invokeServerFunction('getData').then(function (result) {
            $scope.dbData = result;
        });
    }

        $scope.getsearchDbData = function () {
        $scope.portalHelpers.invokeServerFunction('getSearchData').then(function (result) {
            $scope.searchdbData = result;
        });
    }
    
    // Try to get test data from the database
    $scope.getDbData();
  
    // Try to get search data from the database
    $scope.getsearchDbData();

    // Create table
    $scope.createTable = function () {
        $scope.portalHelpers.invokeServerFunction('createTable').then(function (result) {
            $scope.getDbData();
        });
    }
  
      // Search for a club name
    $scope.searchData = function () {
        if ($scope.insertValue.value.length > 50)
            alert('value should be less than 50 characters');
        else {
            $scope.portalHelpers.invokeServerFunction('search', { value: $scope.insertValue.value }).then(function (result) {
                $scope.searchdbData = result;
              console.log("result is");
              console.log(result);
            });
        }
    };
  
    // DETAILS VIEW EXAMPLE
    $scope.showView = function (item) {
        $scope.item = item;
        $scope.portalHelpers.showView('details.html', 2);
     }

    $scope.showSearchView = function () {
       $scope.portalHelpers.showView('searchView.html', 4);
     }

    $scope.showSignUp = function (name) {
        $scope.name = name;
        $scope.portalHelpers.showView('signup.html', 2);
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