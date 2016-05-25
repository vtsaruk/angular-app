module.exports = searchController;

function searchController ($document, $location, $stateParams, $rootScope, $timeout, userService, searchService, girlsAllService, girlsService) {

  /*Функция обертка забирает число из значения где есть символ '/'*/
  this.getNumberInModel = function(data) {
    if(data) {
      var arrRes = data.split('/')[1];
      return arrRes
    } else return undefined;
  };
  /*Функция обертка проверяет существует объект*/
  this.dataUndefined = function(model) {
    if(model)
      return model.name
    else return undefined;
  };
  /*функция обрезает текст girl.message, если в нём более 60 символов*/
  this.repliceMessages = function(message) {
    var newMessage = message;
    if(newMessage.length>60) {
      var corMessage = newMessage.slice(0, 60);
      return corMessage + '...';
    } else return newMessage;
  }
  /*Функция дописывает втрое значение, когда выбрано один параметр, а нужно передавать два параметра*/
  this.dataUndefined2 = function(model, value, model2) {
    if (model2 && model2.name && !model) {
      return value;
    } else if(model) {
      return model.name;
    } else return undefined;
  };

  var urlData = $stateParams.id
  var urlId = urlData.replace(/\*/g, "\/");

  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        $rootScope.global2 = data;
        self.user = data;
        $('.head_footer').show();
        $('.search-right-side-girls-item').mouseenter(function(){
          $(this).find('.search-right-side-girls-item-list').fadeIn();
      });
      },
      function(error) {
        $location.path('/home/-ag-18-30-co-Ukraine');
        console.log(error);
        $('.head_footer').show();
      }
    );
  };
  this.getUserData();

  this.showListImg = [];
  /*Функция отображает скрытый список при наведении на фото девушки*/
  this.mouseenterImg = function(index) {
    this.showListImg[index] = true;
  };
  /*Функция прячит список когда курсор уходит с фото девушки*/
  this.mouseleave = function(index) {
    this.showListImg[index] = false;
  };

/*Конструктор №1 парсит URL*/
  this.urlParsing = function(key, keyLength) {
    var model = '';
    var model2 = '';
    if(urlId.indexOf(key)!= -1 ) {
      var start = urlId.indexOf(key) + keyLength;
      var end = urlId.indexOf('-', start);
      model1 = urlId.slice(start, end);
      var start2 = urlId.indexOf('-', end );
      var end2 = urlId.indexOf('-', end+1);
      if(urlId.indexOf('-', end+1)==-1){
        model2 = urlId.slice(start2+1, urlId.length);
      } else model2 = urlId.slice(start2+1, end2);
    } else model1 = null;
    return model1;
  };
/*Конструктор №2 парсит URL*/
  this.urlParsing1 = function(key, keyLength) {
    var model = '';
    var model2 = '';
    if(urlId.indexOf(key)!= -1 ) {
      var start = urlId.indexOf(key) + keyLength;
      var end = urlId.indexOf('-', start);
      model1 = urlId.slice(start, end);
      var start2 = urlId.indexOf('-', end );
      var end2 = urlId.indexOf('-', end+1);
      if(urlId.indexOf('-', end+1)==-1){
        model2 = urlId.slice(start2+1, urlId.length);
      } else model2 = urlId.slice(start2+1, end2);
    } else model2 = null;
    return model2;
  };
/*Конструктор №3 парсит URL*/
  this.urlParsing2 = function(key, keyLength){
    if(urlId.indexOf(key)!= -1) {
      var start = urlId.indexOf(key) + keyLength;
      var end = urlId.indexOf('-', start);
      if(urlId.indexOf('-', start)==-1) {
        var model= urlId.slice(start, urlId.length);
        var result = model.replace(/_/g, " ");
      } else {
        var model = urlId.slice(start, end);
        var result = model.replace(/_/g, " ");
      };
    } else var result = null;
    // console.log(key + ' = ' + result);
    return result;
  };
/*Вызываем конструктор с нужными параметрами*/
  this.birthdateFromModel = { name: this.urlParsing('-ag-', 4) };
  this.birthdateToModel = { name: this.urlParsing1('-ag-', 4) };
  this.heightFromModel = { name: this.urlParsing('-h-', 3) };
  this.heightToModel = { name: this.urlParsing1('-h-', 3) };
  this.childrenNumberFromModel = { name: this.urlParsing('-nch-', 5) };
  this.childrenNumberToModel = { name: this.urlParsing1('-nch-', 5) };
  this.weightFromModel = { name: this.urlParsing('-we-', 4) };
  this.weightToModel = { name:this.urlParsing1('-we-', 4) };
  this.countryModel = { name: this.urlParsing2('-co-', 4) };
  this.drinkingModel = { name: this.urlParsing2('-dr-', 4) };
  this.educationModel = { name: this.urlParsing2('-ed-', 4) };
  this.englishRatingModel = { name: this.urlParsing2('-en-', 4) };
  this.eyeColorModel = { name: this.urlParsing2('-ec-', 4) };
  this.firstNameModel = { name: this.urlParsing2('-fr-', 4) };
  this.hairColorModel = { name: this.urlParsing2('-hc-', 4) };
  this.lookingForModel = { name: this.urlParsing2('-lf-', 4) };
  this.maritalStatusModel = { name: this.urlParsing2('-ms-', 4) };
  this.professionModel = { name: this.urlParsing2('-pro-', 5) };
  this.religionModel = { name: this.urlParsing2('-r-', 3) };
  this.smokingModel = { name: this.urlParsing2('-sm-', 4) };
  this.zodiacSignModel = { name: this.urlParsing2('-zs-', 4) };
  this.cityModel = { name: this.urlParsing2('-ct-', 4) };

// console.log('11111111111');
// console.log(this.heightFromModel);

// this.arrURL = initializesArray();
    this.arrURL = [];
    this.arrURL[0] = ['ag', this.birthdateFromModel.name + "-" + this.birthdateToModel.name];
    this.arrURL[1] = ['co', this.countryModel.name];
    this.arrURL[2] = ['dr', this.drinkingModel.name];
    this.arrURL[3] = ['ed', this.educationModel.name];
    this.arrURL[4] = ['en', this.englishRatingModel.name];
    this.arrURL[5] = ['ec', this.eyeColorModel.name];
    this.arrURL[6] = ['fr', this.firstNameModel.name];
    this.arrURL[7] = ['h', this.heightFromModel.name + '-' + this.heightToModel.name];
    this.arrURL[8] = ['hc', this.hairColorModel.name];
    this.arrURL[9] = ['lf', this.lookingForModel.name];
    this.arrURL[10] = ['ms', this.maritalStatusModel.name];
    this.arrURL[11] = ['nch', this.childrenNumberFromModel.name + '-' + this.childrenNumberToModel.name];
    this.arrURL[12] = ['pro', this.professionModel.name];
    this.arrURL[13] = ['r', this.religionModel.name];
    this.arrURL[14] = ['sm', this.smokingModel.name];
    this.arrURL[15] = ['we', this.weightFromModel.name + '-' + this.weightToModel.name];
    this.arrURL[16] = ['zs', this.zodiacSignModel.name];
    this.arrURL[17] = ['ct', this.cityModel.name];
  /*Функция делает поиск девушек по выбранным критериям через составление URL*/
  this.searchGirlsURL = function() {
    var self = this;
    this.arrURL = [];
    var keyValURL = '';
    this.arrURL[0] = ['ag', this.dataUndefined2(this.birthdateFromModel, 18, this.birthdateToModel) + '-' + this.dataUndefined2(this.birthdateToModel, 60, this.birthdateFromModel)];
    this.arrURL[1] = ['co', this.dataUndefined(this.countryModel)];
    this.arrURL[2] = ['dr', this.dataUndefined(this.drinkingModel)];
    this.arrURL[3] = ['ed', this.dataUndefined(this.educationModel)];
    this.arrURL[4] = ['en', this.dataUndefined(this.englishRatingModel)];
    this.arrURL[5] = ['ec', this.dataUndefined(this.eyeColorModel)];
    this.arrURL[6] = ['fr', this.dataUndefined(this.firstNameModel)];
    this.arrURL[7] = ['h', this.dataUndefined2(this.heightFromModel, '5.0/152', this.heightToModel) +'-' + this.dataUndefined2(this.heightToModel, '6.1/185', this.heightFromModel)];
    this.arrURL[8] = ['hc', this.dataUndefined(this.hairColorModel)];
    this.arrURL[9] = ['lf', this.dataUndefined(this.lookingForModel)];
    this.arrURL[10] = ['ms', this.dataUndefined(this.maritalStatusModel)];
    this.arrURL[11] = ['nch', this.dataUndefined2(this.childrenNumberFromModel, 0, this.childrenNumberToModel) + '-' + this.dataUndefined2(this.childrenNumberToModel, 5, this.childrenNumberFromModel)];
    this.arrURL[12] = ['pro', this.dataUndefined(this.professionModel)];
    this.arrURL[13] = ['r', this.dataUndefined(this.religionModel)];
    this.arrURL[14] = ['sm', this.dataUndefined(this.smokingModel)];
    this.arrURL[15] = ['we', this.dataUndefined2(this.weightFromModel, '99/45', this.weightToModel) + '-' + this.dataUndefined2(this.weightToModel, '198/90', this.weightFromModel)];
    this.arrURL[16] = ['zs', this.dataUndefined(this.zodiacSignModel)];
    this.arrURL[17] = ['ct', this.dataUndefined(this.cityModel)];
    for(var i=0; i<18; i++) {
      if(self.arrURL[i][1] && self.arrURL[i][1] != "undefined" && self.arrURL[i][1] != "undefined-undefined" && self.arrURL[i][1] != null && self.arrURL[i][1] != null+'-'+null)
        keyValURL += self.arrURL[i][0] + '-' + self.arrURL[i][1] + '-';
    };
    var resultURL = keyValURL.slice(0, keyValURL.length-1);
    var resultURL2 = resultURL.replace(/ /g, "_");
    var resultURL3 = resultURL2.replace(/\//g, "*");
    $location.path('/search/' + '-' + resultURL3);
  }
/*Функция определяет возраст*/
  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;
  };
/*Функция запрашивает страны у сервиса girlsAllService*/
  this.getCountries = function() {
    var self = this;
    girlsAllService.getCountries().$promise.then(
      function(data) {
        self.countries = data;
        // $('select').select2();
        self.searchGirls()
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.getCountries();
/**/
  this.setCountryId = function() {
    this.arrCountries = this.countries.countries;
       if(this.countryModel) {
        for(var i=0; i<this.arrCountries.length; i++) {
          if(this.countryModel && this.arrCountries[i].name == this.countryModel.name) {
            this.countryId = this.arrCountries[i].id;
          };
        }
        }
  };

this.birthdateFromAge = function() {
  var dateBirthdateFrom = new Date().getTime()-((24 * 3600 * 365.25 * 1000)*this.birthdateFromModel.name);
  var resFromDate = new Date(dateBirthdateFrom);
  var resMonth = resFromDate.getMonth() +1;
  var arrRes = new String(resFromDate).split(' ');
  this.birthdateTo = arrRes[3] + '-' + resMonth + '-' + arrRes[2];

  var dateBirthdateTo = new Date().getTime()-((24 * 3600 * 365.25 * 1000)*this.birthdateToModel.name);
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
      countryId: this.countryId,
      city: this.dataUndefined(this.cityModel),
      firstname: this.dataUndefined(this.firstNameModel),
      heightFrom: this.getNumberInModel(this.dataUndefined(this.heightFromModel)),
      heightTo: this.getNumberInModel(this.dataUndefined(this.heightToModel)),
      weightFrom: this.getNumberInModel(this.dataUndefined(this.weightFromModel)),
      weightTo: this.getNumberInModel(this.dataUndefined(this.weightToModel)),
      hairColor: this.dataUndefined(this.hairColorModel),
      eyeColor: this.dataUndefined(this.eyeColorModel),
      englishRating: this.dataUndefined(this.englishRatingModel),
      maritalStatus: this.dataUndefined(this.maritalStatusModel),
      profession: this.dataUndefined(this.professionModel),
      education: this.dataUndefined(this.educationModel),
      religion: this.dataUndefined(this.religionModel),
      smoking: this.dataUndefined(this.smokingModel),
      drinking: this.dataUndefined(this.drinkingModel),
      zodiacSign: this.dataUndefined(this.zodiacSignModel),
      childrenNumberFrom: this.dataUndefined(this.childrenNumberFromModel),
      childrenNumberTo: this.dataUndefined(this.childrenNumberToModel),
      lookingFor: this.dataUndefined(this.lookingForModel),
      limit: self.limit,
      offset: 0
    };
    searchService.getSearch(options).$promise.then(
      function(data) {
        self.girlsAll = data;
        self.resultGirls = self.girlsAll.girls
        self.gillsLength = self.girlsAll.totalCount;
        self.countPage = self.gillsLength / 16;
        self.totalPage = Math.ceil(self.countPage);
        // self.girlsAll.girls[0].user.mainphoto.pathOfQuad=null
        for(var i=0; i<self.girlsAll.girls.length; i++) {
          if(self.girlsAll.girls[i].user &&
            self.girlsAll.girls[i].user.mainphoto &&
            self.girlsAll.girls[i].user.mainphoto.pathOfQuad &&
            self.girlsAll.girls[i].user.mainphoto.pathOfQuad!=null) {
            var photo = self.girlsAll.girls[i].user.mainphoto.pathOfQuad;
            self.girlsAll.girls[i].photoAvatar = photo.slice(0, photo.length-4) + '_150_150_auto' + photo.slice(-4);
          } else self.girlsAll.girls[i].photoAvatar = null;
        }
        if(self.countryModel && self.countryModel.name==null) self.countryModel = undefined;
        if(self.birthdateFromModel && self.birthdateFromModel.name==null) self.birthdateFromModel = undefined;
        if(self.birthdateToModel && self.birthdateToModel.name==null) self.birthdateToModel = undefined;
        if(self.heightFromModel && self.heightFromModel.name==null) self.heightFromModel = undefined;
        if(self.heightToModel && self.heightToModel.name==null) self.heightToModel = undefined;
        if(self.eyeColorModel && self.eyeColorModel.name==null) self.eyeColorModel = undefined;
        if(self.englishRatingModel && self.englishRatingModel.name==null) self.englishRatingModel = undefined;
        if(self.maritalStatusModel && self.maritalStatusModel.name==null) self.maritalStatusModel = undefined;
        if(self.professionModel && self.professionModel.name==null) self.professionModel = undefined;
        if(self.educationModel && self.educationModel.name==null) self.educationModel = undefined;
        if(self.lookingForModel && self.lookingForModel.name==null) self.lookingForModel = undefined;
        if(self.religionModel && self.religionModel.name==null) self.religionModel = undefined;
        if(self.smokingModel && self.smokingModel.name==null) self.smokingModel = undefined;
        if(self.drinkingModel && self.drinkingModel.name==null) self.drinkingModel = undefined;
        if(self.childrenNumberFromModel && self.childrenNumberFromModel.name==null) self.childrenNumberFromModel = undefined;
        if(self.childrenNumberToModel && self.childrenNumberToModel.name==null) self.childrenNumberToModel = undefined;

        if(self.hairColorModel && self.hairColorModel.name==null) self.hairColorModel = undefined;
        if(self.firstNameModel && self.firstNameModel.name==null) self.firstNameModel = undefined;
        if(self.weightFromModel && self.weightFromModel.name==null) self.weightFromModel = undefined;
        if(self.weightToModel && self.weightToModel.name==null) self.weightToModel = undefined;
        if(self.cityModel && self.cityModel.name==null) self.cityModel = undefined;
        if(self.zodiacSignModel && self.zodiacSignModel.name ==null) self.zodiacSignModel = undefined;
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.page = 0;
  this.limit = 16;
/*Функция добавляет девушек*/
 this.paginaGirl = function() {
     if (this.totalPage){
      this.page += 1;
      this.limit += 16;
      this.searchGirls();
      if(this.page==this.totalPage)
        this.buttonAdd = true;
    };
  };
/*Функция получает имена девушек для отображения в select*/
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
/*Функция паказывает блок-кнопку если критерий есть*/
  this.showParam = function(arg) {
    return arg == 'undefined-undefined' || arg == undefined || arg == null || arg==null+'-'+null? false : true;
  };
/*Функция прячет блок-кнопку если на неё кликнули*/
  this.hideParam = function(index) {
    this.arrURL[index][1] = undefined;

    if(index==0) {
      this.birthdateFromModel.name = null;
      this.birthdateToModel.name = null;
    };
    if(index==1) this.countryModel.name = null;
    if(index==2) this.drinkingModel.name = null;
    if(index==3) this.educationModel.name = null;
    if(index==4) this.englishRatingModel.name = null;
    if(index==5) this.eyeColorModel.name = null;
    if(index==6) this.firstNameModel.name = null;
    if(index==7) {
      this.heightFromModel = null
      this.heightToModel = null;
    };
    if(index==8) this.hairColorModel.name = null;
    if(index==9) this.lookingForModel.name = null;;
    if(index==10) this.maritalStatusModel.name = null;
    if(index==11) {
      this.childrenNumberFromModel.name = null;
      this.childrenNumberToModel.name = null;
    };
    if(index==12) this.professionModel.name = null;
    if(index==13) this.religionModel.name = null;
    if(index==14) this.smokingModel.name = null;
    if(index==15) {
      this.weightFromModel = null;
      this.weightToModel = null;
    };
    if(index==16) this.zodiacSignModel.name= null;
    if(index==17) this.cityModel.name = null;
    this.searchGirlsURL();
  };
/*Функция получает имена девушек для отображения в select*/
  this.allNamesGirls = function() {
    var self = this;
    userService.getUsersNames().$promise.then(
      function(data) {
        self.dataNames = data.list;
        self.namesGirls = [];
        for(var i=0; i<self.dataNames.length; i++) {
          self.namesGirls[i] = { id:i, name: self.dataNames[i] };
        };
        // console.log(self.namesGirls);
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.allNamesGirls();

/*Фукция сооставляет массив данных по росту для select*/
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
/*Фукция сооставляет массив данных по росту для select*/
  this.arrHieghts = [];
  this.arrHeightsFunction =  function() {
    var count = 149;
    var countR = 4.9;
    for(var i=0; i<12; i++) {
      count +=3;
      countR +=0.1;
      this.arrHieghts[i] = { name: countR.toFixed(1) + '/' + count };
    }
  };

  this.arrHieghts[0] = { name: '4\'11\"/149' };
  this.arrHieghts[1] = { name: '4\'11\"/150' };
  this.arrHieghts[2] = { name: '4\'11\"/151' };
  this.arrHieghts[3] = { name: '5\'0\"/152' };
  this.arrHieghts[4] = { name: '5\'0\"/153' };
  this.arrHieghts[5] = { name: '5\'0\"/154' };
  this.arrHieghts[6] = { name: '5\'1\"/155' };
  this.arrHieghts[7] = { name: '5\'1\"/156' };
  this.arrHieghts[8] = { name: '5\'2\"/157' };
  this.arrHieghts[9] = { name: '5\'2\"/158' };
  this.arrHieghts[10] = { name: '5\'3\"/159' };
  this.arrHieghts[11] = { name: '5\'3\"/160' };
  this.arrHieghts[12] = { name: '5\'3\"/161' };
  this.arrHieghts[13] = { name: '5\'4\"/162' };
  this.arrHieghts[14] = { name: '5\'4\"/163' };
  this.arrHieghts[15] = { name: '5\'4\"/164' };
  this.arrHieghts[16] = { name: '5\'5\"/165' };
  this.arrHieghts[17] = { name: '5\'5\"/166' };
  this.arrHieghts[18] = { name: '5\'6\"/167' };
  this.arrHieghts[19] = { name: '5\'6\"/168' };
  this.arrHieghts[20] = { name: '5\'7\"/169' };
  this.arrHieghts[21] = { name: '5\'7\"/170' };
  this.arrHieghts[22] = { name: '5\'7\"/171' };
  this.arrHieghts[23] = { name: '5\'8\"/172' };
  this.arrHieghts[24] = { name: '5\'8\"/173' };
  this.arrHieghts[25] = { name: '5\'8\"/174' };
  this.arrHieghts[26] = { name: '5\'9\"/175' };
  this.arrHieghts[27] = { name: '5\'9\"/176' };
  this.arrHieghts[28] = { name: '5\'10\"/177' };
  this.arrHieghts[29] = { name: '5\'10\"/178' };
  this.arrHieghts[30] = { name: '5\'10\"/179' };
  this.arrHieghts[31] = { name: '5\'11\"/180' };
  this.arrHieghts[32] = { name: '5\'11\"/181' };
  this.arrHieghts[33] = { name: '6\'0\"/182' };
  this.arrHieghts[34] = { name: '6\'0\"/183' };
  this.arrHieghts[35] = { name: '6\'0\"/184' };
  this.arrHieghts[36] = { name: '6\'1\"/185' };
  this.arrHieghts[37] = { name: '6\'1\"/186' };
  this.arrHieghts[38] = { name: '6\'2\"/187' };
  this.arrHieghts[39] = { name: '6\'2\"/188' };
  this.arrHieghts[40] = { name: '6\'2\"/189' };
  this.arrHieghts[41] = { name: '6\'3\"/190' };
  this.arrHieghts[42] = { name: '6\'3\"/191' };
  this.arrHieghts[43] = { name: '6\'4\"/192' };
  this.arrHieghts[44] = { name: '6\'4\"/193' };
  this.arrHieghts[45] = { name: '6\'4\"/194' };
  this.arrHieghts[46] = { name: '6\'5\"/195' };
  this.arrHieghts[47] = { name: '6\'5\"/196' };
  this.arrHieghts[48] = { name: '6\'5\"/197' };
  this.arrHieghts[49] = { name: '6\'6\"/198' };
  this.arrHieghts[50] = { name: '6\'6\"/199' };
  this.arrHieghts[51] = { name: '6\'7\"/200' };
  this.arrHieghts[52] = { name: '6\'7\"/201' };
  this.arrHieghts[53] = { name: '6\'7\"/202' };
  this.arrHieghts[54] = { name: '6\'8\"/203' };
  this.arrHieghts[55] = { name: '6\'8\"/204' };
  this.arrHieghts[56] = { name: '6\'9\"/205' };
  this.arrHieghts[57] = { name: '6\'9\"/206' };
  this.arrHieghts[58] = { name: '6\'9\"/207' };
  this.arrHieghts[59] = { name: '6\'10\"/208' };
  this.arrHieghts[60] = { name: '6\'10\"/209' };
  this.arrHieghts[61] = { name: '6\'11\"/210' };


  // this.arrHeightsFunction();
/*Функция создаёт массив данных для поля возраст в поиске*/
this.makeAge = function() {
    this.listAge = [];
    var count = 17;
    for(var i=0; i<43; i++){
      count ++;
      this.listAge[i] = {id: i, name: count};
    };
  };

  this.makeAge();
  /*Функция убирает все выбранные параметры для поиска*/
  this.clearDataSearch = function() {
    $location.path('/search/-ag-18-30');
  };
/*Массив данных по весу для select*/
  // this.arrWeight = [];
  // this.arrWeight[0] = [99, 45];
  // this.arrWeight[1] = [101, 46];
  // this.arrWeight[2] = [104, 47];
  // this.arrWeight[3] = [106, 48];
  // this.arrWeight[4] = [106, 48];
  // this.arrWeight[5] = [108, 49];
  // this.arrWeight[6] = [110, 50];
  // this.arrWeight[7] = [112, 51];
  // this.arrWeight[8] = [115, 52];
  // this.arrWeight[9] = [117, 53];
  // this.arrWeight[10] = [119, 54];
  // this.arrWeight[11] = [121, 55];
  // this.arrWeight[12] = [123, 56];
  // this.arrWeight[13] = [126, 57];
  // this.arrWeight[14] = [128, 58];
  // this.arrWeight[15] = [130, 59];
  // this.arrWeight[16] = [132, 60];
  // this.arrWeight[17] = [135, 61];
  // this.arrWeight[18] = [137, 62];
  // this.arrWeight[19] = [139, 63];
  // this.arrWeight[20] = [141, 64];
  // this.arrWeight[21] = [143, 65];
  // this.arrWeight[22] = [146, 66];
  // this.arrWeight[23] = [148, 67];
  // this.arrWeight[24] = [150, 68];
  // this.arrWeight[25] = [152, 69];
  // this.arrWeight[26] = [154, 70];
  // this.arrWeight[27] = [157, 71];
  // this.arrWeight[28] = [159, 72];
  // this.arrWeight[29] = [161, 73];
  // this.arrWeight[30] = [163, 74];
  // this.arrWeight[31] = [165, 75];
  // this.arrWeight[32] = [168, 76];
  // this.arrWeight[33] = [170, 77];
  // this.arrWeight[34] = [172, 78];
  // this.arrWeight[35] = [174, 79];
  // this.arrWeight[36] = [176, 80];
  // this.arrWeight[37] = [179, 81];
  // this.arrWeight[38] = [181, 82];
  // this.arrWeight[39] = [183, 83];
  // this.arrWeight[40] = [185, 84];
  // this.arrWeight[41] = [187, 85];
  // this.arrWeight[42] = [190, 86];
  // this.arrWeight[43] = [192, 87];
  // this.arrWeight[44] = [194, 88];
  // this.arrWeight[45] = [196, 89];
  // this.arrWeight[46] = [198, 90];

  this.arrWeights = [];
  this.arrWeights[0] = { name: '99/45' };
  this.arrWeights[1] = { name: '101/46' };
  this.arrWeights[2] = { name: '104/47' };
  this.arrWeights[3] = { name: '106/48' };
  this.arrWeights[4] = { name: '106/48' };
  this.arrWeights[5] = { name: '108/49' };
  this.arrWeights[6] = { name: '110/50' };
  this.arrWeights[7] = { name: '112/51' };
  this.arrWeights[8] = { name: '115/52' };
  this.arrWeights[9] = { name: '117/53' };
  this.arrWeights[10] = { name: '119/54' };
  this.arrWeights[11] = { name: '121/55' };
  this.arrWeights[12] = { name: '123/56' };
  this.arrWeights[13] = { name: '126/57' };
  this.arrWeights[14] = { name: '128/58' };
  this.arrWeights[15] = { name: '130/59' };
  this.arrWeights[16] = { name: '132/60' };
  this.arrWeights[17] = { name: '135/61' };
  this.arrWeights[18] = { name: '137/62' };
  this.arrWeights[19] = { name: '139/63' };
  this.arrWeights[20] = { name: '141/64' };
  this.arrWeights[21] = { name: '143/65' };
  this.arrWeights[22] = { name: '146/66' };
  this.arrWeights[23] = { name: '148/67' };
  this.arrWeights[24] = { name: '150/68' };
  this.arrWeights[25] = { name: '152/69' };
  this.arrWeights[26] = { name: '154/70' };
  this.arrWeights[27] = { name: '157/71' };
  this.arrWeights[28] = { name: '159/72' };
  this.arrWeights[29] = { name: '161/73' };
  this.arrWeights[30] = { name: '163/74' };
  this.arrWeights[31] = { name: '165/75' };
  this.arrWeights[32] = { name: '168/76' };
  this.arrWeights[33] = { name: '170/77' };
  this.arrWeights[34] = { name: '172/78' };
  this.arrWeights[35] = { name: '174/79' };
  this.arrWeights[36] = { name: '176/80' };
  this.arrWeights[37] = { name: '179/81' };
  this.arrWeights[38] = { name: '181/82' };
  this.arrWeights[39] = { name: '183/83' };
  this.arrWeights[40] = { name: '185/84' };
  this.arrWeights[41] = { name: '187/85' };
  this.arrWeights[42] = { name: '190/86' };
  this.arrWeights[43] = { name: '192/87' };
  this.arrWeights[44] = { name: '194/88' };
  this.arrWeights[45] = { name: '196/89' };
  this.arrWeights[46] = { name: '198/90' };
/*Массив данных цвет волос для select*/
  this.arrHairColor = [];
  this.arrHairColor[0] = { name: 'Black', value:'Black' };
  this.arrHairColor[1] = { name: 'Blonde', value: 'Blonde' };
  this.arrHairColor[2] = { name: 'Brown', value: 'Brown' };
  this.arrHairColor[3] = { name: 'Light brown', value: 'Light_brown' };
/*Массив данных цвета глаз для select*/
  this.arreYeColor = [];
  this.arreYeColor[0] = { name: 'Blue' };
  this.arreYeColor[1] = { name: 'Brown' };
  this.arreYeColor[2] = { name: 'Gray' };
  this.arreYeColor[3] = { name: 'Green' };
  this.arreYeColor[4] = { name: 'Hazel' };
/*Массив данных по рейтингу знания английского для select*/
  this.arrEnglishRating = [];
  this.arrEnglishRating[0] = { name: 'Beginner' };
  this.arrEnglishRating[1] = { name: 'Intermediate' };
  this.arrEnglishRating[2] = { name: 'Advanced' };
  this.arrEnglishRating[3] = { name: 'Fluent' };
/*Массив данных количества детей для select*/
  this.arrChildrenNumber = [];
  this.arrChildrenNumber[0] = { name: 0 };
  this.arrChildrenNumber[1] = { name: 1 };
  this.arrChildrenNumber[2] = { name: 2 };
  this.arrChildrenNumber[3] = { name: 3 };
  this.arrChildrenNumber[4] = { name: 4 };
  this.arrChildrenNumber[5] = { name: 5 };
/**/
  this.arrMaritalStatus = [];
  this.arrMaritalStatus[0] = { name: 'Never married' };
  this.arrMaritalStatus[1] = { name: 'Divorced' };
  this.arrMaritalStatus[2] = { name: 'Widow' };
/**/
  this.arrCities = [];
  this.arrCities[0] = { name: 'Kiev' };
  this.arrCities[1] = { name: 'Rivne' }
  this.arrCities[2] = { name: 'Odessa' };
  this.arrCities[3] = { name: 'Vinnica' };
/**/
  this.arrLookingFor = [];
  this.arrLookingFor[0] = { name: 'Marriage' };
  this.arrLookingFor[1] = { name: 'Find a person with children' };
  this.arrLookingFor[2] = { name: 'Find a person who is good with children' };
  this.arrLookingFor[3] = { name: 'A long term relationship' };
  this.arrLookingFor[4] = { name: 'Penpal relationship' };
  this.arrLookingFor[5] = { name: 'Meeting with foreign person while they are travelling to CIS' };
  this.arrLookingFor[6] = { name: 'A casual relationship' };
  this.arrLookingFor[7] = { name: 'Meet person of different cultures' };
  this.arrLookingFor[8] = { name: 'Online chat (Phone, Video, Live)' };
  this.arrLookingFor[9] = { name: 'Online Flirting' };
/**/
  this.arrProfessions = [];
  this.arrProfessions[0] = { name: 'Doctor' };
  this.arrProfessions[1] = { name: 'Teacher' };
  this.arrProfessions[2] = { name: 'Accountant' };
  this.arrProfessions[3] = { name: 'Developer' };
  this.arrProfessions[4] = { name: 'Manager' };
  this.arrProfessions[5] = { name: 'Engineer' };
/**/
  this.arrEducation = [];
  this.arrEducation[0] = { name: 'University degree' };
  this.arrEducation[1] = { name: 'University (unfinished)' };
  this.arrEducation[2] = { name: 'Medical degree' };
  this.arrEducation[3] = { name: 'Student' };
  this.arrEducation[4] = { name: 'College degree' };
  this.arrEducation[5] = { name: 'High school' };
/**/
  this.arrReligions = [];
  this.arrReligions[0] = { name: 'Not Religious' };
  this.arrReligions[1] = { name: 'Muslim' };
  this.arrReligions[2] = { name: 'Jewish' };
  this.arrReligions[3] = { name: 'Russian Orthodox' };
  this.arrReligions[4] = { name: 'Buddhism' };
  this.arrReligions[5] = { name: 'Catholic' };
  this.arrReligions[6] = { name: 'Baptist' };
  this.arrReligions[7] = { name: 'Christian' };
  this.arrReligions[8] = { name: 'Protestant' };
  this.arrReligions[9] = { name: 'Lutheran' };
  this.arrReligions[10] = { name: 'Mormon' };
  this.arrReligions[11] = { name: 'Other' };
/**/
  this.arrZodiacs = [];
  this.arrZodiacs[0] = { name: 'Aries' };
  this.arrZodiacs[1] = { name: 'Taurus' };
  this.arrZodiacs[2] = { name: 'Gemini' };
  this.arrZodiacs[3] = { name: 'Cancer' };
  this.arrZodiacs[4] = { name: 'Leo' };
  this.arrZodiacs[5] = { name: 'Virgo' };
  this.arrZodiacs[6] = { name: 'Libra' };
  this.arrZodiacs[7] = { name: 'Scorpio' };
  this.arrZodiacs[8] = { name: 'Sagittarius'};
  this.arrZodiacs[9] = { name: 'Capricorn'};
  this.arrZodiacs[10] = { name: 'Aquarius'};
  this.arrZodiacs[11] = { name: 'Pisces'};
/**/
  this.arrSmokingOptions = [];
  this.arrSmokingOptions[0] = { name: 'No' };
  this.arrSmokingOptions[1] = { name: 'Yes' };
  this.arrSmokingOptions[2] = { name: 'Sometimes' };
/**/
  this.arrDrinkingOptions = [];
  this.arrDrinkingOptions[0] = {name: 'Never' };
  this.arrDrinkingOptions[1] = {name: 'Socially' };
  this.arrDrinkingOptions[2] = {name: 'Occasionally' };
  /*Функция меняет размеры фото*/
  this.photoAvatar2 = function(arg) {
    var photo = String(arg);
    photo = photo.slice(0, photo.length-4) + '_150_150_auto' + photo.slice(-4);
    return photo;
  };

};

  searchController.$inject = ['$document', '$location','$stateParams', '$rootScope', '$timeout', 'userService', 'searchService', 'girlsAllService','girlsService'];
