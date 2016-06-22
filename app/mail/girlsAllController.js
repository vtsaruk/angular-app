module.exports = girlsAllController;

var meConfig = require('../config');

function girlsAllController ($document, $location, $stateParams, userService, girlsAllService, $rootScope, $http, $timeout, $interval, storiesService) {

  this.recaptchaKey = meConfig.recaptcha;
  this.disabled = undefined;

  /*Функция определяет возраст*/
  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
  };
  this.formUseModel = true;
  this.formUser = function() {
    if(this.formUseModel)
      this.formUseModel = false;
    else this.formUseModel = true;
  };

  // this.loginUser = function(User) {
  //   var self = this;
  //   console.log(User.name2 + ' , ' + User.password2);
  //   var fd = new FormData();
  //   fd.append('email', User.email2);
  //   fd.append('password', User.password2);
  //   userService.loginUser(fd).$promise.then(
  //     function(data) {
  //       self.user = data;
  //       if (self.user.user.additionalData.groupId == 1) {
  //         $location.path('/man');
  //       } else if(self.user.user.additionalData.groupId == 2){
  //         $location.path('/lady');
  //       }
  //       else $location.path('/home/-ag-18-30-co-Ukraine');
  //     },
  //     function(error) {
  //       $location.path('/home/-ag-18-30-co-Ukraine');
  //     }
  //   );
  // };

  this.registUser = function(User) {
    var self = this;
    // var user = {};

var fd = new FormData();
    fd.append('email', User.email);
    fd.append('password', User.message);
    fd.append('secret', meConfig.recapthaSecret );
    // fd.append('secret', '6LeKeR0TAAAAAHgv7QcaVHtTWT7ScsfeGpCMDQwB' );
    fd.append('response', this.myRecaptchaResponse);
    userService.registUser(fd);//.$promise.then(
    //   function(data) {
    //     self.user = data;
    //     if (self.user.user.additionalData.groupId == 1) {
    //       $location.path('/man');
    //     } else if(self.user.user.additionalData.groupId == 2){
    //       $location.path('/lady');
    //     }
    //     else $location.path('/home/-ag-18-30-co-Ukraine');
    //   },
    //   function(error) {
    //     $location.path('/home/-ag-18-30-co-Ukraine');
    //   }
    // );
  };

/*Функция делает запрос к сервису и получает данные залогиненного пользователя*/
  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        $rootScope.global2 = data;
        self.user = data;
        if (self.user.user.additionalData.groupId == 1) {
          $location.path('/man');
        } else if(self.user.user.additionalData.groupId == 2){
          $location.path('/lady');
        } else if(self.user.user.additionalData.groupId == 5){
          $location.path('/transleder');
        }
        else $location.path('/home/-ag-18-30-All_countries');
        $('.head_footer').show();
      },
      function(error) {
        // $rootScope.global2=0;
        // console.log(error);
        $('.head_footer').show();
      }
    );
  };

  this.getUserData();
/*Функция поиска леди по возрасту и стране, делает API запрос*/
  this.searchGirls = function(page) {
    // console.log(this.fromDateModel.name.name);
    var self = this;
    this.arrURL = [];
    var keyValURL = '';
    this.arrURL[0] = ['ag', this.fromDateModel.name + "-" + this.toDateModel.name];
    this.arrURL[1] = ['co', this.countryModel.name];
    for(var i=0; i<2; i++) {
      // if(self.arrURL[i][1] && self.arrURL[i][1] != "undefined" && self.arrURL[i][1] != "undefined-undefined" && self.arrURL[i][1] != null)
      keyValURL += self.arrURL[i][0] + '-' + self.arrURL[i][1] + '-';
    };
    var resultURL = keyValURL.slice(0, keyValURL.length-1);
    var resultURL2 = resultURL.replace(/ /g, "_");
    $location.path(page + '-' + resultURL2);
    };

/*парсим ULR, полученные данные приводим к нужному формату*/
    var urlId = $stateParams.id;
/*Получаем возраст из ULR*/
  if(urlId.indexOf('-ag-')!= -1 ) {
    var start = urlId.indexOf('-ag-') + 4;
    var end = urlId.indexOf('-', start);
    var birthDateArrId  = urlId.slice(start, end);
    var start2 = urlId.indexOf('-', end );
    var end2 = urlId.indexOf('-', end+1);
    if(urlId.indexOf('-', end+1)==-1){
      var birthDateToArrId = urlId.slice(start2+1, urlId.length);
    } else var birthDateToArrId = urlId.slice(start2+1, end2);
  } else {
    var birthDateArrId = 18;
    var birthDateToArrId = 60;
  };
/*Получаем страну из ULR*/
    if(urlId.indexOf('-co-')!= -1) {
      var start = urlId.indexOf('-co-') + 4;
      var end = urlId.indexOf('-', start);
      if(urlId.indexOf('-', start)==-1) {
        var country2 = urlId.slice(start, urlId.length);
      } else var country2 = urlId.slice(start, end);
      ;
    } else var country2 = undefined;
    if(country2)
      var country = country2.replace(/_/g, " ");
/*Приводим к нужному формату для API запроса*/
  this.counryUrl = country;
  var dateBirthdateFrom = new Date().getTime()-((24 * 3600 * 365.25 * 1000)*birthDateArrId);
  var resFromDate = new Date(dateBirthdateFrom);
  var resMonth = resFromDate.getMonth() +1;
  var arrRes = new String(resFromDate).split(' ');
  this.birthdateTo = arrRes[3] + '-' + resMonth + '-' + arrRes[2];
  var dateBirthdateTo = new Date().getTime()-((24 * 3600 * 365.25 * 1000)*birthDateToArrId);
  var resToDate = new Date(dateBirthdateTo);
  var arrRes2 = new String(resToDate).split(' ');
  this.birthdateFrom = arrRes2[3] + '-' + resMonth + '-' + arrRes2[2];
  /*Полученные данные в нужном формате*/
  this.fromDateModel = { name: birthDateArrId };
  this.toDateModel = { name: birthDateToArrId };
  this.countryModel = { name: country };


  /*Функция перестраивает массив и записывает в другой*/
  this.randomNum = function(arr, resArr) {
    for(var i=this.offsetForReq; i<arr.length; i++) {
      var res = arr[i];
      var index = Math.floor(Math.random() * (arr.length - this.offsetForReq) + this.offsetForReq);
      if(!resArr[index]) {
        resArr[index] = res;
      } else i-=1;
    };
  };

  this.paginCount = 16;
  this.girlsAll = [];
  this.offsetForReq = 0;
  this.girlsAll2 = [];
  this.girlsAll0 = [];

  this.functionPa = function(arr) {
    if(arr && arr.length>16) {
      this.girlsAll = arr.slice(0, this.paginCount);
    } else this.girlsAll = arr;
  };
  this.addPhotoGirl = function(arr) {
          if(arr && arr.length) {
            for(var i=0; i<arr.length; i++) {
              if(arr[i] &&arr[i].user &&
                arr[i].user.mainphoto &&
                arr[i].user.mainphoto.pathOfQuad &&
                arr[i].user.mainphoto.pathOfQuad!=null) {
                var photo = arr[i].user.mainphoto.pathOfQuad;
                arr[i].photoAvatar = photo.slice(0, photo.length-4) + '_220_220_auto' + photo.slice(-4);;
              } //else arr[i].photoAvatar = null;
            }
          }
        };
/*Функция делает запрос к сервису, чтобы получить леди согласно выбранных параметров*/
  this.girlsAllGet = function() {
    var self = this;
    var options = {
      birthdateFrom: this.birthdateFrom,
      birthdateTo: this.birthdateTo,
      countryId: this.countryIdURL,
      direction: 'asc',
      limit: 50,
      offset: this.offsetForReq
    };
    girlsAllService.getGirlsAll(options).$promise.then(
      function(data) {
        self.girlTotal = data.totalCount;
        for(var i=0; i<data.girls.length; i++) {
          self.girlsAll0.push(data.girls[i]);
        };
        self.randomNum(self.girlsAll0, self.girlsAll2);
        self.functionPa(self.girlsAll2);
        self.addPhotoGirl(self.girlsAll);
        if(self.paginCount<self.girlTotal) {
          self.buttonAddGirls = true;
        } else self.buttonAddGirls = false;
      },
      function(error) {
        console.log(error);
      }
    );
  };
/*Функция пагинации - добавляем, пока есть кого добавлять*/
  this.paginaGirl = function() {
    this.paginCount += 16;
    if(this.paginCount>this.offsetForReq + 50) {
      this.offsetForReq += 50;
      this.girlsAllGet();
      };
    if(this.paginCount>this.offsetForReq || this.paginCount==this.offsetForReq) {
      this.functionPa(this.girlsAll2);
      this.addPhotoGirl(this.girlsAll);
    };
    if(this.girlsAll2 && this.paginCount<this.girlTotal) {
      this.buttonAddGirls = true;
    } else this.buttonAddGirls = false;
  };
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
/*Функция подставляет в название фото нужные параметры*/
  this.photoAvatar2 = function(arg) {
    var photo = String(arg);
    photo = photo.slice(0, photo.length-4) + '_220_220_auto' + photo.slice(-4);
    return photo;
  };
/*Функция делает запрос к сервису  и получает названия стран*/
  this.getCountries = function() {
    var self = this;
    girlsAllService.getCountries().$promise.then(
      function(data) {
        self.countries = data;
        self.arrCountries = self.countries.countries;
        self.arrCountries = self.countries.countries;
        var addAllCountries = {
          id: 0,
          name: 'All countries'
        };
        self.arrCountries.unshift(addAllCountries);
        for(var i=0; i<self.arrCountries.length; i++) {
          if(self.arrCountries[i].name==self.counryUrl) {
            self.countryIdURL = self.arrCountries[i].id;
            self.girlsAllGet();
          }
        };
      },
      function(error) {
        console.log(error);
      }
    );
  };
  this.getCountries();
    this.offset = 0;
  this.stories = [];
  this.getStories = function () {
    var option = {
      limit: 8,
      offset: this.offset
    };
    var self = this;
    storiesService.getAllStories(option).$promise.then(
      function(data) {
        self.stories = data.stories;
        // for(var i=0; i<data.stories.length; i++) {
        //   self.stories.push(data.stories[i]);
        // }
        // if(data.totalCount<self.offset + 8)
        //   self.showPagin = true;

        setTimeout(function(){
        var owl = $("#owl-demo");

      owl.owlCarousel({
          items : 2, //10 items above 1000px browser width
          itemsDesktop : [1000,2], //5 items between 1000px and 901px
          itemsDesktopSmall : [900,3], // betweem 900px and 601px
          itemsTablet: [600,2], //2 items between 600 and 0
          itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
      });

      // Custom Navigation Events
      $(".next").click(function(){
        owl.trigger('owl.next');
      })
      $(".prev").click(function(){
        owl.trigger('owl.prev');
      })
      var owl2 = $("#owl-demo2");

      owl2.owlCarousel({
          items : 1, //10 items above 1000px browser width
          itemsDesktop : [1000,2], //5 items between 1000px and 901px
          itemsDesktopSmall : [900,3], // betweem 900px and 601px
          itemsTablet: [600,2], //2 items between 600 and 0
          itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
      });

      // Custom Navigation Events
      $(".next").click(function(){
        owl2.trigger('owl.next');
      })
      $(".prev").click(function(){
        owl2.trigger('owl.prev');
      })

      }, 1500);

      },
      function(error) {
        console.log(error);
      }
    );
  };
  this.getStories();

  this.sliceText = function(text) {
    var newText = text.slice(0, 300) + ' ...';
    return newText;
  };
};

girlsAllController.$inject = ['$document', '$location', '$stateParams','userService', 'girlsAllService', '$rootScope', '$http', '$timeout', '$interval', 'storiesService'];