module.exports = ladyAllController;

function ladyAllController ($document, $location, $stateParams, userService, girlsAllService, $rootScope, $http, $timeout, $interval, favoriteService, chatService, storiesService) {

  /*парсим ULR, полученные данные приводим к нужному формату*/
    var urlId = $stateParams.id;
    var urlId2 = $stateParams.id.split('-')[0];
  /*Функция определяет возраст*/
  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
  };
  var self2 = this
  self2.partners = [];
  /*Функция отклоняет все предложения начать сесию в чате при logOut*/
  $rootScope.logOut = function() {
    var self = this;
    chatService.emit('getCurChatPartners', {});
    chatService.on('addPartner', function (data) {
      self2.partners[data.id] = data;
      for(var i in self2.partners) {
        if(self2.partners[i] && self2.partners[i].sessionId && (!self2.partners[i].startDateTime) && (self2.partners[i].isDeclined == 0) && (self2.partners[i].isCancelled == 0)){
          chatService.emit('declineRequest', { sessionId: self2.partners[i].sessionId });
        }
      }
    });
  };
  /*Функция делает запрос к сервису и получает данные залогиненного пользователя*/
  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        chatService.emit('getCurChatPartners', {});
        $rootScope.global2 = data;
        $rootScope.hrefLadies = true;
        self.user = data;
        $('.head_footer').show();
      },
      function(error) {
        $location.path('/home/-ag-18-30');
        console.log(error);
        $('.head_footer').show();
      }
    );
  };

  this.getUserData();
  /*Функция присваивает фаворит статус для девушки*/
  this.addfavoritStatus = function(id, index) {
    if(this.girlsAll[index]) {
      this.girlsAll[index].user.additionalData.isInFavorites = true;
    };
    if(this.favoritGirls[index]) {
      this.favoritGirls[index].additionalData.isInFavorites = true;
    };
    var fd = new FormData();
    fd.append('id', id);
    favoriteService.addFavorStatus(fd, id);
  };
  /*Функция убирает фаворит статус у девушки*/
  this.deleteFavoritStatus = function(id, index) {
    favoriteService.deleteFavorStatus(id);
    if(this.girlsAll[index]) {
      this.girlsAll[index].user.additionalData.isInFavorites = false;
    };
    if(this.favoritGirls[index]) {
      this.favoritGirls[index].additionalData.isInFavorites = false;
    };
  };
  this.isIfUndefined1 = function() {
    if(this.countryModel.name) {
      return '-co-' + this.countryModel.name;
    } else return '-co-All_countries';
  };
  this.isIfUndefined2 = function() {
    if(this.fromDateModel.name && this.toDateModel.name){
      return '-ag-' + this.fromDateModel.name + '-' + this.toDateModel.name;
    } else if(this.fromDateModel.name && !this.toDateModel.name) {
      return '-ag-' + this.fromDateModel.name + '-60';
    } else if(!this.fromDateModel.name && this.toDateModel.name) {
      return '-ag-18-' + this.toDateModel.name;
    } else return '';
  };
/*Функция поиска леди по возрасту и стране, делает API запрос*/
  this.searchGirls = function(page) {
    var result = this.isIfUndefined2() + this.isIfUndefined1();
    var resultURL = result.replace(/ /g, "_");
    $location.path(page + urlId2 + resultURL);
  };
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
  if(birthDateArrId) {
    var dateBirthdateFrom = new Date().getTime()-((24 * 3600 * 365.25 * 1000)*birthDateArrId);
    var resFromDate = new Date(dateBirthdateFrom);
    var resMonth = resFromDate.getMonth() +1;
    var arrRes = new String(resFromDate).split(' ');
    this.birthdateTo = arrRes[3] + '-' + resMonth + '-' + arrRes[2];
  };
  if(birthDateToArrId) {
  var dateBirthdateTo = new Date().getTime()-((24 * 3600 * 365.25 * 1000)*birthDateToArrId);
  var resToDate = new Date(dateBirthdateTo);
  var arrRes2 = new String(resToDate).split(' ');
  this.birthdateFrom = arrRes2[3] + '-' + resMonth + '-' + arrRes2[2];
  };

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
  this.offsetForReq = 0;

  this.functionPa = function(arr) {
    if(arr && arr.length>16)
      this.girlsAll = arr.slice(0, this.paginCount);
    else this.girlsAll = arr;
  };
  this.functionPa2 = function(arr) {
    if(arr && arr.length>16)
      this.favoritGirls = arr.slice(0, this.paginCount);
    else this.favoritGirls = arr;
  };
  this.addPhotoGirl = function(arr) {
          if(arr && arr.length) {
            for(var i=0; i<arr.length; i++) {
              if(arr[i] && arr[i].user &&
                arr[i].user.mainphoto &&
                arr[i].user.mainphoto.pathOfQuad &&
                arr[i].user.mainphoto.pathOfQuad!=null) {
                var photo = arr[i].user.mainphoto.pathOfQuad;
                arr[i].photoAvatar = photo.slice(0, photo.length-4) + '_220_220_auto' + photo.slice(-4);
              }
              if(arr[i] && arr[i].mainphoto && arr[i].mainphoto.pathOfQuad) {
                var photo = arr[i].mainphoto.pathOfQuad;
                arr[i].photoAvatar = photo.slice(0, photo.length-4) + '_220_220_auto' + photo.slice(-4);
              }
            }
          }
        };
        this.girlsAll = [];
        this.girlsAll2 = [];
        this.girlsAll0 = [];
/*Функция делает запрос к сервису, чтобы получить леди согласно выбранных параметров*/
  this.girlsAllGet = function() {
    var self = this;
    var options = {
      firstTimeActivatedAtFrom: this.firstTimeActivatedAtFrom,
      birthdateRemainingDays: this.birthdateRemainingDays,
      sort: this.sortType,
      birthdateFrom: this.birthdateFrom,
      birthdateTo: this.birthdateTo,
      countryId: this.countryIdURL,
      isOnline: this.isOnline,
      limit: 50,
      offset: this.offsetForReq
    };
    girlsAllService.getGirlsAll(options).$promise.then(
      function(data) {
        self.girlTotal = data.totalCount;
        for(var i=0; i<data.girls.length; i++) {
          self.girlsAll0.push(data.girls[i]);
        };
        // self.randomNum(self.girlsAll0, self.girlsAll2);
        self.functionPa(self.girlsAll0);
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
  this.favoritGirls = [];
  this.favoritGirls0 = [];
  this.favoritGirls2 = [];
  this.getFavoritGirls = function() {
    var self = this;
    var options = {
      limit: 50,
      offset: this.offsetForReq
    };
    favoriteService.getFavorGirls(options).$promise.then(
      function(data) {
        self.girlTotal = data.totalCount;
        for(var i=0; i<data.users.length; i++) {
          self.favoritGirls0.push(data.users[i]);
        };
        // self.randomNum(self.favoritGirls0, self.favoritGirls2);
        self.functionPa2(self.favoritGirls0);
        self.addPhotoGirl(self.favoritGirls);
        if(self.paginCount<self.girlTotal) {
          self.buttonAddGirls = true;
        } else self.buttonAddGirls = false;
      },
      function(error) {
        console.log(error);
      }
    );
  };
  /*Функция делает запрос к сервису  и получает названия стран*/
  this.getCountries = function() {
    var self = this;
    girlsAllService.getCountries().$promise.then(
      function(data) {
        self.countries = data;
        self.arrCountries = self.countries.countries;
        var addAllCountries = {
          id: 0,
          name: 'All countries'
        };
        self.arrCountries.unshift(addAllCountries);
        if(self.counryUrl && self.counryUrl!= 'All countries') {
          for(var i=0; i<self.arrCountries.length; i++) {
            if(self.arrCountries[i].name==self.counryUrl) {
              self.countryIdURL = self.arrCountries[i].id;
              self.girlsAllGet();
            }
          }
        } else {
          self.counryUrl== 'All countries';
          self.girlsAllGet();
        }
      },
      function(error) {
        console.log(error);
      }
    );
  };
/*Функция пагинации - добавляем, пока есть кого добавлять*/
  this.paginaGirl = function() {
    this.paginCount +=3;//16;
    if(this.paginCount>this.offsetForReq+50) {
        this.offsetForReq += 50;
        if(this.girlsAll.length>0) {
          this.girlsAllGet();
        };
        if(this.favoritGirls.length>0) {
          this.getFavoritGirls();
        };
      };


    if(this.paginCount>this.offsetForReq || this.paginCount==this.offsetForReq) {
      if(this.girlsAll.length>0) {
        this.functionPa(this.girlsAll2);
        this.addPhotoGirl(this.girlsAll);
      };
      if(this.favoritGirls.length>0) {
        this.functionPa(this.favoritGirls2);
        this.addPhotoGirl(this.favoritGirls);
      };
    };
    if(this.paginCount<this.girlTotal) {
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
  if(urlId2=='All_Ladies') {
    this.sortType = 'rating';
    this.getCountries();
  };if(urlId2=='favorites') {
    this.filterGirls = true;
    this.getCountries();
  };
  if(urlId2=='Top_50') {
    this.filterGirls = true;
    this.sortType = 'rating';
    this.getCountries();
  };
  if(urlId2=='Upcoming_Birthdays') {
    this.sortType = 'random';
    this.birthdateRemainingDays = 7;
    this.getCountries();
  };
  if(urlId2=='New_Ladies') {
    this.sortType = 'random';
    var dateToday = new Date().getTime()-(24 * 3600*30*1000);
    var dateToday2 = new Date(dateToday)
    this.firstTimeActivatedAtFrom = dateToday2.getFullYear() + '-' + dateToday2.getMonth() + '-' + dateToday2.getDate();
    this.getCountries();
  };if(urlId2=='Online_Ladies') {
    this.sortType = 'random';
    this.isOnline = true;
    this.getCountries();
  };
/*Функция подставляет в название фото нужные параметры*/
  this.photoAvatar2 = function(arg) {
    var photo = String(arg);
    photo = photo.slice(0, photo.length-4) + '_220_220_auto' + photo.slice(-4);
    return photo;
  };
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

  $('.filter-girls-top-menu').hide();
  $('body').on('click', function(event) {
    if (event.target.className == 'show_filter_top_menu' ||
      event.target.className == 'clearfix show_filter_top_menu') {
      $('.filter-girls-top-menu').show();
    } else {
      $('.filter-girls-top-menu').hide();
    }
  });
};

ladyAllController.$inject = ['$document', '$location', '$stateParams','userService', 'girlsAllService', '$rootScope', '$http', '$timeout', '$interval', 'favoriteService', 'chatService', 'storiesService'];