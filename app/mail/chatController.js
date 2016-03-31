module.exports = chatController;

function chatController ($document, $location, chatService, userService ) {
  this.Hello = "Hello!!!!!";
  this.getOnline = function () {
    var self = this;

    chatService.getChat().$promise.then(
      function(data) {
        self.online = data;


      },
      function(error) {
        console.log(error);
      }
    );
  };
  this.getOnline();
};

chatController.$inject = ['$document', '$location', 'chatService', 'userService'];