module.exports = userService;

function userService ($resource) {
  var userResource = $resource('/api/users');

  this.getUser = function () {
    return userResource.get({ relations: '{ "mainphoto": {} }' });
  };


  return this;
};

userService.$inject = ['$resource'];