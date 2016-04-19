require('angular');
require('angular-ui-router');
require('angular-resource');
require('ng-file-upload');
require('angular-img-cropper');
require('angular-base64-upload');
require('./../node_modules/ng-repeat-owl-carousel/src/ngRepeatOwlCarousel');
require('angular-ui-bootstrap');
require('angular-cookies');
// require('angular-websocket');
 require('angular-socket-io');
// require('socket.io');
//require('angular-socket.io');
// require('jquery');
// require('bootstrap-select');

var conversationsController = require('./controllers/conversationsController');
var mailController = require('./mail/mailController');
var girlsController = require('./mail/girlsController');
var usersController = require('./mail/usersController');
var girlsAllController = require('./mail/girlsAllController');
var mailIdController = require('./mail/mailIdController');
var formController = require('./mail/formController');
var girlsViewController = require('./mail/girlsViewController');
var chatController = require('./mail/chatController');
var searchController = require('./mail/searchController');

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

var app = angular.module('app', ['ui.router', 'ngResource', 'angular-img-cropper', 'naif.base64', 'ocNgRepeat', 'ui.bootstrap', 'ngCookies', 'btford.socket-io'])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise("/index");
  $stateProvider
    .state('index', {
        url: '/index',
        templateUrl: 'assets/angular-app/public/index.html',
        controller: usersController,
        controllerAs: 'ctrl'
    })
    .state('main', {
      url: '/main',
      templateUrl: 'assets/angular-app/public/conversation-list.html',
      controller: conversationsController,
      controllerAs: 'ctrl'
    })
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
      controller: girlsAllController,
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
    .state('form', {
      url: '/form',
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
      controller: formController,
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
      controller: formController,
      controllerAs: 'ctrl'
    });
})
// .run(function ($rootScope, $location, User) {
//     //.run(function ($rootScope, $location) {
//     // Redirect to login if route requires auth and you're not logged in
//         $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
//           // Auth.isLoggedInAsync(function(loggedIn) {
//           //   if (toState.authenticate && !loggedIn) {
//           //         $rootScope.returnToState = toState.url;
//           //         $rootScope.returnToStateParams = toParams.Id;
//           //         $location.path('/login');
//           //     }
//           // });
//           if (toState.name == 'login'){

//           } else {
//             if(!$rootScope.current_user){
//               $rootScope.current_user = User.login();
//               $location.path('/main');
//             }
//              //Auth.isLoggedInAsync(function(loggedIn) {
//              //  if (toState.authenticate && !loggedIn) {
//               //       $rootScope.returnToState = toState.url;
//                //      $rootScope.returnToStateParams = toParams.Id;
//                //      $location.path('/login');
//                //  }
//              //});
//           }

//           console.log(toState);
//           console.log(toParams);
//         });
//    })
.controller('conversationsController', conversationsController)
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

      // wait for the last item in the ng-repeat then call init
      //if(scope.$last) {
        //scope.initCarousel(element.parent());

      // setTimeout(function(){
      var owl4 = $("#owl-demo4");

      owl4.owlCarousel({
          items : 1, //10 items above 1000px browser width
          itemsDesktop : [1000,2], //5 items between 1000px and 901px
          itemsDesktopSmall : [900,3], // betweem 900px and 601px
          itemsTablet: [600,2], //2 items between 600 and 0
          pagination:true,
          itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
      });

      // Custom Navigation Events
      $(".next").click(function(){
        owl4.trigger('owl.next');
      })
      $(".prev").click(function(){
        owl4.trigger('owl.prev');
      })
      // }, 2000);

      setTimeout(function(){
        var owl5 = $("#owl-demo5");

        owl5.owlCarousel({
            items : 4, //10 items above 1000px browser width
            itemsDesktop : [1000,2], //5 items between 1000px and 901px
            itemsDesktopSmall : [900,3], // betweem 900px and 601px
            itemsTablet: [600,2], //2 items between 600 and 0
            pagination:true,
            itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
        });

        // Custom Navigation Events
        $(".next").click(function(){
          owl5.trigger('owl.next');
        })
        $(".prev").click(function(){
          owl5.trigger('owl.prev');
        })
        //}
      }, 2000);
    }
  };
}])
.controller('girlsAllController', ['userService', 'girlsAllService', girlsAllController])
.controller('mailIdController', ['userService', 'mailService', 'girlsAllService', 'mailIdService', mailIdController])
.controller('formController', ['formService',  formController])
.controller('girlsViewController', ['girlsService', 'userService', girlsViewController])
.controller('chatController', ['chatService', chatController])
.controller('searchController', ['searchService', 'userService', searchController])
.factory('userService', ['$resource', userService])
.factory('mailService', ['$resource', mailService])
.factory('girlsService', ['$resource', girlsService])
.factory('girlsAllService', ['$resource', girlsAllService])
.factory('mailIdService', ['$resource', mailIdService])
.factory('formService', ['$resource', formService])
.factory('chatService', ['socketFactory', chatService])
.factory('searchService', ['$resource', searchService]);
