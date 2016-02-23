module.exports = mailService;

function mailService ($resource) {

  var mailResource = $resource('http://mahmud.com.ua/api/mail/', {}, {
      getMessages: {
        method: 'GET',
        params: {
          user_id: '@id',
          type: '@type'
        }
      }
    });

  this.getAllMessages = function () {
    return mailResource.get({user_id: 1, type: 'inbox'});
  };

  return this;
};


mailService.$inject = ['$resource'];
