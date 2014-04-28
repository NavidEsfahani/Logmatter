
myModule.lazy.controller('productController', function($scope,$rootScope, $cookieStore,$location,$cookieStore,$stateParams,ProductFactory)
{
    $scope.loadingDone=false;

    ProductFactory.getAllProducts(function(result){
        if($stateParams.tempId){
            $rootScope.selectedIdsArray = $cookieStore.get('tempOrder');
        }
        if($rootScope.selectedIdsArray){
            for (var index = 0; index <  result.length; ++index) {
                if($rootScope.selectedIdsArray.indexOf(result[index].productId)>-1){
                    result[index].selected=true;
                }
            }
        }
        $scope.products = result;
        $scope.loadingDone=true;
    });
    
    
    $scope.reviewOrder = function(){
        
        var selectedProducts=[];
        var total=0;
        var selectedIds="";
        var selectedIdsArray=[];
        for (var index = 0; index <  $scope.products.length; ++index) {
            
            if($scope.products[index].selected){
                selectedProducts.push($scope.products[index]);
                total += $scope.products[index].price;
                selectedIds += $scope.products[index].productId + ",";
                selectedIdsArray.push($scope.products[index].productId);
            }
        }

        $rootScope.selectedProducts = selectedProducts;
        $rootScope.totalOrderValue = total;
        $rootScope.selectedIds = selectedIds;
        $rootScope.selectedIdsArray = selectedIdsArray;

        saveTempOrder();

        if(selectedIdsArray.length>0){
           $location.path("/order");
        }
    }

    function saveTempOrder(){
        $rootScope.tempId = 'id' + (new Date()).getTime();
        $cookieStore.put('tempOrder',$rootScope.selectedIdsArray);
        $cookieStore.put('tempId',$scope.tempId);

    }
    
});
 