module.exports = chatService;
/*фабрика*/
function chatService (socketFactory) {
  return  socketFactory({ioSocket: io.connect('http://irinadating.loc/')});
};

chatService.$inject = ['socketFactory'];