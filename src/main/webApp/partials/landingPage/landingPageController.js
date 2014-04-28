
myModule.lazy.controller('landingPageController', function($scope,$timeout) {

    $scope.submitForm= function() {
        $scope.usernamePopup="false";
        if(!$scope.regForm.$valid){
            //$scope.$apply( function() {
                $scope.usernamePopup=true;
            //});
        }
    }



});


