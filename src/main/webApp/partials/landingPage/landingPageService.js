myModule.lazy.factory('landingPageFactory', function ($http) {

    return $http('/Servlet',{orderId:'@orderId'}, {
        getOrder : { method: 'GET', isArray : false }
    });

});
