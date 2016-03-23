module.exports = girlsViewController;


function girlsViewController ($document, $stateParams, $location, girlsService) {

var id = $stateParams.id;

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