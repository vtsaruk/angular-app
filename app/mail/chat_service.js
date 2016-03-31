module.exports = chatService;

function chatService ($resource) {
  var chatResource = $resource('/api/chat/online');

  this.getChat = function () {
    return chatResource.get({  });
  };


  return this;
};

chatService.$inject = ['$resource'];