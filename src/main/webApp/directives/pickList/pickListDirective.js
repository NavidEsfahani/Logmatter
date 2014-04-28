
myModule.lazy.directive('pickList', function() {

    return {
        restrict: 'E',
        scope: {
            name: '='
        },
        transclude: true,
        templateUrl: 'directives/pickList/pickListTemplate.html',
        link: function (scope, element, attrs){

        }

    };
});