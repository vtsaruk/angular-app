require('angular');
require('ui-router');
require('angular-resource');
require('angular-cookies');

var conversationsController = require('./controllers/conversationsController');
var mailController = require('./mail/mailController');

var mailService = require('./mail/mail_service');
var userService = require('./mail/user_service');

var app = angular.module('app', ['ui.router', 'ngResource', 'ngCookies'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/e-mail");
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'assets/angular-app/public/conversation-list.html',
      controller: conversationsController,
      controllerAs: 'ctrl'
    })
    .state('e-mail', {
      url: '/e-mail',
      templateUrl: 'assets/angular-app/public/e-mail.html',
      controller: mailController,
      controllerAs: 'ctrl'
    });
})

.controller('conversationsController', conversationsController)
.controller('mailController', ['mailService','userService', '$cookies', mailController])
.factory('userService', ['$resource', userService])
.factory('mailService', ['$resource', mailService]);
