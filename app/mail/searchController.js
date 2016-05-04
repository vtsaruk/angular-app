module.exports = searchController;

function searchController ($document, $location, $stateParams, $timeout, $rootScope, userService, searchService, girlsAllService, girlsService) {

  var urlId = $stateParams.id

this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        $rootScope.global2 = data;
        console.log('$rootScope.global2');
        console.log($rootScope.global2)
        self.user = data;
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.getUserData();

  this.birthdateFromModel = 18;
  this.birthdateToModel = 60;

  this.urlParsing = function(key, keyLength) {
    if(urlId.indexOf(key)!= -1 ) {
      var start = urlId.indexOf(key) + keyLength;
      var end = urlId.indexOf('-', start);
      model1 = urlId.slice(start, end);
      var start2 = urlId.indexOf('-', end );
      var end2 = urlId.indexOf('-', end+1);
      if(urlId.indexOf('-', end+1)==-1){
        model2 = urlId.slice(start2+1, urlId.length);
      } else model2 = urlId.slice(start2+1, end2);
    } else model1 = undefined;
    return model1;
  };

  this.urlParsing1 = function(key, keyLength) {
    if(urlId.indexOf(key)!= -1 ) {
      var start = urlId.indexOf(key) + keyLength;
      var end = urlId.indexOf('-', start);
      model1 = urlId.slice(start, end);
      var start2 = urlId.indexOf('-', end );
      var end2 = urlId.indexOf('-', end+1);
      if(urlId.indexOf('-', end+1)==-1){
        model2 = urlId.slice(start2+1, urlId.length);
      } else model2 = urlId.slice(start2+1, end2);
    } else model2 = undefined;
    return model2;
  };

  this.urlParsing2 = function(key, keyLength){
    if(urlId.indexOf(key)!= -1) {
      var start = urlId.indexOf(key) + keyLength;
      var end = urlId.indexOf('-', start);
      if(urlId.indexOf('-', start)==-1) {
        var model= urlId.slice(start, urlId.length);
        var result = model.replace(/_/g, " ");
      } else {
        var model = urlId.slice(start, end);
        var result = model.replace('_', " ");
      };
    } else var result = undefined;
    return result;
  };

  this.birthdateFromModel = this.urlParsing('-ag-', 4);
  this.birthdateToModel = this.urlParsing1('-ag-', 4);
  this.heightFromModel = this.urlParsing('-h-', 3);
  this.heightToModel = this.urlParsing1('-h-', 3);
  this.childrenNumberFromModel = this.urlParsing('-nch-', 5);
  this.childrenNumberToModel = this.urlParsing1('-nch-', 5);
  this.weightFromModel = this.urlParsing('-we-', 4);
  this.weightToModel = this.urlParsing1('-we-', 4);
  this.countryModel = this.urlParsing2('-co-', 4);
  this.drinkingModel = this.urlParsing2('-dr-', 4);
  this.educationModel = this.urlParsing2('-ed-', 4);
  this.englishRatingModel = this.urlParsing2('-en-', 4);
  this.eyeColorModel = this.urlParsing2('-ec-', 4);
  this.firstNameModel = this.urlParsing2('-fr-', 4);
  this.hairColorModel = this.urlParsing2('-hc-', 4);
  this.lookingForModel = this.urlParsing2('-lf-', 4);
  this.maritalStatusModel = this.urlParsing2('-ms-', 4);
  this.professionModel = this.urlParsing2('-pro-', 5);
  this.religionModel = this.urlParsing2('-r-', 3);
  this.smokingModel = this.urlParsing2('-sm-', 4);
  this.zodiacSignModel = this.urlParsing2('-zs-', 4);
  this.cityModel = this.urlParsing2('-ct-', 4);


    this.arrURL = [];
    this.arrURL[0] = ['ag', this.birthdateFromModel + "-" + this.birthdateToModel];
    this.arrURL[1] = ['co', this.countryModel];
    this.arrURL[2] = ['dr', this.drinkingModel];
    this.arrURL[3] = ['ed', this.educationModel];
    this.arrURL[4] = ['en', this.englishRatingModel];
    this.arrURL[5] = ['ec', this.eyeColorModel];
    this.arrURL[6] = ['fr', this.firstNameModel];
    this.arrURL[7] = ['h', this.heightFromModel+ '-' + this.heightToModel];
    this.arrURL[8] = ['hc', this.hairColorModel];
    this.arrURL[9] = ['lf', this.lookingForModel];
    this.arrURL[10] = ['ms', this.maritalStatusModel];
    this.arrURL[11] = ['nch', this.childrenNumberFromModel + '-' + this.childrenNumberToModel];
    this.arrURL[12] = ['pro', this.professionModel];
    this.arrURL[13] = ['r', this.religionModel];
    this.arrURL[14] = ['sm', this.smokingModel];
    this.arrURL[15] = ['we', this.weightFromModel + '-' + this.weightToModel];
    this.arrURL[16] = ['zs', this.zodiacSignModel];
    this.arrURL[17] = ['ct', this.cityModel];




  this.searchGirlsURL = function() {
    var self = this;
    this.arrURL = [];
    var keyValURL = '';
    this.arrURL[0] = ['ag', this.birthdateFromModel + "-" + this.birthdateToModel];
    this.arrURL[1] = ['co', this.countryModel];
    this.arrURL[2] = ['dr', this.drinkingModel];
    this.arrURL[3] = ['ed', this.educationModel];
    this.arrURL[4] = ['en', this.englishRatingModel];
    this.arrURL[5] = ['ec', this.eyeColorModel];
    this.arrURL[6] = ['fr', this.firstNameModel];
    this.arrURL[7] = ['h', this.heightFromModel+ '-' + this.heightToModel];
    this.arrURL[8] = ['hc', this.hairColorModel];
    this.arrURL[9] = ['lf', this.lookingForModel];
    this.arrURL[10] = ['ms', this.maritalStatusModel];
    this.arrURL[11] = ['nch', this.childrenNumberFromModel + '-' + this.childrenNumberToModel];
    this.arrURL[12] = ['pro', this.professionModel];
    this.arrURL[13] = ['r', this.religionModel];
    this.arrURL[14] = ['sm', this.smokingModel];
    this.arrURL[15] = ['we', this.weightFromModel + '-' + this.weightToModel];
    this.arrURL[16] = ['zs', this.zodiacSignModel];
    this.arrURL[17] = ['ct', this.cityModel];


    for(var i=0; i<18; i++) {
      if(self.arrURL[i][1] && self.arrURL[i][1] != "undefined" && self.arrURL[i][1] != "undefined-undefined" && self.arrURL[i][1] != null) keyValURL += self.arrURL[i][0] + '-' + self.arrURL[i][1] + '-';
    };
    // console.log(this.arrURL);
    // console.log(keyValURL);
    var resultURL = keyValURL.slice(0, keyValURL.length-1);
    console.log('resultURL');
    console.log(resultURL);
    $location.path('/search/' + '-' + resultURL);
  }

  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;
  };

  this.getCountries = function() {
    var self = this;

    girlsAllService.getCountries().$promise.then(
      function(data) {
        self.countries = data;
        $('select').select2();
        self.searchGirls()
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
};


  this.searchGirls = function() {
    this.setCountryId();
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
        self.countPage = self.gillsLength / 4;
        self.totalPage = Math.ceil(self.countPage);
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.page = 0;
  this.limit = 4;

 this.paginaGirl = function() {
     if (this.totalPage){
      this.page += 1;
      this.limit += 4;
      this.searchGirls();
      if(this.page==this.totalPage)
        this.buttonAdd = true;
    };
  };

  this.searchGirlId = function(id) {
    var self = this;
    girlsService.getGirlsId(id).$promise.then(
      function(data) {
        self.girlsAll = data;
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

  this.showParam = function(arg) {
    return arg == 'undefined-undefined' || arg == undefined || arg == null? false : true;
  };

  this.hideParam = function(index) {
    this.arrURL[index][1] = undefined;

    if(index==0) {
      this.birthdateFromModel = undefined;
      this.birthdateToModel = undefined;
    };
    if(index==1) this.countryModel = undefined;
    if(index==2) this.drinkingModel = undefined;
    if(index==3) this.educationModel = undefined;
    if(index==4) this.englishRatingModel = undefined;
    if(index==5) this.eyeColorModel = undefined;
    if(index==6) this.firstNameModel = undefined;
    if(index==7) {
      this.heightFromModel = undefined
      this.heightToModel = undefined;
    };
    if(index==8) this.hairColorModel = undefined;
    if(index==9) this.lookingForModel = undefined;;
    if(index==10) this.maritalStatusModel = undefined;
    if(index==11) {
      this.childrenNumberFromModel = undefined;
      this.childrenNumberToModel = undefined;
    };
    if(index==12) this.professionModel = undefined;
    if(index==13) this.religionModel = undefined;
    if(index==14) this.smokingModel = undefined;
    if(index==15) {
      this.weightFromModel = undefined;
      this.weightToModel = undefined;
    };
    if(index==16) this.zodiacSignModel= undefined;
    if(index==17) this.cityModel = undefined;
    this.searchGirlsURL();
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

      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.allNameGirl();

  this.makeHeights =  function() {
    var arrListHieght = [];
    var count = 149;
    var countR = 4.9;
    for(var i=0; i<12; i++) {
      count +=3;
      countR +=0.1;
      arrListHieght[i] = [countR.toFixed(1), count];
    }
    this.arrHieght = arrListHieght;
  };

  this.makeHeights();

  this.makeAge = function() {
    var arrlistAge = [];
    var count = 17;
    for(var i=0; i<43; i++){
      count ++;
      arrlistAge[i] = count;
    };
    this.listAge = arrlistAge;
  };

  this.makeAge();

  this.clearDataSearch = function() {
    $location.path('/search/-ag-18-30');
  };

  this.arrWeight = [];
  this.arrWeight[0] = [99, 45];
  this.arrWeight[1] = [101, 46];
  this.arrWeight[2] = [104, 47];
  this.arrWeight[3] = [106, 48];
  this.arrWeight[4] = [106, 48];
  this.arrWeight[5] = [108, 49];
  this.arrWeight[6] = [110, 50];
  this.arrWeight[7] = [112, 51];
  this.arrWeight[8] = [115, 52];
  this.arrWeight[9] = [117, 53];
  this.arrWeight[10] = [119, 54];
  this.arrWeight[11] = [121, 55];
  this.arrWeight[12] = [123, 56];
  this.arrWeight[13] = [126, 57];
  this.arrWeight[14] = [128, 58];
  this.arrWeight[15] = [130, 59];
  this.arrWeight[16] = [132, 60];
  this.arrWeight[17] = [135, 61];
  this.arrWeight[18] = [137, 62];
  this.arrWeight[19] = [139, 63];
  this.arrWeight[20] = [141, 64];
  this.arrWeight[21] = [143, 65];
  this.arrWeight[22] = [146, 66];
  this.arrWeight[23] = [148, 67];
  this.arrWeight[24] = [150, 68];
  this.arrWeight[25] = [152, 69];
  this.arrWeight[26] = [154, 70];
  this.arrWeight[27] = [157, 71];
  this.arrWeight[28] = [159, 72];
  this.arrWeight[29] = [161, 73];
  this.arrWeight[30] = [163, 74];
  this.arrWeight[31] = [165, 75];
  this.arrWeight[32] = [168, 76];
  this.arrWeight[33] = [170, 77];
  this.arrWeight[34] = [172, 78];
  this.arrWeight[35] = [174, 79];
  this.arrWeight[36] = [176, 80];
  this.arrWeight[37] = [179, 81];
  this.arrWeight[38] = [181, 82];
  this.arrWeight[39] = [183, 83];
  this.arrWeight[40] = [185, 84];
  this.arrWeight[41] = [187, 85];
  this.arrWeight[42] = [190, 86];
  this.arrWeight[43] = [192, 87];
  this.arrWeight[44] = [194, 88];
  this.arrWeight[45] = [196, 89];
  this.arrWeight[46] = [198, 90];

  this.photoAvatar2 = function(arg) {
    var photo = String(arg);
    photo = photo.slice(0, photo.length-4) + '_150_150_auto' + photo.slice(-4);
    return photo;
  };

// $(document).ready(function(){
  //  setInterval(function(){
  //   $('.selectpicker').selectpicker({
  //       style: 'btn-info',
  //       size: 4
  //     });
  // }, 1000);
  // })

};

  searchController.$inject = ['$document', '$location','$stateParams', '$rootScope', '$timeout', 'userService', 'searchService', 'girlsAllService','girlsService'];
