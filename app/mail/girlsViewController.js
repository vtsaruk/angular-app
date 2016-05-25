module.exports = girlsViewController;

function girlsViewController ($document, $stateParams, $location, girlsService, $scope, $rootScope, userService) {
/*Забираем id из URL*/
  var id = $stateParams.id.split('-')[4];
/*Функция определяет возраст*/
  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
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
  };
  /*Функция делает запрос к сервису и получает данные залогиненного пользователя*/
  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        $rootScope.global2 = data;
        self.user = data;
        $('.head_footer').show();
      },
      function(error) {
        console.log(error);
        $('.head_footer').show();
      }
    );
  };

  this.getUserData();
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
            items : 4, //10 items above 1000px browser width
            itemsDesktop : [1000,2], //5 items between 1000px and 901px
            itemsDesktopSmall : [900,3], // betweem 900px and 601px
            itemsTablet: [600,2], //2 items between 600 and 0
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
        //}
      }, 1500);
  }
/*Функция меняет название фотграфии подставляя _300_420_crop*/
  // this.photoAvatar2 = function(arg) {
  //   var photo = String(arg);
  //   if(photo.length<64) {
  //     photo = photo.slice(0, 51) + '_300_420_crop' + photo.slice(-4);
  //   }
  //   return photo;
  // };
  this.photoAvatar2 = function(arg) {
    var photo = String(arg);
    photo = photo.slice(0, photo.length-4) + '_300_420_crop' + photo.slice(-4);
    console.log('pathOfQuad:' + photo);
    return photo;
  };
/*Функция получает данные девушки из girlsService*/
  this.girlsIdGet = function(id) {
    var self = this;
    girlsService.getGirlsId(id).$promise.then(
      function(data) {
        self.girlsId = data;
        self.photosGirl(self.girlsId.girl.userId);
        self.caruselPhotoVideo();
        if(self.girlsId.girl.user &&
          self.girlsId.girl.user.mainphoto &&
          self.girlsId.girl.user.mainphoto.pathOfQuad &&
          self.girlsId.girl.user.mainphoto.pathOfQuad!=null) {
          var photo = self.girlsId.girl.user.mainphoto.pathOfQuad
          self.girlsId.girl.photoAvatar = photo.slice(0, photo.length-4) + '_300_420_crop' + photo.slice(-4);
        } else self.girlsId.girl.photoAvatar = 'null'
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
};

girlsViewController.$inject = ['$document', '$stateParams', '$location', 'girlsService', '$scope', '$rootScope', 'userService'];