module.exports = usersController;

function usersController ($document, $location, userService, $rootScope ) {
  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
        $rootScope.global2 = data;//self.user.user.additionalData.groupId;

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


  // if(this.user.user.additionalData.groupId) {
  //   $rootScope.global2 = this.user.user.additionalData.groupId;
  //   console.log('$rootScope.global');
  //   console.log($rootScope.global);
  // }
  this.isMan = function(id) {
    id == 1? true : false;
  };

  this.isLady = function(id) {
    id == 2? true : false;
  }
}

usersController.$inject = ['$document', '$location', 'userService', '$rootScope'];