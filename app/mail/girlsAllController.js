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
        self.countPage = self.gillsLength / 3;//здесь мы увеличивае тоже получается) правильно? мы с тобой делали
        self.totalPage = Math.ceil(self.countPage);
        console.log('self.girlsAll');
        console.log('self.totalPage1');
        console.log(self.totalPage);
      },
      function(error) {
        console.log(error);
      }
    );
  };
  //this.girlsAllGet(2);
  this.page = 0;
  this.limit = 3; //здесь мы установили 5

  this.paginaGirl = function() {
    console.log('this.page1');
    console.log(this.page);
    console.log('this.totalPage');
    console.log(this.totalPage);
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
    console.log('this.page2');
    console.log(this.page);
    //console.log('self.totalPage2');
    //console.log(this.totalPage);
    //console.log(this.user);
  };

  this.paginaGirl();
};

girlsAllController.$inject = ['$document', '$location', 'userService', 'girlsAllService'];