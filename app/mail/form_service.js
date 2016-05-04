module.exports = formService;
/*фабрика*/
function formService ($resource) {

  var formResource = $resource('/api/photos',
  { },
    { savePhoto: {
      method: 'POST',
      // params: {
      //     photo: '@photo',
      //     isMainPhoto:'@isMainPhoto'
      // }
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
      }
    }
  );
/*Загружаем фото*/
  this.addPhotos = function (photo) {
    return formResource.savePhoto({}, photo);
  };

  return this;
};

formService.$inject = ['$resource'];