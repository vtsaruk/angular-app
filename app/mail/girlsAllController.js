module.exports = girlsAllController;

function girlsAllController ($document, $location, $stateParams, userService, girlsAllService, $rootScope) {

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
  //   console.log(User.name + ' , ' + User.password);
    // userService.loginUser(User).$promise.then(
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
  // };

  this.registUser = function(User) {
    var self = this;
    // var user = {};

var fd = new FormData();
    fd.append('email', User.email);
    fd.append('password', User.message);
    fd.append('secret', '6LeROR4TAAAAAHB7MP4Yx0sgA28bimUC3vyiOpkA');
    fd.append('response', this.myRecaptchaResponse);


    // user.email = User.email;
    // user.password = User.password;
    // user.secret = '6LeROR4TAAAAAHB7MP4Yx0sgA28bimUC3vyiOpkA';
    // user.response = this.myRecaptchaResponse;//'g-recaptcha-response';
    // console.log('this.myRecaptchaResponse');
    // console.log(this.myRecaptchaResponse);
    //user.response = $('#recaptcha-token').value;//'g-recaptcha-response';
    console.log(User.email + ' , ' + User.password);
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
        console.log('$rootScope.global2')
        console.log($rootScope.global2)
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.getUserData();

  // if(this.user.user.additionalData.groupId) {
  //   $rootScope.global2 = this.user.user.additionalData.groupId;
  //   console.log('$rootScope.global');
  //   console.log($rootScope.global);
  // }
/*Функция делает запрос к сервису  и получает названия стран*/
  this.getCountries = function() {
    var self = this;
    girlsAllService.getCountries().$promise.then(
      function(data) {
        self.countries = data;
        self.arrCountries = self.countries.countries;
        $('select').select2();
        for(var i=0; i<self.arrCountries.length; i++) {
          if(self.arrCountries[i].name==self.counryUrl) {
            self.countryIdURL = self.arrCountries[i].id
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
/*Функция поиска леди по возрасту и стране, делает API запрос*/
  this.searchGirls = function(page) {
    var self = this;
    this.arrURL = [];
    var keyValURL = '';
    this.arrURL[0] = ['ag', this.fromDateModel + "-" + this.toDateModel];
    this.arrURL[1] = ['co', this.countryModel];
    for(var i=0; i<2; i++) {
      // if(self.arrURL[i][1] && self.arrURL[i][1] != "undefined" && self.arrURL[i][1] != "undefined-undefined" && self.arrURL[i][1] != null)
      keyValURL += self.arrURL[i][0] + '-' + self.arrURL[i][1] + '-';
    };

    var resultURL = keyValURL.slice(0, keyValURL.length-1);
    // console.log(resultURL);

    $location.path(page + '-' + resultURL);
    };

  // this.searchHomeGirls = function() {

  //   $location.path('/home/' + this.fromDateModel + '-' + this.toDateModel + '-' + this.countryModel)
  //     console.log('this.fromDateModel, this.toDateModel');
  //    console.log(this.fromDateModel, this.toDateModel, this.countryModel);
  // };
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
        var country = urlId.slice(start, urlId.length);
      } else var country = urlId.slice(start, end);
      ;
    } else var country = undefined;
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
  this.fromDateModel = birthDateArrId;
  this.toDateModel = birthDateToArrId;
  this.countryModel = country;
/*Функция делает запрос к сервису, чтобы получить леди согласно выбранных параметров*/
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
  if(this.totalPage==this.page) this.buttonAdd = true;
/*Функция пагинации - добавляем, пока есть кого добавлять*/
  this.paginaGirl = function() {
    if (this.totalPage){
      if(this.totalPage > this.page) {

        this.girlsAllGet();
        this.page += 1;
        this.limit+= 4;
        if(this.totalPage==this.page) this.buttonAdd = true;
      }
    } else {
      this.girlsAllGet();
      this.page += 1;
      this.limit += 4;
      if(this.totalPage==this.page) this.buttonAdd = true;
    }
  };
/*Функция создаёт массив данных для поля возраст в поиске*/
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
/*Функция подставляет в название фото нужные параметры*/
  this.photoAvatar2 = function(arg) {
    var photo = String(arg);
    photo = photo.slice(0, photo.length-4) + '_220_220_auto' + photo.slice(-4);
    return photo;
  };
/*меняем стили на выпадающих списках в select*/
  $(document).ready(function(){
   setTimeout(function(){

    // $('select').select2();


    // $('.selectpicker').selectpicker({
    //     style: 'btn-info',
    //     size: 4
    //   });
  }, 1000);
  });

  // this.disabled = true;
  // this.country2 = {};
  // this.country2.selected = undefined;
  // this.countries2 = [ // Taken from https://gist.github.com/unceus/6501985
  //   {name: 'Afghanistan', code: 'AF'},
  //   {name: 'Åland Islands', code: 'AX'},
  //   {name: 'Albania', code: 'AL'},
  //   {name: 'Algeria', code: 'DZ'},
  //   {name: 'American Samoa', code: 'AS'},
  //   {name: 'Andorra', code: 'AD'}
  // ];

};

girlsAllController.$inject = ['$document', '$location', '$stateParams','userService', 'girlsAllService', '$rootScope'];