module.exports = mailService;

function mailService ($resource) {

  var mailResource = $resource('/api/mail/:mail_id',
    { mail_id:'@id' },
    {
      getMessages: {
        method: 'GET',
        params: {
          dateTimeFrom: '@dateTimeFrom',
          dateTimeTo: '@dateTimeTo',
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
            isPaid: '@isPaid',
            isRead: '@isRead'
          },
      updateRead: {
        method: 'PATCH',
          params: {
            isRead: '@isRead'
          },
      }
      }
    });
  //this.mService = mailResource;
  this.addMessage2 = function (msg) {
    return mailResource.saveMesg(msg);
  };

  this.paymentLetter = function(id) {
    return mailResource.update({ id: id, isPaid: true, isRead: true });
  };

  this.readLetter = function(id) {
    return mailResource.update({ id:id, isRead: true });
  };

  this.getAllMessages = function (options) {
    return mailResource.get({
      dateTimeFrom: options.dateTimeFrom,
      dateTimeTo: options.dateTimeTo,
      type: options.type,
      limit: options.limit,
      offset: options.offset,
      relations: '{"recipient": {"country": {}, "mainphoto": {}, "girl": {} }, "sender": { "country": {}, "girl": {}, "mainphoto": {} } }'
      // relations: '{ "sender":{ "country": {}, "girl": {}, "mainphoto": {} } }'
    });
  };

  this.getMessagesLengthInbox = function() {
    return mailResource.get({ type: 'inbox' });
  };

  this.getMessagesLengthIntroductions = function() {
    return mailResource.get({ type: 'introductions' });
  };

  this.getMessagesId = function (id) {
    return mailResource.get({
      mail_id: id,
      relations: '{"recipient": {"country": {}, "mainphoto": {} }, "sender": { "country": {}, "girl": {}, "mainphoto": {} } }'
    });
  };

  // this.correspondenceGet = function(id, timeFrom, timeTo) {
  //   return mailResource.get({partnerId:id, dateTimeFrom: timeFrom, dateTimeTo: timeTo, relations: '{ "sender":{ "country": {}, "girl": {}, "mainphoto": {} } }'})
  // };

  this.correspondenceGet = function(options) {
    return mailResource.get({
      dateTimeFrom: options.dateTimeFrom,
      dateTimeTo: options.dateTimeTo,
      limit: options.limit,
      offset: options.offset,
      partnerId: options.partnerId,
      relations: '{ "sender":{ "country": {}, "girl": {}, "mainphoto": {} } }'
    })
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
