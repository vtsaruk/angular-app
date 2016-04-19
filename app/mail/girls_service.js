module.exports = girlsService;

function girlsService ($resource) {
  var girlsResource = $resource('/api/girls/:girls_id',
    { girls_id: '@id' });

  this.getGirlsId = function (id) {
    return girlsResource.get({ girls_id: id, relations: '{"user":{"country":{}, "mainphoto": {} } }' });
  };

  var girlPhotoResource = $resource('/api//users/:girls_id/photos', { girls_id: '@id' });

  this.getGirlPhoto = function (id) {
    return girlPhotoResource.get({ girls_id: id });
  };

  return this;
};

girlsService.$inject = ['$resource'];