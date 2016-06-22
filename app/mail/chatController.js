module.exports = chatController;
var meConfig = require('../config');

function chatController ($document, $location, chatService, userService, socketFactory, $rootScope, favoriteService, $timeout) {
  this.addFavorit = [];
  this.mouseenterFav = function(index) {
    this.addFavorit[index] = true;
  };
  this.mouseleaveFav = function(index) {
    this.addFavorit[index] = false;
  };
  this.letterActiv = [];
  this.mouseenterLetter = function(index) {
    this.letterActiv[index] = true;
  };
  this.mouseleaveLetter = function(index) {
    this.letterActiv[index] = false;
  };
  /*Функция присваивает фаворит статус для девушки*/
  this.addfavoritStatus = function(id) {
    var fd = new FormData();
    fd.append('id', id);
    favoriteService.addFavorStatus(fd, id);
  };
  this.phtoPartner = meConfig.ioConnect;

  var self2 = this
  self2.partners = [];
  /*Функция отклоняет все предложения начать сесию в чате при logOut*/
  $rootScope.logOut = function() {
    var self = this;
    chatService.emit('getCurChatPartners', {});
    chatService.on('addPartner', function (data) {
      self2.partners[data.id] = data;
      for(var i in self2.partners) {
        if(self2.partners[i] && self2.partners[i].sessionId && (!self2.partners[i].startDateTime) && (self2.partners[i].isDeclined == 0) && (self2.partners[i].isCancelled == 0)){
          chatService.emit('declineRequest', { sessionId: self2.partners[i].sessionId });
        }
      }
    });
  };
  /*Функция запрашивает данные пользователя через userService*/
  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
        $rootScope.global2 = data;
        $rootScope.hrefLadies =false;
        $('.head_footer').show();
        // self.getlogChat(self.user.user.id);
      },
      function(error) {
        console.log(error);
        $location.path('/home/-ag-18-30-co-Ukraine');
        $('.head_footer').show();
      }
    );
  };

  this.getUserData();
  // console.log(this.phtoPartner);
  var self2 = this;
  this.onlineModel = true;
  this.messages = [];
  this.messages2 = [];
  this.messages3 = [];
  this.part = [];
  this.notSendLetters = [];
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
    if(partner.sessionId && (!partner.startDateTime) && (partner.isDeclined == 0) && (partner.isCancelled == 0)) {
      return true;
    } else {
      return false;
    }//(partner.isInitByBoy == groupId) &&
  };
/*Функция отрисовывает состояние Accept and decline chat для мужчин*/
  this.acceptAndDeclineChat = function(partner, groupId) {
    // console.log(['sessionId', 'startDateTime', 'isInitByBoy'].map(function (val) {
    //     return 'partner.' + val + ' = ' + partner[val];
    //   }).join(', ') + 'gropupId = ' + groupId);
    if(partner.sessionId && (!partner.startDateTime) &&(partner.isInitByBoy != groupId) && (partner.isDeclined == 0) && (partner.isCancelled == 0)) {
    // console.log('inbound req for '+ partner.sessionId);
      return true;
    } else {
    // console.log('no inbound req for ' + partner.sessionId);
      return false;
    }
  };
  /*Функция отрисовывает состояние Accept and decline chat для девушек*/
  this.acceptAndDeclineChat2 = function(partner) {
    if(partner.sessionId && (!partner.startDateTime) &&(partner.isInitByBoy!=0) && (partner.isDeclined == 0) && (partner.isCancelled == 0)) {
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
  /*Функция делает сигнал-запрос на получение данных о партнёрах*/
  chatService.emit('getCurChatPartners', {});
  /*Функция отправляет запрос на чат сессию без видео*/
  this.sendRequest = function(id) {
    chatService.emit('sendRequest', { partnerId: id, withVideo: false });
  };
  /*Функция подтверждение на сессию*/
  this.approveRequest = function(Id) {
    this.showButtonSend = true;
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
    // console.log(Id + ' , ' + msg);
    this.notSendLetters[Id] = '';
    chatService.emit('sendMsg', { partnerId: Id, content: msg });
    this.addMsgModel = "";
  };

  this.removePartner = function(Id) {
    chatService.emit('removePartner', { partnerId: Id });
  };
  this.funcActivStatu = function(partner) {
    // console.log(partner.id);
    return partner.id==this.partnerID? true: false;
  }
  /*Функция записывает дату дня в переписке*/
  this.dateInCorrespondence = function() {
    if(self2.messages2.length>2) {
      for(var i=0; i<self2.messages2.length; i++) {
        if(self2.messages[i] && self2.messages[i].sentTime && self2.messages2[i].sentTime && self2.messages[i+1] && self2.messages[i+1].sentTime && self2.messages2[i+1].sentTime) {
          self2.messages[0].sentTime2 = true;
          if(self2.messages[0].sentTime&&self2.messages[0].sentTime&&self2.messages3[0].sentTime.slice(0,10)==self2.messages3[1].sentTime.slice(0,10)) {
            self2.messages[0].sentTime2 = true;
          }
          var day = self2.messages2[i].sentTime.slice(0,10);
          var day2 = self2.messages2[i+1].sentTime.slice(0,10);
          if(day==day2 ) {
            if(self2.messages[i].sentTime2==true) {
              self2.messages[i].sentTime2=true
            } else self2.messages[i].sentTime2 = false;
          }
          else {
            self2.messages[i+1].sentTime2 = true;
          }
        }
      }
    }
  };
  this.deleteStatusNew = function(partnerID) {
    console.log(partnerID);
  // chatService.emit('markAllMsgsAsRead', { partnerId: partnerID });
  };
  this.messages = [];
  this.messages2 = [];
  this.messages3 = [];
  /*Функция запрашивает переписку сообщений с выбранным партнёром*/
  this.correspondence = function(partner) {
    // if(this.addMsgModel && this.partnerID==undefined) {
    //   this.notSendLetters[partner.id] = this.addMsgModel
    // };
    // this.deleteStatusNew(partner.id);
    // chatService.emit('markAllMsgsAsRead', { partnerId: partner.id });
    if(partner.startDateTime && (!partner.ceaseDateTime)) {
      this.showButtonSend = true;
    } else this.showButtonSend = false;
    if(this.addMsgModel) {
      this.notSendLetters[this.partnerID] = this.addMsgModel;
      // this.addMsgModel = '';
    }
    this.addMsgModel = this.notSendLetters[partner.id];
    this.namePartner = partner.firstname;
    this.partnerID = partner.id;
    this.sessionID = partner.sessionId;
    this.partnerAge = partner.age;
    this.photoAvatPartner = partner.photoAvatar;

    this.part[partner.id] = false;
    chatService.emit('getChatLogDeeper', { partnerId: partner.id });
  };
/*Обработка события получения сообщения для переписки*/
  chatService.on('oldMsg', function(data) {
    // console.log(data);
    self2.messages.push(data);
    self2.messages2.push(data);
    self2.messages3 = self2.messages2;
    self2.messages3.slice(1);
    self2.lastMessageID = self2.messages[self2.messages.length-1].msgId;
    self2.dateInCorrespondence();
  });
  this.funcShow = function(arg) {
    return arg? true: false;
  };
  // chatService.on('inboundReqBadge', function(data) {
  //   console.log(data);
  // });

  // chatService.on('inboundNewMsgBadge', function(data) {
  //   console.log(data);
  // });
  this.deleteStatusNew = function(partnerID) {
  chatService.emit('markAllMsgsAsRead', { partnerId: partnerID });
  };
  /*Получение нового письма, только что написанного для пользователя в переписке*/
  chatService.on('newMsg', function(data) {
    if(self2.partnerID!=data.partnerId) {
      self2.part[data.partnerId] = { newLetters: true };
    }
    // console.log(self2.partners[data.partnerId]);

    // if(self2.partners[self2.partnerID]) {
    //   self2.namePartner = self2.partners[self2.partnerID].firstname;
    //   self2.sessionID = self2.partners[self2.partnerID].sessionId
    //   self2.partnerAge = self2.partners[self2.partnerID].age
    //   self2.sessionID = self2.partners[self2.partnerID].sessionId
    // }
    // self2.partnerID = data.partnerId;
    // self2.messages = [];
    // chatService.emit('getChatLogDeeper', { partnerId: data.partnerId });
    self2.messages.unshift(data);
    self2.messages2.unshift(data);
    self2.messages3.unshift(data);
    // console.log(self2.messages);
    self2.dateInCorrespondence();
  });
  this.pushOldMessage = function(partnerID, lastMsgID) {
    chatService.emit('getChatLogDeeper', { partnerId: partnerID, lastMsgId: lastMsgID });
  };

  this.namePartnerFunc = function() {
    if(self2.partnerID && self2.partners[self2.partnerID].firstname)
    return self2.partners[self2.partnerID].firstname;
  };
  this.allRequestDec = function(data) {
    for(var key in data) {
      if(data[key].sessionId && !data[key].startDateTime) {
        chatService.emit('declineRequest', { sessionId: data[key].sessionId });
        chatService.emit('cancelRequest', { sessionId: data[key].sessionId })
      }
    }
    // (partner.sessionId && (!partner.startDateTime) &&(partner.isInitByBoy!=0) && (partner.isDeclined == 0) && (partner.isCancelled == 0))
  };




  // for(var i=this.offsetForReq; i<arr.length; i++) {
  //     var res = arr[i];
  //     var index = Math.floor(Math.random() * (arr.length - this.offsetForReq) + this.offsetForReq);
  //     if(!resArr[index]) {
  //       resArr[index] = res;
  //     } else i-=1;
  //   };
  self2.online
  self2.arrPartData = [];
  self2.partners = {};
  self2.arrParners = [];
/*Функция отслеживает событие-сигнал addPartner и записывает данные партнёров*/
  chatService.on('addPartner', function (data) {
    self2.partners[data.id] = data;
    self2.partners[data.id].newLetters = false;
    self2.arrParners[data.id] = data;

    for(var key in self2.partners) {
        // self2.partners[key].isOnline = true;
      if(self2.partners[key] && self2.partners[key].id==self2.partnerID && self2.partners[key].startDateTime && self2.partners[key].ceaseDateTime) {
        self2.showButtonSend = false;
      };
      if(self2.partners[key] && self2.partners[key].id==self2.partnerID && self2.partners[key].startDateTime && (!self2.partners[key].ceaseDateTime)) {
        self2.showButtonSend = true;
      };
      if(self2.partners[key] && self2.partners[key].startDateTime && (!self2.partners[key].ceaseDateTime) && (!self2.partners[key].isOnline)) {
        self2.endChatSession(self2.partners[key].sessionId);
      };
      if(self2.partners[key] && self2.partners[key].sessionId && (!self2.partners[key].startDateTime) && (self2.partners[key].isDeclined == 0) && (self2.partners[key].isCancelled == 0) && (!self2.partners[key].isOnline)){
        chatService.emit('declineRequest', { sessionId: self2.partners[key].sessionId });
      };
    };
    // for(var i=0; i<self2.partners.length; i++) {
      // if(self2.partners[i] && self2.partners[i].id==self2.partnerID && self2.partners[i].startDateTime && self2.partners[i].ceaseDateTime) {
      // }
        // console.log(self2.partners[i].id);
    // }
  });
  this.randomNum = function(arr, resArr) {
    for(var i=0; i<arr.length; i++) {
      var res = arr[i];
      var index = Math.floor(Math.random() * arr.length);
      if(!resArr[index]) {
        resArr[index] = res;
      } else i-=1;
    };
  };


  this.randomArr = function() {
    self2.arrPartData = [];
    for(var key in self2.partners) {
      self2.arrPartData.push(self2.partners[key]);
    };
    self2.resultArr = [];
    self2.randomNum(self2.arrPartData, self2.resultArr);
    // console.log(self2.resultArr);
  };
  self2.arrPartData2 = [];
  self2.resultArr2 = [];
  this.randomArr2 = function(arr, resArr, arrPart) {
    arr = [];
    for(var key in arrPart) {
      arr.push(arrPart[key]);
    };
    resArr = [];
    self2.randomNum(arr, resArr);
    // console.log(resArr);
  };
  // this.randomArr();
  $timeout(this.randomArr2(self2.arrPartData2, self2.resultArr2, self2.partners), 3000);
/*Функция ослеживает сообытие scroll и добавляет письма*/
    $('.chat-box').on('scroll', function(event) {
        if($(this).scrollTop() + $(this).innerHeight() + 100 >= $(this)[0].scrollHeight) {
          chatService.emit('getChatLogDeeper', { partnerId: self2.partnerID, lastMsgId:self2.lastMessageID });
        }
    });
  $('.filter-girls-top-menu').hide();
  $('body').on('click', function(event) {
    if (event.target.className == 'show_filter_top_menu' ||
      event.target.className == 'clearfix show_filter_top_menu') {
      $('.filter-girls-top-menu').show();
    } else {
      $('.filter-girls-top-menu').hide();
    }
  });
};

chatController.$inject = ['$document', '$location', 'chatService', 'userService', 'socketFactory', '$rootScope', 'favoriteService', '$timeout'];