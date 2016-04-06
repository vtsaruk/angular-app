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
        else $location.path('/home/18-30-Ukraine');
      },
      function(error) {
        $location.path('/home/18-30-Ukraine');
        // console.log(error);
      }
    );
  };
  this.getUserData();

  this.hello = true;
}

usersController.$inject = ['$document', '$location', 'userService'];