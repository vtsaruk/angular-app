module.exports = favoriteService;

function favoriteService() {
  var favoriteResource = $resource('/users/:user_id/favorite', { user_id: '@id' },
    {
      addUserFavor: {
        method:'POST',
        params: {
          id: '@id'
        }
      },
      deletedUserFavor: {
        method: 'DELETE',
        params: {
          id: '@id'
        }
      }
    }
  );

  this.addFavorStatus = function(id) {
    return favoriteResource.addUserFavor(userId);
  };
  this.deleteFavorStatus = function(id) {
    return favoriteResource.deletedUserFavor(iuserId);
  };
  return this;
};

favoriteService.$inject = ['$resource'];
