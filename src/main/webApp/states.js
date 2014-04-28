function resolver(q,i18n,dictionaries,dependencies) {
    if(!i18n.isDefaultLocaleInUsed() && dictionaries!=null && dictionaries.length>0){
        for (var dic in dictionaries){
           dependencies.push("dictionaries/"+dictionaries[dic]+"_"+i18n.getLocale());
        }
    }

    var deferred = q.defer();

    require(dependencies, function()
    {
        // rootScope.$apply(function()
        // {
        deferred.resolve();
        //  });
    });

    return deferred.promise;
}



var states=
[
    {
        name: 'landingPage',
        url: '/',
        templateUrl: 'partials/landingPage/landingPage.html',
        resolve:{load:function($q, $i18n){
            return resolver ($q,$i18n,['landingPage','general'],
                [
                    'partials/landingPage/landingPageController.js',
                    'partials/landingPage/landingPageService.js'
                ]);
        }
        }
    },
    {
        name: 'a',
        templateUrl: 'partials/application/application.html',
        resolve:{load:function($q, $i18n){
            return resolver ($q,$i18n,'',
                [
                    'partials/application/applicationController.js',
                    'partials/application/applicationService.js'

                ]);
        }
        }
    },

    {
        name: 'a.defaultDash',
        url: '/defaultDash',
        templateUrl: 'partials/dashBoards/defaultDash/defaultDash.html',
        resolve:{load:function($q, $i18n){
            return resolver ($q,$i18n,[],
                [
                    'partials/dashBoards/defaultDash/defaultDashController.js',
                    'partials/dashBoards/defaultDash/defaultDashService.js',

                ]);
        }
        }
    }

];


