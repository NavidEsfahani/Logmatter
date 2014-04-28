
myModule.lazy.factory('HomeFactory', function ($resource) {

    return $resource('/rest/order/:orderId',{orderId:'@orderId'}, {
        getOrder : { method: 'GET', isArray : true }
    });

});

myModule.lazy.factory('TempUpdateFactory', function ($resource) {

    return $resource('/rest/version/:versionId',{versionId:'@versionId'}, {
        update : { method: 'GET', isArray : false }
    });

});

