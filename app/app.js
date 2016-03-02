require('angular');
require('angular-ui-router');
require('angular-resource');

var conversationsController = require('./controllers/conversationsController');
var mailController = require('./mail/mailController');

var mailService = require('./mail/mail_service');
var userService = require('./mail/user_service');

var app = angular.module('app', ['ui.router', 'ngResource'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/man");
  $stateProvider
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
})

.controller('conversationsController', conversationsController)
.controller('mailController', ['mailService','userService', mailController])
.factory('userService', ['$resource', userService])
.factory('mailService', ['$resource', mailService]);
