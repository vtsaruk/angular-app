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
        else $location.path('/home/-ag-18-30-co-Ukraine');
      },
      function(error) {
        $location.path('/home/-ag-18-30-co-Ukraine');
        // console.log(error);
      }
    );
  };
  this.getUserData();

  this.isMan = function(id) {
    id == 1? true : false;
  };

  this.isLady = function(id) {
    id == 2? true : false;
  }
}

usersController.$inject = ['$document', '$location', 'userService'];