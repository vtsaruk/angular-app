module.exports = userService;

function userService ($resource) {
  // var userResource = $resource('/api/users', {},
  //   {
  //     registUser: {
  //         method:'POST',
  //         params: {
  //           email: '@email',
  //           password: '@password',
  //           secret: '@secret',
  //           response: '@response'
  //         }
  //       }
  //   }
  // );

  // var logUser = $resource('/index/signin', { },
  //   {
  //     receiveUser: {
  //       method: 'POST',
  //       params: {
  //         name: @name,
  //         password: @password;
  //       }
  //     }
  //   });

  // this.loginUser = function(User) {
  //   return logUser.receiveUser({
  //     name: User.name,
  //     password: User.password
  //   })
  // };

  var userResource = $resource('/api/users', {},
   {
      registUser: {
        method: 'POST',
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }
    }
  );
/*Отправляем feedback*/
  this.registUser = function(formData) {
    return userResource.registUser({}, formData);
  };

  // this.registUser = function(User) {
  //   return userResource.registUser({
  //     email: User.email,
  //     password: User.password,
  //     secret: User.secret,
  //     response: User.response
  //   })
  // };
  this.currentUserData = {};

  this.getUser = function () {
    return userResource.get({ relations: '{ "mainphoto": {} }' });
  };


  return this;
};

userService.$inject = ['$resource'];