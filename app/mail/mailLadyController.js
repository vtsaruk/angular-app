module.exports = mailController;

function mailController ($document, $location, $timeout, $anchorScroll, mailService, userService , girlsService, $rootScope) {

  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
  }

  this.removeClassTab = function(arg) {
    var list = angular.element(document.getElementsByClassName('message-tabs-item'));
    for(var i=0; i<list.length; i++){
      list[i].className = 'message-tabs-item';
      // list[i].on('click', 'activeAddClass')
    };
    list[arg].className = 'message-tabs-item active';
  };

  this.showList = function(){
    this.listDiv = this.listDiv ? false : true;
  };

  this.showFilter = function() {
    this.filterDiv  = this.filterDiv ? false : true;
  };

  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        $rootScope.global2 = data;
        self.user = data;
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.getUserData();

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
  };

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
        }
        angular.forEach(self.messages.letters, function(letter, index) {
          self.messages.letters[index]['deleted'] = false;

        });
      },
      function(error) {
        console.log(error);
      });
    };

  this.paginaAddClass = function(index) {

      var arrPaginaClass = angular.element(document.getElementsByClassName('pagina'));
      // console.log(arrPaginaClass.length);
      for(var i=0; i<arrPaginaClass.length; i++) {
        arrPaginaClass[i].childNodes[0].className = '';
      }
      arrPaginaClass[index].childNodes[0].className = 'text_color_black';
  }

  this.getNextMessages = function() {
    if (this.page < this.arrLengthCeil-1) {
      this.page += 1;
      this.getMessages();
      this.paginaAddClass(0);
      this.paginaAddClass(this.page);
    }
  };

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

  this.addClass = function(arg1, arg2, arg3) {
    if(arg3==false) {
      return 2;
    }else return arg1==arg2? 0:1;
  };

  this.payment =function(id, partnerid) {
    var self = this;
    mailService.paymentLetter(id).$promise.then(
      function(data) {
        self.messagIdPay = data;
        self.readTheLetter(id);
        self.correspondence(partnerid);
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.correspondence = function(partnerid) {
    if(this.tumbler) {
        this.tumbler = false;
      };
    var self = this;
    self.currentPartnerid = partnerid;
    mailService.correspondenceGet(partnerid).$promise.then(
      function(data) {
        self.letterCor =data;
      },
      function(error) {
        console.log(error);
      }
    );
  }

  this.switchMore = function(letterText) {
    if (letterText==null) {
      return false;}
      else if(letterText.length>90) {
      return false;
    } else return true;
  };


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

  this.showSendMessage =function(senderId, userId) {
    return senderId==userId? true: false;
  }


  this.textArea = false;

  this.textAreaTime = function() {
    var self = this;
    self.textArea = true;
    $timeout(function(){
      self.textArea = false;
    },100)
  }

  this.addMessage = function(id) {
    var self = this;
    var msg = {
      text: this.newMessage,
      recipientId: id,
      type: 'box'
    };
    mailService.addMessage2(msg).$promise.then(
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

  this.deleteMessages = function() {
    var self = this;
    angular.forEach(this.messages.letters, function(letter) {
      if(letter.deleted) {
        mailService.deleteMessage(letter.id).$promise.then(
          function(data) {
            self.getMessages();
            self.getMessagesInboxLength();
          }, function(error) {
            console.log(error);
          });
      }
    })
  };

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

this.girlsIdGet = function(id) {
    var self = this;
    girlsService.getGirlsId(id).$promise.then(
      function(data) {
        self.girlsId = data;
      },
      function(error) {
        console.log(error);
      }
    );
  };

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
    this.getMessages();
    $timeout(function(){
      this.resultFromDate = undefined;
      this.resultToDate = undefined;
    },500);
  }

  //this.onThisWeekDate();

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
    this.getMessages();
    $timeout(function(){
      this.resultFromDate = undefined;
      this.resultToDate = undefined;
    },500);
  };

  //this.onLastWeekDate();
  this.showDate = function() {

    var arrDate2 = new String(this.fromDate).split(' ');
    var month2 = this.fromDate.getMonth() +1;
    this.resultFromDate = arrDate2[3] + '-' + month2 + '-' + arrDate2[2] + ' ' + '00:00:00';

    var arrDate = new String(this.toDate).split(' ');
    var month = this.toDate.getMonth() + 1;
    this.resultToDate = arrDate[3] + '-' + month +'-' + arrDate[2] + ' ' + '23:59:59';
    if(this.fromDate.getTime()<this.toDate.getTime()) {
      this.getMessages();
    };
    $timeout(function(){
      this.resultFromDate = undefined;
      this.resultToDate = undefined;
    },500);
  };

  this.watchInputDate = function(fromDate, toDate) {
    if(fromDate && toDate)

    // console.log(fromDate.getTime(), toDate.getTime());
    return fromDate.getTime()<toDate.getTime()? true : false;
  };
  this.resetSortDate = function() {
    this.onThisWeek = false;
    this.onLastWeek = false;
    this.toDate = undefined;
    this.fromDate = undefined;
    this.resultFromDate = undefined;
    this.resultToDate = undefined;
    this.getMessages();
  };
};


mailController.$inject = ['$document', '$location', '$timeout', '$anchorScroll', 'mailService', 'userService', 'girlsService', '$rootScope'];
