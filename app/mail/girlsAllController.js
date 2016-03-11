module.exports = girlsAllController;

function girlsAllController ($document, $location, userService, girlsAllService) {
  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
  }

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

  this.girlsAllGet = function(id) {
    //console.log(id, id);
    var self = this;
    girlsAllService.getGirlsAll(id).$promise.then(
      function(data) {
        self.girlsAll = data;
        console.log('self.girlsAll');
        console.log(self.girlsAll);

      },
      function(error) {
        console.log(error);
      }
    );
  };
  this.girlsAllGet(2);

};

girlsAllController.$inject = ['$document', '$location', 'userService', 'girlsAllService'];