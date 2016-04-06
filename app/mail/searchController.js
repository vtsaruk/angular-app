module.exports = searchController;

function searchController (userService, searchService, girlsAllService, girlsService) {

  this.birthdateFromModel = 18;
  this.birthdateToModel = 60;

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
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.getCountries();

  this.setCountryId = function() {
    this.arrCountries = this.countries.countries;
        for(var i=0; i<this.arrCountries.length; i++) {
          if(this.arrCountries[i].name == this.countryModel) {
            this.countryId = this.arrCountries[i].id
            // console.log(this.countryId);
            // self.paginaGirl();
          }
        }
  }

this.birthdateFromAge = function() {
  var dateBirthdateFrom = new Date().getTime()-((24 * 3600 * 365.25 * 1000)*this.birthdateFromModel);
  var resFromDate = new Date(dateBirthdateFrom);
  var resMonth = resFromDate.getMonth() +1;
  var arrRes = new String(resFromDate).split(' ');
  this.birthdateTo = arrRes[3] + '-' + resMonth + '-' + arrRes[2];

  var dateBirthdateTo = new Date().getTime()-((24 * 3600 * 365.25 * 1000)*this.birthdateToModel);
  var resToDate = new Date(dateBirthdateTo);
  // var resMonth = resFromDate.getMonth() +1;
  var arrRes2 = new String(resToDate).split(' ');
  this.birthdateFrom = arrRes2[3] + '-' + resMonth + '-' + arrRes2[2];
  // console.log(this.birthdateFromModel, this.birthdateToModel);
  // console.log(this.birthdateTo, this.birthdateFrom );
};
  // this.getUserData();
  // this.fromDateModel = birthDateArrId;
  // this.toDateModel = birthDateToArrId;
  // this.countryModel = country;

  this.searchGirls = function() {
    this.setCountryId();
    // console.log(dateBirthdateFrom, dateBirthdateTo);
    this.birthdateFromAge();
    var self = this;
    var options = {
      birthdateFrom: this.birthdateFrom,
      birthdateTo: this.birthdateTo,
      countryId: this.countryId,//this.,
      city: this.cityModel,
      firstname: this.firstNameModel,
      heightFrom: this.heightFromModel,
      heightTo: this.heightToModel,
      weightFrom: this.weightFromModel,
      weightTo: this.weightToModel,
      hairColor: this.hairColorModel,
      eyeColor: this.eyeColorModel,
      englishRating: this.englishRatingModel,
      maritalStatus: this.maritalStatusModel,
      profession: this.professionModel,
      education: this.educationModel,
      religion: this.religionModel,
      smoking: this.smokingModel,
      drinking: this.drinkingModel,
      zodiacSign: this.zodiacSignModel,
      childrenNumberFrom: this.childrenNumberFromModel,
      childrenNumberTo: this.childrenNumberToModel,
      limit: self.limit,
      offset: 0
    };

    searchService.getSearch(options).$promise.then(
      function(data) {
        self.girlsAll = data;
        self.resultGirls = self.girlsAll.girls
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
        this.searchGirls();
        this.page += 1;
        this.limit+= 3;
      }
    } else {
      this.searchGirls();
      this.page += 1;
      this.limit += 3;
    }
  };

  this.searchGirlId = function(id) {
    //console.log(id);
    var self = this;
    girlsService.getGirlsId(id).$promise.then(
      function(data) {
        self.girlsAll = data;
        console.log(self.girlsAll.girl);
        if(self.girlsAll.girl) {
          self.res = self.girlsAll.girl
          self.resultGirls = [];
          self.resultGirls[0] = self.res;
        } else self.resultGirls = [];
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.allNameGirl = function() {
    this.birthdateFromAge();
    var self = this;
    var options = {
      birthdateFrom: this.birthdateFrom,
      birthdateTo: this.birthdateTo,
      countryId: undefined,
      direction: undefined,
      limit: undefined,
      offset: 0
    };
    girlsAllService.getGirlsAll(options).$promise.then(
      function(data) {
        self.arrNameGilrs = data;
        console.log('self.arrNameGilrs');
        console.log(self.arrNameGilrs.girls[0]);
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.allNameGirl();

  this.makeHeights =  function() {
    var arrListHieght = [];
    var count = 149
    for(var i=0; i<12; i++) {
      count +=3;
      arrListHieght[i] = count;
    }
    this.listHieght = arrListHieght;
  };

  this.makeHeights();

  this.makeAge = function() {
    var arrlistAge = [];
    var count = 17;
    for(var i=0; i<43; i++){
      count ++;
      arrlistAge[i] = count;
    }
    this.listAge = arrlistAge;
  };

  this.makeAge();

  this.clearDataSearch = function() {
    this.birthdateFromModel = 18;
    this.birthdateToModel = 60;
    this.countryId = undefined;
    this.cityModel = undefined;
    this.firstNameModel = undefined;
    this.heightFromModel = undefined,
    this.heightToModel = undefined;
    this.weightFromModel = undefined;
    this.weightToModel = undefined;
    this.hairColorModel = undefined;
    this.eyeColorModel = undefined;
    this.englishRatingModel = undefined;
    this.maritalStatusModel = undefined;
    this.professionModel = undefined;
    this.educationModel = undefined;
    this.religionModel = undefined;
    this.smokingModel = undefined;
    this.drinkingModel = undefined;
    this.zodiacSignModel = undefined;
    this.childrenNumberFromModel = undefined;
    this.childrenNumberToModel = undefined;
    this.limit = 3;
    this.resultGirls = [];
  }
};

  searchController.$inject = ['userService', 'searchService', 'girlsAllService','girlsService'];
