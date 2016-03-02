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
        },
      },
      saveMesg: {
          method: 'POST',
          params: {
            type: '@type',
            text: '@text',
            recipientId: '@recipientId'
          },
        },
      update: {
        method: 'PATCH',
          params: {
            isPaid: '@isPaid'
          },
      }
    });
  //this.mService = mailResource;
  this.addMessage2 = function (msg) {
    return mailResource.saveMesg(msg);
  };

  this.paymentLetter = function(id) {
    return mailResource.update({id: id, isPaid: true});
  }

  this.getAllMessages = function (type) {
    return mailResource.get({type: type, relations: 'Sender,Recipient'});
  };
  this.getMessagesId = function (id) {
    return mailResource.get({mail_id: id, relations: 'Sender,Recipient'});
  }
  this.correspondenceGet = function(id) {
    return mailResource.get({partnerId:id})
  }
  this.deleteMessage = function (id) {
    return mailResource.delete({id: id});
  };
  this.addMessage = function(message) {
    return mailResource.save(message);
  }


  return this;
};


mailService.$inject = ['$resource'];;
