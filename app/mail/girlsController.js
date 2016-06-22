module.exports = girlsController;

function girlsController ($document, $stateParams, $location, mailService, userService, girlsService, $scope, $rootScope, favoriteService) {
  /*Забираем id из URL*/
  var idArr =$stateParams.id.split('-');
  var id = idArr[idArr.length-1];
  /*Функция определяет возраст*/
  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;
  };
  /*Функция зпускает карусель фото и видео*/
  this.caruselPhotoVideo = function() {
    var owl4 = $("#owl-demo4");

      owl4.owlCarousel({
          items : 1, //10 items above 1000px browser width
          itemsDesktop : [1000,2], //5 items between 1000px and 901px
          itemsDesktopSmall : [900,3], // betweem 900px and 601px
          itemsTablet: [600,2], //2 items between 600 and 0
          pagination:true,
          itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
      });

      // Custom Navigation Events
      $(".profile-left-side-carousel .next").click(function(){
        owl4.trigger('owl.next');
      })
      $(".profile-left-side-carousel .prev").click(function(){
        owl4.trigger('owl.prev');
      })
      // }, 2000);

      setTimeout(function(){
        var owl5 = $("#owl-demo5");
        owl5.owlCarousel({
          items : 2, //10 items above 1000px browser width
          itemsDesktop : [1000,3], //5 items between 1000px and 901px
          itemsDesktopSmall : [900,4], // betweem 900px and 601px
          itemsTablet: [600,4], //2 items between 600 and 0
          pagination:true,
          itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
        });
        // Custom Navigation Events
        $(".profile-right-side-photos-container .next").click(function(){
          owl5.trigger('owl.next');
        })
        $(".profile-right-side-photos-container .prev").click(function(){
          owl5.trigger('owl.prev');
        })
      $('.js-item').magnificPopup({
          type: 'image',
          gallery:{
              enabled:true
          }
      })
      }, 1500);
  };
/*Функция получает данние пользователя из сервиса userService*/
  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        $rootScope.global2 = data;
        $rootScope.hrefLadies = false;
        self.user = data;
        $('.head_footer').show();
      },
      function(error) {
        $location.path('/home/-ag-18-30-co-Ukraine');
        console.log(error);
        $('.head_footer').show();
      }
    );
  };

this.getUserData();
   // var id = $stateParams.id.split('-')[4];
/*Функция получает данные девушки из girlsService*/
  this.girlsIdGet = function(id) {
    var self = this;
    girlsService.getGirlsId(id).$promise.then(
      function(data) {
        self.girl = data.girl;
        self.photosGirl(self.girl.userId);
        if(self.girl.user &&
          self.girl.user.mainphoto &&
          self.girl.user.mainphoto.pathOfQuad &&
          self.girl.user.mainphoto.pathOfQuad!=null) {
          var photo = self.girl.user.mainphoto.pathOfQuad
          self.girl.photoAvatar = photo.slice(0, photo.length-4) + '_300_420_crop' + photo.slice(-4);
        } else self.girl.photoAvatar = 'null'
        self.caruselPhotoVideo();
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.girlsIdGet(id);
/*Функция делает запрос к сервису и получает фотографии для фото-карусели*/
  this.photosGirl = function(id) {
    var self = this;
    girlsService.getGirlPhoto(id).$promise.then(
      function(data) {
        self.girlsPhotos = data;


      },
      function(error) {
        console.log(error);
      }
    );
  };


/*Функция показавет весь текст письма в переписке*/
  this.switchMore = function(letterText) {
    if (letterText==null) {
      return true;}
      else if(letterText.length>200) {
      return false;
    } else return true;
  };
/*Функция обрезает текст письма, если в письме больше 90 символов*/
  this.letterTextSlice = function(letterText, switchComment) {
    if (switchComment) {
       return letterText;
    } else {
      if (letterText==null) {
        return 0;
      } else if(letterText.length>200) {
        var text = letterText.slice(0, 200);
        return text;
      }
      return letterText;
    }
  }
  /*Функция присваивает фаворит статус для девушки*/
  this.addfavoritStatus = function(id) {
    this.girl.user.additionalData.isInFavorites = true;
    var fd = new FormData();
    fd.append('id', id);
    favoriteService.addFavorStatus(fd, id);
  };
  /*Функция убирает фаворит статус у девушки*/
  this.deleteFavoritStatus = function(id) {
    this.girl.user.additionalData.isInFavorites = false;
    favoriteService.deleteFavorStatus(id);
  };
  /*показуем или скрываем подменю с фильтрами*/
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


girlsController.$inject = ['$document', '$stateParams', '$location', 'mailService', 'userService', 'girlsService', '$scope', '$rootScope', 'favoriteService'];