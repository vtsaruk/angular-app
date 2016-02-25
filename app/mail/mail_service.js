module.exports = mailService;;

function mailService ($resource) {

  var mailResource = $resource('/api/mail/:mail_id',
    { mail_id:'@id' },
    {
      getMessages: {
        method: 'GET',
        params: {
          type: '@type',
          relations: 'Sender,Recipient',

        }
      }
    });

  this.getAllMessages = function () {
    return mailResource.get({type: 'inbox', relations: 'Sender,Recipient'});
  };

  return this;
};


mailService.$inject = ['$resource'];;
