module.exports = chatController;

function chatController ($document, $location, $cookies, chatService, userService, socketFactory) {

  var self2 = this;
  this.onlineModel = true;
  this.messages = [];
/*Функция выделяет в меню online, request, recent текущее нахождение*/
  this.acitivNavLi = function(index) {
    var el = angular.element(document.getElementsByClassName('main-members-nav'));
    el[0].childNodes[1].className = '';
    el[0].childNodes[3].className = '';
    el[0].childNodes[5].className = '';
    el[0].childNodes[index].className = 'active';
  };
/*Функции "changeDirectory" переключапют деректории online, request, recent*/
  this.changeDirectory1 = function(index) {
    this.requestModel = false;
    this.recentModel = false;
    this.onlineModel = true;
    this.acitivNavLi(index);
  };
  this.changeDirectory2 = function(index) {
    this.onlineModel = false;
    this.requestModel = true;
    this.recentModel = false;
    this.acitivNavLi(index);
  };
  this.changeDirectory3 = function(index) {
    this.onlineModel = false;
    this.requestModel = false;
    this.recentModel = true;
    this.acitivNavLi(index);
  };
/*Функция отрисовывает состояние Start chat*/
  this.isStartChat = function(partner) {
    if (!partner.sessionId ||
        (partner.sessionId && partner.startDateTime && partner.ceaseDateTime) ||
        (partner.sessionId && partner.isCancelled) ||
        (partner.sessionId && partner.isDeclined)
        ){
      return true;
    } else {
      return false;
    }
  };
/*Функция отрисовывает состояние Waiting request*/
  this.isWaitingRequest = function(partner, groupId) {
    // console.log(['sessionId', 'startDateTime', 'isInitByBoy'].map(function (val) {
    //     return 'partner.' + val + ' = ' + partner[val];
    //   }).join(', ') + 'gropupId = ' + groupId);
    if(partner.sessionId && (!partner.startDateTime) && (partner.isInitByBoy == groupId) && (partner.isDeclined == 0) && (partner.isCancelled == 0)) {
      return true;
    } else {
      return false;
    }
  };
/*Функция отрисовывает состояние Accept and decline chat*/
  this.acceptAndDeclineChat = function(partner, groupId) {
    // console.log(['sessionId', 'startDateTime', 'isInitByBoy'].map(function (val) {
    //     return 'partner.' + val + ' = ' + partner[val];
    //   }).join(', ') + 'gropupId = ' + groupId);
    if(partner.sessionId && (!partner.startDateTime) && (partner.isInitByBoy != groupId) && (partner.isDeclined == 0) && (partner.isCancelled == 0)) {
    // console.log('inbound req for '+ partner.sessionId);
      return true;
    } else {
    // console.log('no inbound req for ' + partner.sessionId);
      return false;
    }
  };
/*Функция отрисовывает состояние Chatting now*/
  this.chattingNow = function(partner) {
    if(partner.startDateTime && (!partner.ceaseDateTime)) {
      return true;
    } else {
      return false;
    }
  };
/*Функция отрисовывает в переписке сообщение отправленное или полученное*/
  this.addClassMessages = function(typeMsg) {
    return typeMsg=='inbound'? true: false;
  };
/*Функция убирает день отправки у сегоднешнего сообщения*/
   this.dayShow = function(sentTimeMsg) {
    if(new Date().getTime() - new Date(sentTimeMsg).getTime() > new Date().getUTCHours()*3600*1000+ new Date().getMinutes()*60*1000) {
      return true;
    } else false;

  };
/*счетчик*/
  this.count = 0;
/*Функция отресовавает день отправки письма*/
  this.functionDate = function(sentTimeMsg) {

    if(new Date().getTime() - new Date(sentTimeMsg).getTime() > new Date().getUTCHours()*3600*1000+ new Date().getMinutes()*60*1000) {
      // self2.count += 1;
      var day = '';
      // // console.log('count');
      // // console.log(count);
      // if(self.count<10) {
      //   day = 'Yesterday';
      // } else day = 'Date';
      // return self2.count;
      return 'Yesterday';
    }
  };

  self2.partners = {};
/*Функция отслеживает событие-сигнал addPartner и записывает данные партнёров*/
  chatService.on('addPartner', function (data) {
    self2.partners[data.id] = data;
    // console.log(self2 .partners);

  });
/*Функция делает сигнал-запрос на получение данных о партнёрах*/
  chatService.emit('getCurChatPartners', {});
/*Функция отправляет запрос на чат сессию без видео*/
  this.sendRequest = function(id) {
    chatService.emit('sendRequest', { partnerId: id, withVideo: false });
  };
/*Функция подтверждение на сессию*/
  this.approveRequest = function(Id) {
    // console.log(Id);
    chatService.emit('approveRequest', { sessionId: Id });
  };
/*Функция отклоненея предлагаемой сессии*/
  this.declineRequest = function(Id) {
     // console.log(Id);
    chatService.emit('declineRequest', { sessionId: Id });
  };
/*Функция окончания сессии*/
  this.endChatSession = function(Id) {
    // console.log(Id);
    chatService.emit('endChatSession', { sessionId: Id });
  };
/*Функция отправляет сообщение в переписке*/
  this.sendMsg = function(Id, msg) {
    console.log(Id + ' , ' + msg);
    chatService.emit('sendMsg', { partnerId: Id, content: msg });
    this.addMsgModel = "";
  };

  this.removePartner = function(Id) {
    chatService.emit('removePartner', { partnerId: Id });
  };
/*Функция запрашивает переписку сообщений с выбранным партнёром*/
  this.correspondence = function(partner) {
    this.namePartner = partner.firstname;
    this.partnerID = partner.id;
    this.sessionID = partner.sessionId;
    this.partnerAge = partner.age;
    // console.log('this.partnerID');
    // console.log(this.partnerID);
    var arr = angular.element(document.getElementsByClassName('main-members-item clearfix'));
    for(var i=0; i<arr.length; i++) {
      arr[i].className = 'main-members-item clearfix';
    };
    chatService.emit('getChatLogDeeper', { partnerId: partner.id });
  };

  chatService.on('oldMsg', function(data) {
    console.log(data);

    self2.messages.push(data);
    self2.lastMessageID = self2.messages[self2.messages.length-1].msgId;
    // console.log("self2.lastMessageID");
    // console.log(self2.lastMessageID);


    // self2.messages = self2.messages.concat(data);
    // console.log(self2.messages);
  });

  chatService.on('newMsg', function(data) {

    self2.messages.unshift(data);
    // console.log('newMsg');
    // console.log(data);
  });

/*Функция ослеживает сообытие scroll и добавляет письма*/
  //jQuery(function($) {
    $('.chat-box').on('scroll', function(event) {
        // console.log(event);
        if($(this).scrollTop() + $(this).innerHeight() + 100 >= $(this)[0].scrollHeight) {
          // console.log('end reached');
          // console.log(self2.partnerID + ' , ' + self2.lastMessageID);
          chatService.emit('getChatLogDeeper', { partnerId: this.partnerID, lastMsgId:self2.lastMessageID });
        }
    });
  //});

  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
        console.log(self.user.user.id);
        // self.getlogChat(self.user.user.id);
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.getUserData();

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