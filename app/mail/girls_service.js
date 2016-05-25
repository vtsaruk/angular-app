module.exports = girlsService;
/*Фабрика*/
function girlsService ($resource) {
  var girlsResource = $resource('/api/girls/:girls_id',
    { girls_id: '@id' });
/*Функция делает запрос на данные девушки по API /api/girls/:id */
  this.getGirlsId = function (id) {
    return girlsResource.get({ girls_id: id, relations: '{"user":{"country":{}, "mainphoto": {} } }' });
  };

  var girlPhotoResource = $resource('/api//users/:girls_id/photos', { girls_id: '@id' });
/*Функция делает запрос на фото для карусели по API /api/users/:id/photos  */
  this.getGirlPhoto = function (id) {
    return girlPhotoResource.get({ girls_id: id });
  };

  return this;
};

girlsService.$inject = ['$resource'];
