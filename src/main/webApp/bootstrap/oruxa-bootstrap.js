/*!
 * oruxa-directives - v1.0.0 - 2014-04-15
 *
 * Copyright (c) 2014 ; Licensed MIT
 * By Navid Esfahani - ORUXA inc.
 */


var oruxaDirectives = angular.module('oruxaDirectives', ['ng']);

//i18n Directive #######################################################################################################
var dictionaries={};
oruxaDirectives.directive('msg', function($i18n,$http,$q,$timeout) {

    return {
        restrict: 'E',
        compile: function (element, attrs, transclude){
            var result;
            if ($i18n.getDefaultLocale()===$i18n.getLocale()){
                result = element.html();
            } else{
                var key = element.html().hashCode();

                var dic = attrs.dic;
                if(key==null || key==""){
                    console.error("key is required for translating '" + element.html()+"'");
                    element.html("i18n-Err");
                    return;
                }

                if(dictionaries[dic]==null){
                    dic="general";
                }

                var data=dictionaries[dic];
                if(data[key]==null){
                    console.error("Key translation can not be found for '" + key + "'");
                    return;
                }

                result = data[key];

            }

            var i=0;
            var params = [];
            while(true) {
                if(attrs["param"+i]!=null){
                    params[i]=attrs["param"+i];
                    i++;
                }
                break;
            }

            element.html(result.replaceParam(params));

        }
    };
});


oruxaDirectives.provider('$i18n',function (){
    this.defaultLocale = 'en_US';
    this.currentLocale = this.defaultLocale;


    this.$get = function (){
        var currentLocale = this.currentLocale;
        var defaultLocale = this.defaultLocale;
        return {
            getLocale: function() {
                return currentLocale;
            },
            getDefaultLocale: function() {
                return defaultLocale;
            },
            isDefaultLocaleInUsed: function() {
                return (defaultLocale==currentLocale);
            }
        }
    };

    this.setDefaultLocale = function(value) {
        this.defaultLocale = value;
    };
    this.useLocale = function(value) {
        this.currentLocale = value;
    };
});


oruxaDirectives.service('i18nService',  function () {
    return function (key, dic,param) {

        if(typeof dic !== null){
            if (typeof dic[key] != 'undefined' && dic[key] != '') {
                return (typeof param === "undefined") ?
                    dic[key] : dic[key].replace('@{}@', param);
            }
        }

    };
});


//tooltip Directive #######################################################################################################
window.validationPopup="<div id='validationPopup' class='tooltip  bottom-right fade' style='top: 0px; left: 0px; display: block;'><div class='tooltip-arrow'></div><div class='tooltip-inner'>{0}</div></div>";

oruxaDirectives.directive('hasValidationPopup',function($document){
    return {
        restrict: 'A',
        require:'ngModel',

        link: function(scope,element,attrs,ctrl){


            var startPopup=false;

            element.bind("mouseenter focus",function(){
                if(startPopup){
                    var msg='Value is not correct!'; //default msg
                    for (var err in ctrl.$error){
                        if (ctrl.$error[err]){
                            msg=attrs[err+"Msg"];
                            break;
                        }
                    }
                    showValidationPopup(ctrl.$invalid,msg);
                }
            });
            element.bind("mouseleave",function(){
                showValidationPopup(false);
            });
            element.bind("blur",function(){
                startPopup=true;
                showValidationPopup(false);
            });
            element.bind("keydown keypress",function(){
                showValidationPopup(false);
            });


            var popup = $("body > #validationPopup");
            if(!popup.length) {
                $($document[0].body).append(window.validationPopup);
                popup = $("body > #validationPopup");
            }
            var showValidationPopup = function(val,msg){

                if(val){
                    popup.get()[0].innerHTML = popup.get()[0].innerHTML.replaceParam([msg]);
                    popup.css({ top: element[0].getBoundingClientRect().top + element[0].getBoundingClientRect().height });
                    popup.css({ left: element[0].getBoundingClientRect().left +
                        element[0].getBoundingClientRect().width -
                        popup.get()[0].getBoundingClientRect().width });

                    popup.addClass('in');
                }
                else {
                    popup.removeClass('in');
                }

            };


        }
    };
});


//popup Directive #######################################################################################################
//<input my-popup popup-place='left' show-popup>

oruxaDirectives.directive('myPopup',function(){
    return {
        restrict: 'A',
//        replace:true,
//        template: "<div>{0}<div class='popup'>{1}</div></div>",
        link: function(scope,element,attrs){
            var template =$("<div class='popover left fade' style='top: 100px; left: 100px; display: block;'><div class='arrow'></div><div class='popover-content'>sdsdsdsdasda dad adasdasa</div></div>");


            if(attrs.popupPlace==null) {
                attrs.popupPlace='left';
            }



            $(element[0]).parent().append(template);


            if(attrs.popupPlace=="left"){
                template.addClass("left");
                template.css({ top: 0});
                template.css({ left: -template[0].getBoundingClientRect().width-12});

            }
            attrs.$observe('showPopup',function(val){
                if(val=='true') template.addClass("in");
                else template.removeClass("in");
            });
//            element.html=this.template.replaceParam([element.innerHTML]);
          //  element[0]="Navid";

        }

    };
});



//modal dialog Directive #######################################################################################################
oruxaDirectives.directive('myDialog',function(){
    return {
        restrict: 'E',
        scope: {
            show: '=',
            onOkay: '=?',
            onCancel: '=?',
            onYes: '=?',
            onNo: '=?',
            onIgnore: '=?'
        },
        replace: true,
        transclude: true,

        link: function(scope, element, attrs) {


            if (attrs.onOkay!=null) scope.hasOkay=true;
            if (scope.onCancel!=null) scope.hasCancel=true;
            if (scope.onYes!=null) scope.hasYes=true;
            if (scope.onNo!=null) scope.hasNo=true;
            if (scope.onIgnore!=null) scope.hasIgnore=true;

            scope.okClick = function(){
                if(scope.onOkay!=null) scope.onOkay();
                scope.hideModal();

            }
            scope.cancelClick = function(){
                if(scope.onCancel!=null) scope.onCancel();
                scope.hideModal();

            }
            scope.yesClick = function(){
                if(scope.onYes!=null) scope.onYes();
                scope.hideModal();

            }
            scope.noClick = function(){
                if(scope.onNo!=null) scope.onNo();
                scope.hideModal();

            }
            scope.ignoreClick = function(){
                if(scope.onIgnore!=null) scope.onIgnore();
                scope.hideModal();

            }


            //default is true
            scope.modal=true;
            if(!attrs.modal=='false'){
                scope.modal=false;
            }

            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;


            scope.ovarlayClicked = function(){
                if(!scope.modal){
                    scope.show = false;
                }
            }
            scope.hideModal = function(){

                scope.show = false;

            }

            scope.$watch("show",function(val){
                if(val){
                    element.addClass('in');
                }
            });


        },
        template:
            "<div class='my-modal fade' ng-show='show'>" +
                "<div class='my-modal-overlay' ng-click='ovarlayClicked()'></div>" +
                "<div class='my-modal-dialog' ng-style='dialogStyle'>" +
                    "<div class='my-modal-dialog-content' >" +
                        "<div class='full-height' ng-transclude></div>" +
                        "<div class='my-modal-content-footer'>" +
                            "<button class='btn btn-default width-100px' ng-click='okClick()' ng-show='hasOkay'><msg dic='general'>Ok</msg></button>" +
                            "<button class='btn btn-default width-100px' ng-click='cancelClick()' ng-show='hasCancel'><msg dic='general'>Cancel</msg></button>" +
                            "<button class='btn btn-default width-100px' ng-click='yesClick()' ng-show='hasYes'><msg dic='general'>Yes</msg></button>" +
                            "<button class='btn btn-default width-100px' ng-click='noClick()' ng-show='hasNo'><msg dic='general'>No</msg></button>" +
                            "<button class='btn btn-default width-100px' ng-click='ignoreClick()' ng-show='hasIgnore'><msg dic='general'>Ignore</msg></button>" +
                        "</div>" +
                    "</div>" +


                "</div>" +
            "</div>'"
    }
});

