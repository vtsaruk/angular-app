require('angular');
require('angular-ui-router');
require('angular-resource');

var conversationsController = require('./controllers/conversationsController');
var mailController = require('./mail/mailController');
var girlsController = require('./mail/girlsController');
var usersController = require('./mail/usersController');

var mailService = require('./mail/mail_service');
var userService = require('./mail/user_service');
var girlsService = require('./mail/girls_service');

var app = angular.module('app', ['ui.router', 'ngResource'])

.config(function($stateProvider, $urlRouterProvider) {
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
    .state('girls', {
      url: '/girls/:id',
      templateUrl: 'assets/angular-app/public/profile.html',
      controller: girlsController,
      controllerAs: 'ctrl'
    });
})

.controller('conversationsController', conversationsController)
.controller('usersController', ['userService', usersController])
.controller('mailController', ['mailService','userService', 'girlsService', mailController])
.controller('girlsController', ['mailService','userService', 'girlsService', girlsController])
.factory('userService', ['$resource', userService])
.factory('mailService', ['$resource', mailService])
.factory('girlsService', ['$resource', girlsService]);
