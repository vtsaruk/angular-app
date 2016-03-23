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
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.getUserData();



  this.girlsAllGet = function(id) {
    var self = this;
    var options = {
      limit: self.limit, //здесь должно вуличиваться на 5
      offset: 0//self.limit * self.page
    };
    girlsAllService.getGirlsAll(id, options).$promise.then(
      function(data) {
        self.girlsAll = data;
        self.gillsLength = self.girlsAll.totalCount;
        self.countPage = self.gillsLength / 3;
        self.totalPage = Math.ceil(self.countPage);
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.page = 0;
  this.limit = 3;

  this.paginaGirl = function() {
    if (this.totalPage){
      if(this.totalPage > this.page) {
        this.girlsAllGet(2);
        this.page += 1;
        this.limit+= 3;
      }
    } else {
      this.girlsAllGet(2);
      this.page += 1;
      this.limit += 3;
    }
  };

  this.paginaGirl();
};

girlsAllController.$inject = ['$document', '$location', 'userService', 'girlsAllService'];