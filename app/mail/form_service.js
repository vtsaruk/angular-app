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
  var removePhotoRes = $resource('/api/photos/:photo_id',
    { photo_id: '@id' },
    { removeAvatarPhoto: {
        method: 'PATCH',
        isArray: false,
        headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
        isMainPhoto: '@isMainPhoto',
        startX: '@startX',
        startY: '@startY',
        width: '@width',
        height: '@height'
        // transformRequest: angular.identity
  //       // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        },
        logAvatarPhoto: {
          method: 'PATCH',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function (data, headersGetter) {
            var str = [];
            for (var d in data) {
              str.push(
                encodeURIComponent(d) + '=' + encodeURIComponent(data[d])
              );
            }
            console.log(str.join('&'))
            return str.join('&');
          }
         }
    }
  );
  var getAllPhotoUser = $resource('/api/users/:user_id/photos', { user_id: '@id' });

/*Загружаем фото*/
  this.addPhotos = function (photo) {
    return formResource.savePhoto( {}, photo);
  };
  /*Функция выводит все фото пользователя*/
  this.getPhotosUser = function(Id) {
    return getAllPhotoUser.get({ user_id: Id, id:Id });
  };
  this.removeAvatPhot = function(fd, photoId, data) {
  // this.removeAvatPhot = function(data) {
    // console.log('option');
    // console.log(option);
    // return removePhotoRes.removeAvatarPhoto({
    //   photo_id: option.id}, {
    //   isMainPhoto: option.isMainPhoto,
    //   startX: option.startX,
    //   startY: option.startY,
    //   width: option.width,
    //   height: option.height}
    // );
    // return removePhotoRes.removeAvatarPhoto({ photo_id: photoId }, fd);
    return removePhotoRes.logAvatarPhoto({ photo_id: photoId }, data );
  };

  return this;
};

formService.$inject = ['$resource'];
