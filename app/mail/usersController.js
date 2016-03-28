module.exports = usersController;

function usersController ($document, $location, userService ) {

  this.getUserData = function () {
    var self = this;

    userService.getUser().$promise.then(
      function(data) {
        self.user = data;

        if (self.user.user.additionalData.groupId == 1) {
          $location.path('/man');
        } else if(self.user.user.additionalData.groupId == 2){
          $location.path('/lady');
        }
        else $location.path('/home');
      },
      function(error) {
        $location.path('/home');
        // console.log(error);
      }
    );
  };
  this.getUserData();
}

usersController.$inject = ['$document', '$location', 'userService'];