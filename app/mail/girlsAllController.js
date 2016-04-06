module.exports = girlsAllController;

function girlsAllController ($document, $location, $stateParams, userService, girlsAllService) {

  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
  };

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

  this.getCountries = function() {
    var self = this;

    girlsAllService.getCountries().$promise.then(
      function(data) {
        self.countries = data;
        self.arrCountries = self.countries.countries;
        for(var i=0; i<self.arrCountries.length; i++) {
          if(self.arrCountries[i].name==self.counryUrl) {
            self.countryIdURL = self.arrCountries[i].id
            // console.log(self.countryIdURL);
            self.paginaGirl();
          }
        };

      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.getCountries();

  this.searchGirls = function() {

    $location.path('/girls/' + this.fromDateModel + '-' + this.toDateModel + '-' + this.countryModel)
    console.log('this.fromDateModel, this.toDateModel');
     console.log(this.fromDateModel, this.toDateModel, this.countryModel);
  };

  this.searchHomeGirls = function() {

    $location.path('/home/' + this.fromDateModel + '-' + this.toDateModel + '-' + this.countryModel)
    console.log('this.fromDateModel, this.toDateModel');
     console.log(this.fromDateModel, this.toDateModel, this.countryModel);
  };

// http://dev.irinadating.com/ladies/18-30-ukraine
  // var id = $stateParams.id;
  var arrId = $stateParams.id.split('-');
  var country = arrId[arrId.length-1];
  this.counryUrl = country;
  var birthDateArrId = arrId[0];
  var birthDateToArrId = arrId[arrId.length-2];
  var dateBirthdateFrom = new Date().getTime()-((24 * 3600 * 365.25 * 1000)*birthDateArrId);
  var resFromDate = new Date(dateBirthdateFrom);
  var resMonth = resFromDate.getMonth() +1;
  var arrRes = new String(resFromDate).split(' ');
  this.birthdateTo = arrRes[3] + '-' + resMonth + '-' + arrRes[2];

  var dateBirthdateTo = new Date().getTime()-((24 * 3600 * 365.25 * 1000)*birthDateToArrId);
  var resToDate = new Date(dateBirthdateTo);
  // var resMonth = resFromDate.getMonth() +1;
  var arrRes2 = new String(resToDate).split(' ');
  this.birthdateFrom = arrRes2[3] + '-' + resMonth + '-' + arrRes2[2];
  // console.log(resFromDate2);
  console.log(this.birthdateTo, this.birthdateFrom );

  // this.getUserData();
  this.fromDateModel = birthDateArrId;
  this.toDateModel = birthDateToArrId;
  this.countryModel = country;

  this.girlsAllGet = function() {
    var self = this;
    var options = {
      birthdateFrom: this.birthdateFrom,
      birthdateTo: this.birthdateTo,
      countryId: this.countryIdURL,
      direction: 'asc',
      limit: self.limit,
      offset: 0
    };
    girlsAllService.getGirlsAll(options).$promise.then(
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
        this.girlsAllGet();
        this.page += 1;
        this.limit+= 3;
      }
    } else {
      this.girlsAllGet();
      this.page += 1;
      this.limit += 3;
    }
  };

  // this.paginaGirl();

};

girlsAllController.$inject = ['$document', '$location', '$stateParams','userService', 'girlsAllService'];