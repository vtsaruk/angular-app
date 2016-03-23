module.exports = girlsController;


function girlsController ($document, $stateParams, $location, mailService, userService, girlsService) {

  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
  }

  this.getUserData = function () {
    var self = this;

    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
      },
      function(error) {
        console.log(error);
      }
    );
  };

this.getUserData();

  var id = $stateParams.id.split('-')[4];

  this.girlsIdGet = function(id) {
    var self = this;
    girlsService.getGirlsId(id).$promise.then(
      function(data) {
        self.girlsId = data;
      },
      function(error) {
        console.log(error);
      }
    );
  };
  this.girlsIdGet(id);

};


girlsController.$inject = ['$document', '$stateParams', '$location', 'mailService', 'userService', 'girlsService'];