module.exports = mailController;

function mailController ($document, $location, $timeout, $anchorScroll, mailService, userService , $scope, $rootScope, favoriteService, chatService) {

  this.showLetter = true;
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

  /*Функция присваивает фаворит статус для девушки*/
  this.addfavoritStatus = function(id) {
    var self = this;
    var fd = new FormData();
    fd.append('id', id);
    favoriteService.addFavorStatus(fd, id).$promise.then(
      function(data) {
        if(self.messagesId)
          self.messagesId.letter.sender.additionalData.isInFavorites = true;
        for(var i =0; i<self.messages.letters.length; i++) {
          if(self.messages.letters[i].sender.id==id)
            self.messages.letters[i].sender.additionalData.isInFavorites = true;
        }
      },
      function(error) {
        console.log(error);
      }
    );
  };
  this.hearRed = 'assets/angular-app/public/img/grey-like-message-grey.png';
  this.hearGrey = 'assets/angular-app/public/img/grey-like-message.png';
  this.mouseenterImgFav = function() {
    this.hearGrey = 'assets/angular-app/public/img/grey-like-message.png'
    this.hearRed = 'assets/angular-app/public/img/grey-like-message-grey.png';
  };
  this.mouseleaveImgFav = function() {
    this.hearGrey = 'assets/angular-app/public/img/grey-like-message-grey.png';
    this.hearRed = 'assets/angular-app/public/img/grey-like-message.png';
  };
  this.deleteFavoritStatus = function(id) {
    var self = this;
    favoriteService.deleteFavorStatus(id).$promise.then(
      function(data) {
        if(self.messagesId)
          self.messagesId.letter.sender.additionalData.isInFavorites = false;
        for(var i =0; i<self.messages.letters.length; i++) {
          if(self.messages.letters[i].sender.id==id)
            self.messages.letters[i].sender.additionalData.isInFavorites = false;
        }
      },
      function(error) {
        console.log(error);
      }
    );
  };
  /*Функция определяет возраст*/
  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
  };
  /*Функция показывает меню выделения писем прочитанных, непрочитанных*/
  this.showSelectCheck = function() {
    this.showTumblerCheck = true;
    this.deletedSelect = false;
  };
  /*Функция в меню выделения писем прочитанных, непрочитанных показывает текущее состояние */
  this.removeClassTab = function(arg) {
    var list = angular.element(document.getElementsByClassName('message-tabs-item'));
    for(var i=0; i<list.length; i++){
      list[i].className = 'message-tabs-item';
    };
    list[arg].className = 'message-tabs-item active';
  };
  /*Функция показывает и скрывает фильтры по датам*/
  this.showList = function(){
    this.listDiv = this.listDiv ? false : true;
  };
  /*Функция показывает и скрывает список возможностей в области отправки письма*/
  this.showFilter = function() {
    this.toDate = new Date();
    // var dateFrom = new Date().getTime()-((24 * 3600 * 365.25 * 1000)*20);
    // this.fromDate = new Date(dateFrom);
    this.filterDiv = this.filterDiv ? false : true;
  };
  /*Функция запрашивает данные залогиненного пользователя*/
  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
        chatService.emit('getCurChatPartners', {});
        $rootScope.global2 = data;
        $rootScope.hrefLadies =false;
        self.userID = data.user.id;
        $('.head_footer').show();
      },
      function(error) {
        console.log(error);
        $location.path('/home/-ag-18-30-co-Ukraine');
        $('.head_footer').show();
      }
    );
  };

  this.getUserData();
  /*Функция, отвечающая за параметры в запросе на получение писем*/
  this.changeType = function (type) {
    this.resultFromDate = undefined;
    this.resultToDate = undefined;
    this.tumbler = true;
    this.limit = 20;
    this.page = 0;
    this.type = type || 'inbox';
    this.getMessages();
    this.onThisWeek = false;
    this.onLastWeek = false;
    if(type=='outbox')
      this.showLetter = false
    else this.showLetter = true;
  };
  /*Функция запроса писем через сервис*/
  this.getMessages = function () {
    if(this.tumbler==false) {
      this.tumbler=true
    }
    var self = this;
    var options = {
      dateTimeFrom: self.resultFromDate,
      dateTimeTo: self.resultToDate,
      type: self.type,
      limit: self.limit,
      offset: self.limit * self.page
    };
    mailService.getAllMessages(options).$promise.then(
      function(data) {
        self.messages = data;
        self.arrLength = self.messages.totalCount/20;
        self.arrLengthCeil = Math.ceil(self.arrLength);
        self.arrIndex = [];
        for(var i=1; i<self.arrLengthCeil+1; i++) {
          self.arrIndex.push(i);
        };
        angular.forEach(self.messages.letters, function(letter, index) {
          self.messages.letters[index]['deleted'] = false;
        });

        for(var i=0; i<self.messages.letters.length; i++) {
          if(self.messages.letters[i].senderId==self.user.user.id) {
            self.messages.letters[i].isRead = true;
          }
        }
      },
      function(error) {
        console.log(error);
      });
    };
/*Функция пагинации выделяет номер страницы из списка страниц*/
  this.paginaAddClass = function(index) {
    var arrPaginaClass = angular.element(document.getElementsByClassName('pagina'));
    for(var i=0; i<arrPaginaClass.length; i++) {
      arrPaginaClass[i].childNodes[0].className = '';
    };
    arrPaginaClass[index].childNodes[0].className = 'text_width';
  };
/*Функция пагинации выделяет первую страницу из списка страниц при переходе по каталогам*/
  this.firstNamberPagin = function() {
    var self = this;
    $timeout(function(){
      if(self.arrIndex && self.arrIndex.length>0) {
        self.paginaAddClass(0);
      }
    },100);
  };
/*Функция переключения пагинации при нажатии на next */
  this.getNextMessages = function() {
    if (this.page < this.arrLengthCeil-1) {
      this.page += 1;
      this.getMessages();
      this.paginaAddClass(0);
      this.paginaAddClass(this.page);
    }
  };
/*Функция переключения пагинации при нажатии на pre*/
  this.getPrevMessages = function() {
    if(this.page>0) {
    this.page -= 1;
    this.getMessages();
    this.paginaAddClass(this.page);
  }
  };
  this.getIndexPage = function(index) {
    this.page = index-1;
    this.getMessages();
    this.paginaAddClass(this.page);
  }
/*Функция запрашивает общее кол-во писем Introductions*/
  this.getMessagesIntroductions = function() {
    var self = this;
    mailService.getMessagesLengthIntroductions().$promise.then(
      function(data) {
        self.messagesIntroductions = data;
      },
      function(error) {
        console.log(error);
      }
    );
  };
/*Функция чтения письма и вызывает функцию переписки*/
  this.readTheLetter = function(id, partnerid){
    if(this.tumbler) {
        this.tumbler = false;
      };
    var self = this;
    mailService.getMessagesId(id).$promise.then(
      function(data) {
        self.messagesId = data;
        self.correspondence(partnerid);
      },
      function(error) {
        console.log(error);
      }
    );
    $anchorScroll.yOffset = 200;
    $anchorScroll();

  };
  /*Функция возвращает кол-во непрочитанных писем с типом Inbox*/
  this.getMessagesInboxLength = function() {
    var self = this;
    mailService.getMessagesLengthInbox().$promise.then(
      function(data) {
        self.messagesInbox = data;
      }, function(error) {
        console.log(error);
      }
    );
  };

  this.getMessagesInboxLength();
  /*Функция отвечает за стили письма в переписке*/
  this.addClass = function(arg1, arg2, arg3) {
    if(arg3==false) {
      return 2;
    }else return arg1==arg2? 0:1;
  };
  /*Функция оплаты письма, чтобы прочитать его*/
  this.payment =function(id, partnerid) {
    var self = this;
    mailService.paymentLetter(id).$promise.then(
      function(data) {
        self.messagIdPay = data;
        self.readTheLetter(id);
        self.correspondence(partnerid);
        self.getMessagesInboxLength();
      },
      function(error) {
        console.log(error);
        alert('У вас не денег на счете');
      }
    );
  };
/*Функция чтения конкретного письма*/
  this.readLadyLetter =function(id, partnerid) {
    var self = this;
    mailService.readLetter(id).$promise.then(
      function(data) {
        self.messagIdPay = data;
        self.readTheLetter(id);
        self.correspondence(partnerid);
        self.getMessagesInboxLength();
      },
      function(error) {
        console.log(error);
      }
    );
  };
/*Функция запроса на переписку*/
  this.correspondence = function(partnerId) {
    var self = this;
    self.partnerId = partnerId;
    var options = {
      partnerId: self.partnerId,
      dateTimeFrom: self.resultFromDate,
      dateTimeTo: self.resultToDate,
      limit: self.limit2,
      offset: 0
    };
    mailService.correspondenceGet(options).$promise.then(
      function(data) {
        self.letterCor =data;
        self.letterAllCorLength = self.letterCor.totalCount;
        self.countPage2 = self.letterAllCorLength / 20;
        self.totalPage2 = Math.ceil(self.countPage2);
        // console.log(self.letterCor);
        if(self.totalPage2==1) {
          self.buttonAddLetter = true;
        }
        for(var i=0; i<self.letterCor.letters.length; i++) {
          if(self.letterCor.letters[i].senderId==self.user.user.id)
          self.letterCor.letters[i].isRead = true;
        }


      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.page2 = 0;
  this.limit2 = 20;
/*Функция пагинации для переписки*/
  this.paginaLetterCor = function() {
     if (this.totalPage2){
      this.page2 += 1;
      this.limit2 += 20;
      this.correspondence(this.partnerId);
      if(this.page==this.totalPage2)
        this.buttonAddLetter = true;
    }
  };
  /*Функция обрезает текст письма, если в письме больше 90 символов*/
  this.switchMore = function(letterText) {
    if (letterText==null) {
      return false;}
      else if(letterText.length>90) {
      return false;
    } else return true;
  };
  /*Функция показавет весь текст письма в переписке*/
  this.letterTextSlice = function(letterText, switchComment) {
    if (switchComment) {
       return letterText;
    } else {
      if (letterText==null) {
        return 0;
      } else if(letterText.length>90) {
        var text = letterText.slice(0, 90);
        return text;
      }
      return letterText;
    }
  }
  /*Функция устанавливает позицию слева/справа для каритнки в переписке*/
  this.showSendMessage =function(senderId, userId) {
    return senderId==userId? true: false;
  }
  this.textArea = false;
  /*функция создаёт эффект моргания при отправке письма*/
  this.textAreaTime = function() {
    var self = this;
    self.textArea = true;
    $timeout(function(){
      self.textArea = false;
    },600);
  }
/*Функция отправляет письмо по API*/
  this.addMessage = function(id) {
    var self = this;
    var fd = new FormData();
    fd.append('text', this.newMessage);
    fd.append('recipientId', id);
    fd.append('type', 'box');
    // var msg = {
    //   text: this.newMessage,
    //   recipientId: id,
    //   type: 'box'
    // };
    mailService.addMessage2(fd).$promise.then(
    // mailService.addMessage2(msg).$promise.then(
      function(data) {
        self.textAreaTime();
        self.newMessage = '';
        self.correspondence(id);
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.changeType('inbox');
/*Функция перемещает выделенное письмо в папку Delete*/
  this.deleteMessages = function() {
    var self = this;
    angular.forEach(this.messages.letters, function(letter) {
      if(letter.deleted) {
        mailService.deleteMessage(letter.id).$promise.then(
          function(data) {
            self.getMessages();
            self.getMessagesInboxLength();
            self.deletedSelect = false;
          }, function(error) {
            console.log(error);
          });
      }
    })
  };
/*Функция выделяет кнопку отправки письма в каталог Delete после выделения письма*/
  this.classMessagesDeleted = function() {
    var self = this;
    var res = 0;
    if(this.messages) {
      angular.forEach(this.messages.letters, function(letter) {
        if(letter.deleted){
          res = 1;
        }
      })
    }
    return res;
  };

  this.addRecipient = function(arg1, arg2) {
    return arg1==arg2? 1:0;
  };
/*функция сортировки писем за текущую неделю*/
  this.onThisWeekDate = function() {
    this.onLastWeek = false;
    this.onThisWeek = true;
    var toDate = new Date();
    var numberToDay = new Date().getDay();
    var firstDaySec = toDate.setDate(toDate.getDate() - (numberToDay-1));
    var firstDayWeek = new Date(firstDaySec);
    var month = firstDayWeek.getMonth() + 1;
    var arrNum = new String(firstDayWeek).split(' ');
    this.resultFromDate = arrNum[3] + "-" + month + "-" + arrNum[2] + " " + "00:00:00";

    var arrNum2 = new String(new Date()).split(' ');
    var month2 = toDate.getMonth() + 1;
    this.resultToDate = arrNum2[3] + "-" + month2 + "-" +arrNum2[2] + " " + arrNum2[4];
    if(this.tumbler) {
      this.getMessages();
    } else this.correspondence(this.partnerId);
    $timeout(function() {
      this.resultFromDate = undefined;
      this.resultToDate = undefined;
    },500);
  };
/* функция сортировки писем за предыдущую неделю*/
  this.onLastWeekDate = function() {
    this.onLastWeek = true;
    this.onThisWeek = false;
    var toDate = new Date();
    var numberToDay = new Date().getDay();
    var lastDayWeekSec = toDate.setDate(toDate.getDate() - numberToDay);
    var lastDayWeek = new Date(lastDayWeekSec);
    var month = lastDayWeek.getMonth() + 1;
    var arrNum = new String(lastDayWeek).split(' ');
    this.resultToDate = arrNum[3] + "-" + month + "-" + arrNum[2] + " " + "23:59:59";

    var firstDayWeekSec = new Date().setDate(new Date().getDate() - (numberToDay + 6));
    var firstDayWeek = new Date(firstDayWeekSec);
    var month2 = firstDayWeek.getMonth() + 1;
    var arrNum2 = new String(firstDayWeek).split(' ');
    this.resultFromDate = arrNum2[3] + "-" + month2 + "-" + arrNum2[2] + " " + "00:00:00";
    if(this.tumbler) {
      this.getMessages();
    } else this.correspondence(this.partnerId);
    $timeout(function() {
      this.resultFromDate = undefined;
      this.resultToDate = undefined;
    },500);
  };

  this.showDate = function() {
    var arrDate2 = new String(this.fromDate).split(' ');
    var month2 = this.fromDate.getMonth() +1;
    this.resultFromDate = arrDate2[3] + '-' + month2 + '-' + arrDate2[2] + ' ' + '00:00:00';
    var arrDate = new String(this.toDate).split(' ');
    var month = this.toDate.getMonth() + 1;
    this.resultToDate = arrDate[3] + '-' + month +'-' + arrDate[2] + ' ' + '23:59:59';
    if(this.fromDate.getTime()<this.toDate.getTime()) {
      if(this.tumbler){
        this.getMessages();
      } else this.correspondence(this.partnerId);
      $timeout(function(){
        this.resultFromDate = undefined;
        this.resultToDate = undefined;
      },500);
    }
  };
/*Функция выделяет кнопку сортировки, если корректно выбраны даты */
  this.watchInputDate = function(fromDate, toDate) {
    if(fromDate && toDate)
    return fromDate.getTime()<toDate.getTime()? true : false;
  };
/*Функция сброса временных параметров для сортировки*/
  this.resetSortDate = function() {
    this.onThisWeek = false;
    this.onLastWeek = false;
    this.toDate = undefined;
    this.fromDate = undefined;
    this.resultFromDate = undefined;
    this.resultToDate = undefined;
    this.buttonAddLetter = false;
    if(this.tumbler){
      this.getMessages();
    } else this.correspondence(this.partnerId);
  };
/*Функция выделения всех писем*/
  this.selectAllCheck = function() {
    var self = this;
    this.unselectCheck();
    this.addClassSelectCheck(1);
    angular.forEach(this.messages.letters, function(letter, index) {
      self.messages.letters[index]['deleted'] = true;
    });
    this.showTumblerCheck = false;
    if(this.messages.letters)
      this.deletedSelect = true;
  }
/*Функция выделения прочитанных писем*/
  this.readSelectCheck = function() {
    var self = this;
    this.unselectCheck();
    this.addClassSelectCheck(3);
    angular.forEach(this.messages.letters, function(letter, index) {
      if(self.messages.letters[index].isRead==true) {
        self.messages.letters[index]['deleted'] = true;
        self.deletedSelect = true;
      }
    });
    this.showTumblerCheck = false;
  };
/*Функция выделения непрочитанных писем*/
  this.unreadSelectCheck = function() {
    var self = this;
    this.unselectCheck();
    this.addClassSelectCheck(5);
    angular.forEach(this.messages.letters, function(letter, index) {
      if(self.messages.letters[index].isRead==false) {
        self.messages.letters[index]['deleted'] = true;
        self.deletedSelect = true;
      }
    });
    this.showTumblerCheck = false;
  };
/*Функция отмены всех выделенных писем*/
  this.unselectCheck = function() {
    var self = this;
    this.addClassSelectCheck(7);
    angular.forEach(self.messages.letters, function(letter, index) {
      self.messages.letters[index]['deleted'] = false;
    });
    this.showTumblerCheck = false;
    this.deletedSelect = false;
  };

  this.addClassSelectCheck = function(index) {
    var list = angular.element(document.getElementsByClassName('message-sort-dropdown'));
    for(var i=1; i<8; i+=2){
      list[0].childNodes[i].childNodes[1].className = '';
    };
    list[0].childNodes[index].childNodes[1].className = 'text_color_black';
  };
/*Прячит меню выделения прочитанных, непрочитанных, всех писем при клике на любой элемент*/
  var self2 = this;
  $('body').on('click', function(event) {
    // console.log(event);
    if (event.target.id == 'not_check_box') {
      self2.showTumblerCheck = true;
      self2.deletedSelect = false;
      $('.message-sort-dropdown').show();
    } else {
      self2.showTumblerCheck = false;
      $('.message-sort-dropdown').hide();
    }
  });
/*Функция скрывает меню выделения прочитанных, непрочитанных, всех писем*/
  this.removeSelectBox = function(){
    this.showTumblerCheck = false;
  };
  /*Объект для input type=date*/
  this.dateOptions = {
    changeYear: true,
    changeMonth: true,
    yearRange: '1900:-0'
    };
  /*Функция растягивает на всю ширину экрана, если две закладки для папок с письмами*/
  this.autoWidthItem = function() {
    var lengthMsg =$('.message-tabs-item').length;
    if (lengthMsg == 4) {
      $('.message-tabs-item').css('width', '49.9%');
    } else {
      $('.message-tabs-item').css('width', '24.9%');
    };
  };
  this.autoWidthItem();
  /*подгрузка писем в переписку*/
  var self5 = this;
  $(window).on('scroll', function(event) {
    if(!self5.tumbler) {
      if($(this).scrollTop()>2500 && self5.letterCor.letters.length<50) {
        self5.paginaLetterCor();
      }
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

mailController.$inject = ['$document', '$location', '$timeout', '$anchorScroll', 'mailService', 'userService', '$scope', '$rootScope', 'favoriteService', 'chatService'];
