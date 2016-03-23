require('angular');
require('angular-ui-router');
require('angular-resource');
require('ng-file-upload');
require('angular-img-cropper');
require('angular-base64-upload');

var conversationsController = require('./controllers/conversationsController');
var mailController = require('./mail/mailController');
var girlsController = require('./mail/girlsController');
var usersController = require('./mail/usersController');
var girlsAllController = require('./mail/girlsAllController');
var mailIdController = require('./mail/mailIdController');
var formController = require('./mail/formController');
var girlsViewController = require('./mail/girlsViewController');

var cropDirective = require('./directives/crop');
var fileDirective = require('./directives/angular-file-model');

var mailService = require('./mail/mail_service');
var userService = require('./mail/user_service');
var girlsService = require('./mail/girls_service');
var girlsAllService = require('./mail/girlsAll_service');
var mailIdService = require('./mail/mailId_service');
var formService = require('./mail/form_service');

var app = angular.module('app', ['ui.router', 'ngResource', 'angular-img-cropper', 'naif.base64'])

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
      url: '/girls/:id',
      templateUrl: 'assets/angular-app/public/profile.html',
      controller: girlsController,
      controllerAs: 'ctrl'
    })
    .state('girls', {
      url: '/girls',
      templateUrl: 'assets/angular-app/public/home-logedin.html',
      controller: girlsAllController,
      controllerAs: 'ctrl'
    })
    .state('home', {
      url: '/home',
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
.controller('girlsAllController', ['userService', 'girlsAllService', girlsAllController])
.controller('mailIdController', ['userService', 'mailService', 'girlsAllService', 'mailIdService', mailIdController])
.controller('formController', ['formService',  formController])
.controller('girlsViewController', ['girlsService', girlsViewController])
.factory('userService', ['$resource', userService])
.factory('mailService', ['$resource', mailService])
.factory('girlsService', ['$resource', girlsService])
.factory('girlsAllService', ['$resource', girlsAllService])
.factory('mailIdService', ['$resource', mailIdService])
.factory('formService', ['$resource', formService]);
