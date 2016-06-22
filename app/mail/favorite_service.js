module.exports = favoriteService;

function favoriteService($resource) {
  var favoriteResource = $resource('api/users/:user_id/favorite', { user_id: '@id' },
    {
      addUserFavor: {
        method:'POST',
        params: {
          id: '@id'
        }
      },
      saveGirlFavorit: {
          method: 'POST',
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined }
        },
      deletedUserFavor: {
        method: 'DELETE',
        params: {
          id: '@id'
        }
      }
    }
  );
  var favorGetResource = $resource('api/users/me/favorite');

  this.getFavorGirls = function(options) {
    return favorGetResource.get({
      limit: options.limit,
      offset: options.offset,
      relations: '{"country":{}, "mainphoto": {} }' });
  }
  this.addFavorStatus = function(fd, Id) {
    return favoriteResource.saveGirlFavorit( { user_id: Id }, fd );
  };
  this.deleteFavorStatus = function(Id) {
    return favoriteResource.deletedUserFavor( { user_id: Id, id: Id } );
  };
  return this;
};

favoriteService.$inject = ['$resource'];
