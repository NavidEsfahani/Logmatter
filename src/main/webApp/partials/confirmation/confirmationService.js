



myModule.lazy.factory('ConfirmationFactory', function ($http) {

    return $http('/rest/order/:orderId',{orderId:'@orderId'}, {
        getOrder : { method: 'GET', isArray : false }
    });

});
