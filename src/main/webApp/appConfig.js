
var myModule = angular.module('myApp',[
    'ngAnimate',
    'ui.router',
    'ngResource',
    'ngCookies',
    'oruxaDirectives']);

myModule.config(function (
    $stateProvider,
    $controllerProvider,
    $compileProvider,
    $filterProvider,
    $animateProvider,
    $provide,
    $urlRouterProvider,
    $httpProvider,
    $i18nProvider
    ) {


    myModule.lazy = {
        controller: $controllerProvider.register,
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service,
        animation: $animateProvider.register
    };


    for (var i = 0; i < states.length; i++) {
        $stateProvider.state(states[i]);
    }
    $urlRouterProvider.otherwise('/');
//    $i18nProvider.useLocale("fr_CA");



    $httpProvider.defaults.transformRequest.push(function(data, headers) {
      // alert("1");

        // retrieve the injector instance for the PdfCutter module
        var injector = angular.injector(['ng','ngCookies']);

//        // attach the correct django CSRF Token for each ajax query
        if (injector.get('$cookies')['csrftoken']) {
            headers()['X-CSRFTOKEN'] = injector.get('$cookies')['csrftoken'];
        }
        return data;
    });


//    $httpProvider.defaults.transformResponse.push(function(data, headers) {
//
////        alert(headers.common['XSRF-fromserver']);
//
//        alert(headers()["foo"]);
//       // for(var i in headers){
//       //     alert(i);
//       // }
//
//        return data;
//    });

});




