module.exports = mailService;

function mailService ($resource) {


  var mailResource = $resource('/api/mail/:mail_id',
    { mail_id:'@mail_id' },
    {
      getMessages: {
        method: 'GET',
        params: {
          type: '@type',
          relations: 'Sender,Recipient'
        }
      }
    });

  this.getAllMessages = function (type) {
    return mailResource.get({type: type, relations: 'Sender,Recipient'});
  };

  this.deleteMessage = function (id) {
    return mailResource.delete({mail_id: id});
  };


  return this;
};


mailService.$inject = ['$resource'];;
