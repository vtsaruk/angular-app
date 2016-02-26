module.exports = userService;

function userService ($resource) {
  var userResource = $resource('/api/users');

  this.getUser = function () {
    return userResource.get();
  };

  return this;
};

userService.$inject = ['$resource'];