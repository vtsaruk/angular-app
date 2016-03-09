module.exports = girlsController;


function girlsController ($document, $stateParams, $location, mailService, userService, girlsService) {

  this.getUserData = function () {
    var self = this;

    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
        console.log(self.user);
      },
      function(error) {
        console.log(error);
      }
    );
  };

this.getUserData();

  var id = $stateParams.id;

  this.girlsIdGet = function(id) {
    console.log(id, id);
    var self = this;
    girlsService.getGirlsId(id).$promise.then(
      function(data) {
        self.girlsId = data;
        console.log(self.girlsId);

      },
      function(error) {
        console.log(error);
      }
    );
  };
  this.girlsIdGet(id);

};


girlsController.$inject = ['$document', '$stateParams', '$location', 'mailService', 'userService', 'girlsService'];