module.exports = girlsViewController;


function girlsViewController ($document, $stateParams, $location, girlsService) {



  var id = $stateParams.id.split('-')[4];
  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
  }

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



girlsViewController.$inject = ['$document', '$stateParams', '$location', 'girlsService'];