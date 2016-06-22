module.exports = chatService;
/*фабрика*/
var meConfig = require('../config');
function chatService (socketFactory) {
  // console.log('meConfig')
  // var getPartnerChat =  io.connect(meConfig.ioConnect),
  //   getPartnerChat.on('addPartner', function() { /* notify about new message */ });
  // console.log(meConfig.ioConnect)
  return  socketFactory({ioSocket: io.connect(meConfig.ioConnect)});
  // return  socketFactory({ioSocket: io.connect('http://irinadating.loc/')});
};

chatService.$inject = ['socketFactory'];
