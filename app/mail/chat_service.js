module.exports = chatService;

function chatService (socketFactory) {
  // var chatResource = $resource('/chat/online');

  // this.getChat = function () {
  //   return chatResource.get({  });
  // };

  // var logChatResource = $resource('/chat/user/:user_id/login', {user_id: '@id'});

  // this.logChat = function(id) {
  //   return logChatResource.get({ user_id: id });
  // }
  //return this;

   // var dataStream = $websocket('ws://irinadating.loc/socket.io/');
   // // console.log($websocket('ws://echo.websocket.org'));
   //    var collection = [];

   //    dataStream.onMessage(function(message) {
   //      collection.push(JSON.parse(message.data));
   //    });

   //    var methods = {
   //      collection: collection,
   //      get: function() {
   //        dataStream.send(JSON.stringify({ action: 'get' }));
   //      }
   //    };

   //    return methods;


  // var partners = {};
  // var myIoSocket = io.connect('http://irinadating.loc/');

  // mySocket = socketFactory({
  //   ioSocket: myIoSocket
  // });
  // mySocket.on('addPartner', function (data) {
  //  partners[data.id] = data;
  //  console.log(data);
  // });
  // console.log('hello');
  // mySocket.emit('getCurChatPartners', {});

  return  socketFactory({ioSocket: io.connect('http://irinadating.loc/')});
};

chatService.$inject = ['socketFactory'];