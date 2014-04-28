



myModule.lazy.factory('ProductFactory', function ($resource) {
    
    return $resource('/rest/product',{}, {
        getAllProducts : { method: 'GET', isArray : true }
    });

});
