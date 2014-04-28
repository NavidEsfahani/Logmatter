
myModule.lazy.controller('confirmationController', function($scope,$stateParams, $location,ConfirmationFactory)
{

    var param ={orderId:$stateParams.orderId};
    ConfirmationFactory.getOrder(param,function(result){
        
        var totalPrice=0.0;
        for (var index = 0; index <  result.productItems.length; ++index) {
            totalPrice += parseFloat(result.productItems[index].price);
        }
        $scope.orderTotalPrice = totalPrice;
        $scope.order = result;

    });
    

    
});
 