module.exports = favoriteController;

function favoriteController (formService, $scope, $timeout, userService, $rootScope, favoriteService) {
  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
        $rootScope.global2 = data;
        $('.head_footer').show();
      },
      function(error) {
        console.log(error);
        $('.head_footer').show();
      }
    );
  };

  this.getUserData();
  console.log('!!!!!!!!!!!!!');

  };

favoriteController.$inject = ['formService', '$scope', '$timeout', 'userService','$rootScope', 'favoriteService'];