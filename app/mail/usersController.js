module.exports = usersController;

function usersController ($document, $location, userService ) {
  this.getUserData = function () {
    var self = this;

    userService.getUser().$promise.then(
      function(data) {
        self.user = data;

        if (self.user.user.additionalData.groupId == 1) {
          $location.path('/man');
        }
        else $location.path('/lady');

      },
      function(error) {
        console.log(error);
      }
    );
  };
  this.getUserData();
}

usersController.$inject = ['$document', '$location', 'userService'];