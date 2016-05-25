require('angular');
require('angular-ui-router');
require('angular-resource');
require('ng-file-upload');
require('angular-img-cropper');
require('angular-base64-upload');
require('./../node_modules/ng-repeat-owl-carousel/src/ngRepeatOwlCarousel');
require('angular-ui-bootstrap');
require('angular-cookies');
require('jquery');
// require('angular-websocket');
 require('angular-socket-io');
// require('socket.io');
//require('angular-socket.io');
// require('jquery-ui/themes/base/minified/jquery-ui.min.css');
require('jquery-ui');
require('angular-ui-date');
// require('ui-select');
require('angular-recaptcha');
require('angular-sanitize');
require('./../node_modules/angular-ui-select/select.js');
// require('angular-ui-select');
// require('bootstrap-select');
// var meConfig = require('./config');
// var conversationsController = require('./controllers/conversationsController');
var mailController = require('./mail/mailController');
var girlsController = require('./mail/girlsController');
var usersController = require('./mail/usersController');
var girlsAllController = require('./mail/girlsAllController');
var ladyAllController = require('./mail/ladyAllController');
var mailIdController = require('./mail/mailIdController');
var formController = require('./mail/formController');
var girlsViewController = require('./mail/girlsViewController');
var chatController = require('./mail/chatController');
var searchController = require('./mail/searchController');
var contactUsController = require('./mail/contactUsController');
var favoriteController = require('./mail/favoriteController');

var cropDirective = require('./directives/crop');
var fileDirective = require('./directives/angular-file-model');
//var owlDirective = require('./directives/owl-slider');

var mailService = require('./mail/mail_service');
var userService = require('./mail/user_service');
var girlsService = require('./mail/girls_service');
var girlsAllService = require('./mail/girlsAll_service');
var mailIdService = require('./mail/mailId_service');
var formService = require('./mail/form_service');
var chatService = require('./mail/chat_service');
var searchService = require('./mail/search_service');
var contactUsService = require('./mail/contactUs_service');
var favoriteService = require('./mail/favorite_service');

var app = angular.module('app', ['ui.router', 'ngResource', 'angular-img-cropper', 'naif.base64', 'ocNgRepeat', 'btford.socket-io', 'ui.select', 'ngSanitize', 'ui.date', 'vcRecaptcha'])

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  //$rootScope.global = 'global';

  $urlRouterProvider.otherwise("/home/-ag-18-30-co-Ukraine");
  $stateProvider
    .state('index', {
        url: '/index',
        templateUrl: 'assets/angular-app/public/index.html',
        controller: usersController,
        controllerAs: 'ctrl'
    })
  //   .state('main', {
  //     url: '/main',
  //     templateUrl: 'assets/angular-app/public/conversation-list.html',
  //     controller: conversationsController,
  //     controllerAs: 'ctrl'
  //   })
    .state('man', {
      url: '/man',
      templateUrl: 'assets/angular-app/public/e-mail.html',
      controller: mailController,
      controllerAs: 'ctrl'
    })
    .state('lady', {
      url: '/lady',
      templateUrl: 'assets/angular-app/public/lady.html',
      controller: mailController,
      controllerAs: 'ctrl'
    })
    .state('girl', {
      url: '/girl/:id',
      templateUrl: 'assets/angular-app/public/profile.html',
      controller: girlsController,
      controllerAs: 'ctrl'
    })
    .state('girls', {
      url: '/girls/:id',
      templateUrl: 'assets/angular-app/public/home-logedin.html',
      controller: ladyAllController,
      controllerAs: 'ctrl'
    })
    .state('home', {
      url: '/home/:id',
      templateUrl: 'assets/angular-app/public/home.html',
      controller: girlsAllController,
      controllerAs: 'ctrl'
    })
    .state('mail', {
      url: '/mail/:id',
      templateUrl: 'assets/angular-app/public/conversation-with-the-girl.html',
      controller: mailIdController,
      controllerAs: 'ctrl'
    })
    .state('temp_photoAvatar', {
      url: '/temp_photoAvatar',
      templateUrl: 'assets/angular-app/public/form.html',
      controller: formController,
      controllerAs: 'ctrl'
    })
    .state('girlsView', {
      url: '/girlsView/:id',
      templateUrl: 'assets/angular-app/public/girls-view.html',
      controller: girlsViewController,
      controllerAs: 'ctrl'
    })
    .state('chat', {
      url: '/chat',
      templateUrl: 'assets/angular-app/public/chat.html',
      controller: chatController,
      controllerAs: 'ctrl'
    })
    .state('search', {
      url: '/search/:id',
      templateUrl: 'assets/angular-app/public/search.html',
      controller: searchController,
      controllerAs: 'ctrl'
    })
    .state('blog', {
      url: '/blog',
      templateUrl: 'assets/angular-app/public/blog.html',
      controller: formController,
      controllerAs: 'ctrl'
    })
    .state('faq', {
      url: '/faq',
      templateUrl: 'assets/angular-app/public/faq.html',
      controller: formController,
      controllerAs: 'ctrl'
    })
    .state('contact-us', {
      url: '/contact-us',
      templateUrl: 'assets/angular-app/public/contact-us.html',
      controller: contactUsController,
      controllerAs: 'ctrl'
    })
    .state('privacy-policy', {
      url: '/privacy-policy',
      templateUrl: 'assets/angular-app/public/privacy-policy.html',
      controller: formController,
      controllerAs: 'ctrl'
    })
    .state('success-stories', {
      url: '/success-stories',
      templateUrl: 'assets/angular-app/public/success-stories.html',
      controller: formController,
      controllerAs: 'ctrl'
    })
    .state('terms-conditions', {
      url: '/terms-conditions',
      templateUrl: 'assets/angular-app/public/terms-conditions.html',
      controller: formController,
      controllerAs: 'ctrl'
    })
    .state('testimonials', {
      url: '/testimonials',
      templateUrl: 'assets/angular-app/public/testimonials.html',
      controller: favoriteController,
      controllerAs: 'ctrl'
    })
    .state('men-account', {
      url: '/men-account',
      templateUrl: 'assets/angular-app/public/men-account.html',
      controller: formController,
      controllerAs: 'ctrl'
    });

    if(window.history && window.history.pushState){
      $locationProvider.html5Mode(true);
    }
})
// .controller('conversationsController', conversationsController)
.controller('usersController', ['userService', usersController])
.controller('mailController', ['mailService','userService', 'girlsService', mailController])
.controller('girlsController', ['mailService','userService', 'girlsService', girlsController])
.directive("owlCarousel", function() {
  return {
    restrict: 'E',
    transclude: false,
    link: function (scope) {
      scope.initCarousel = function(element) {

        // provide any default options you want
        var defaultOptions = {
        };
        var customOptions = scope.$eval($(element).attr('data-options'));
        // combine the two options objects
        for(var key in customOptions) {
          defaultOptions[key] = customOptions[key];
        }
        console.log('defaultOptions');
        console.log(defaultOptions);
        // init carousel
        $(element).owlCarousel(defaultOptions);
      };
    }
  };
})
.directive('owlCarouselItem', [function() {
  return {
    restrict: 'A',
    transclude: false,
    link: function(scope, element) {
    }
  };
}])
.controller('girlsAllController', ['userService', 'girlsAllService', girlsAllController])
.controller('ladyAllController', ['userService', 'girlsAllService', ladyAllController])
.controller('mailIdController', ['userService', 'mailService', 'girlsAllService', 'mailIdService', mailIdController])
.controller('formController', ['formService', 'userService', formController])
.controller('girlsViewController', ['girlsService', 'userService', girlsViewController])
.controller('chatController', ['chatService', 'userService', chatController])
.controller('searchController', ['searchService', 'userService', searchController])
.controller('contactUsController', ['contactUsService', 'userService', contactUsController])
.controller('favoriteController', ['favoriteService', 'userService', favoriteController])
.factory('userService', ['$resource', userService])
.factory('mailService', ['$resource', mailService])
.factory('girlsService', ['$resource', girlsService])
.factory('girlsAllService', ['$resource', girlsAllService])
.factory('mailIdService', ['$resource', mailIdService])
.factory('formService', ['$resource', formService])
.factory('chatService', ['socketFactory', chatService])
.factory('searchService', ['$resource', searchService])
.factory('contactUsService', ['$resource', contactUsService])
.factory('favoriteService', ['$resource', favoriteService]);
