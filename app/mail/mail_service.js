module.exports = mailService;

function mailService ($resource) {


  var mailResource = $resource('/api/mail/:mail_id',
    { mail_id:'@id' },
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
  this.getMessagesId = function (id) {
    return mailResource.get();
  }
  this.correspondenceGet = function(id) {
    return mailResource.get({partnerId:id})
  }
  this.deleteMessage = function (id) {
    return mailResource.delete({id: id});
  };


  return this;
};


mailService.$inject = ['$resource'];;
