module.exports = usersController;

function usersController ($document, $location, userService, $rootScope ) {
  $location.path('/home/-ag-18-30-co-Ukraine');
  // $rootScope.userLogout = function(){
  //   // console.log('!!!!!!');
  //   userService.logout();
  //   $location.path('/home/-ag-18-30-co-Ukraine');
  // }
  // this.getUserData = function () {
  //   var self = this;
  //   userService.getUser().$promise.then(
  //     function(data) {
  //       self.user = data;
  //       $rootScope.global2 = data;//self.user.user.additionalData.groupId;

  //       if (self.user.user.additionalData.groupId == 1) {
  //         $location.path('/man');
  //       } else if(self.user.user.additionalData.groupId == 2){
  //         $location.path('/lady');
  //       }
  //       else $location.path('/home/-ag-18-30-co-Ukraine');
  //     },
  //     function(error) {
  //       $location.path('/home/-ag-18-30-co-Ukraine');
  //       // console.log(error);
  //     }
  //   );
  // };
  // this.getUserData();
}

usersController.$inject = ['$document', '$location', 'userService', '$rootScope'];