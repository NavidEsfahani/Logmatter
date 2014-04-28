myModule.lazy.controller('orderController', function($scope,$rootScope,$cookieStore)
{

    $scope.submitClick = function () {
        $rootScope.tempId = null;
        $cookieStore.put('tempOrder',null);
        $cookieStore.put('tempId',null);
    }
});
 