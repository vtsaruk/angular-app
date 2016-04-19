module.exports = girlsController;


function girlsController ($document, $stateParams, $location, mailService, userService, girlsService, $scope) {

  this.photoAvatar2 = function(arg) {
    var photo = String(arg);
    photo = photo.slice(0, photo.length-4) + '_300_420_crop' + photo.slice(-4);
    return photo;
  };

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

  var id = $stateParams.id.split('-')[4];

  this.girlsIdGet = function(id) {
    var self = this;
    girlsService.getGirlsId(id).$promise.then(
      function(data) {
        self.girlsId = data;
        self.photosGirl(self.girlsId.girl.userId);
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
      return false;}
      else if(letterText.length>90) {
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
      } else if(letterText.length>90) {
        var text = letterText.slice(0, 90);
        return text;
      }
      return letterText;
    }
  }

};


girlsController.$inject = ['$document', '$stateParams', '$location', 'mailService', 'userService', 'girlsService', '$scope'];