
module.exports = userService;

function userService ($resource) {


  var userResource = $resource('/api/user',
    { },
    {
      getMessages: {
        method: 'GET'
      }
    });

  this.getUser = function () {
    return userResource;
  };


  return this;
};


userService.$inject = ['$resource'];