module.exports = chatController;

function chatController ($document, $location, $cookies, chatService, userService, socketFactory) {
  var self2 = this;

  self2.partners = {};

  chatService.on('addPartner', function (data) {
    self2.partners[data.id] = data;
    console.log(self2 .partners);
    console.log('hello');
  });
  chatService.emit('getCurChatPartners', {});

  // var partners = {};
  // var myIoSocket = io.connect('http://irinadating.loc/');

  // mySocket = socketFactory({
  //   ioSocket: myIoSocket
  // });
  // mySocket.on('addPartner', function (data) {
  //  partners[data.id] = data;
  //  console.log(data);
  // console.log('hello');
  // });
  // mySocket.emit('getCurChatPartners', {});

  // var partners = {};
  // var myIoSocket = io.connect('http://irinadating.loc/');

  // mySocket = socketFactory({
  //   ioSocket: myIoSocket
  // });
  // mySocket.on('addPartner', function (data) {

  //   partners[data.id] = data;
  //   console.log(data);
  // });
  // console.log('hello!!!');
  // mySocket.emit('getCurChatPartners', {});

  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
        //console.log(self.user.user.id);
        // self.getlogChat(self.user.user.id);
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.getUserData();


  // this.MyData = chatService;
  // console.log(this.MyData);




  this.getOnline = function () {
    var self = this;

    chatService.getChat().$promise.then(
      function(data) {
        self.online = data;
        console.log(self.online);

      },
      function(error) {
        console.log(error);
      }
    );
  };


   // var Cookie = $cookies.getAll();
   // console.log('Cookie');
   // console.log(Cookie.PHPSESSID);

    // var c = angular.element(document.cookie)
    // console.log(String(c));


  this.getlogChat = function (id) {
    var self = this;
    chatService.logChat(id).$promise.then(
      function(data) {
        self.session = data;
        console.log(self.session);
        self.getOnline();
      },
      function(error) {
        console.log(error);
      }
    );
  };


};

chatController.$inject = ['$document', '$location', '$cookies', 'chatService', 'userService', 'socketFactory'];