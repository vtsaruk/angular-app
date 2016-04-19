module.exports = girlsViewController;


function girlsViewController ($document, $stateParams, $location, girlsService, $scope) {

  var id = $stateParams.id.split('-')[4];

  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
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

  this.photoAvatar2 = function(arg) {
    var photo = String(arg);
    if(photo.length<64) {
      photo = photo.slice(0, 51) + '_300_420_crop' + photo.slice(-4);
    }
    return photo;
  };

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

girlsViewController.$inject = ['$document', '$stateParams', '$location', 'girlsService', '$scope'];