module.exports = mailService;

function mailService ($resource) {


  var mailResource = $resource('/api/mail/:mail_id',
    { mail_id:'@id' },
    {
      getMessages: {
        method: 'GET',
        params: {
          type: '@type',
          limit: '@limit',
          offset: '@offset',
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
  };

  this.getAllMessages = function (options) {
    return mailResource.get({
      type: options.type,
      limit: options.limit,
      offset: options.offset,
      relations: '{ "sender":{ "country": {} } }'});
  };

  this.getMessagesLengthInbox = function() {
    return mailResource.get({ type: 'inbox' });
  };

  this.getMessagesLengthIntroductions = function() {
    return mailResource.get({ type: 'introductions' });
  };

  this.getMessagesId = function (id) {
    return mailResource.get({mail_id: id, relations: '{ "sender":{ "country": {} } }'});
  };

  this.correspondenceGet = function(id) {
    return mailResource.get({partnerId:id, relations: '{ "sender":{ "country": {} } }'})
  };

  this.deleteMessage = function (id) {
    return mailResource.delete({mail_id: id});
  };

  this.addMessage = function(message) {
    return mailResource.save(message);
  };


  return this;
};


mailService.$inject = ['$resource'];
