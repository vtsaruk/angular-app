module.exports = mailIdController;

function mailIdController ($document, $stateParams, $location, $anchorScroll, $timeout, $rootScope, mailService, userService , girlsService, mailIdService) {
/*Функция после загрузки страницы подымает scroll вверх*/
  this.anchorScrollPage = function() {
     //$location.hash('top_anchorScroll');
     $anchorScroll.yOffset = 200;
     $anchorScroll();

  };

  this.anchorScrollPage();
/*Забираем id из URL*/
  var id = $stateParams.id;
/*Функция определяет возраст*/
  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
  }
/*Функция получает данние пользователя из сервиса userService*/
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

  this.textArea = false;
/*Функция создаёт моргание рамки после отправки письма*/
  this.textAreaTime = function() {
    var self = this;
    self.textArea = true;
    $timeout(function(){
      self.textArea = false;
    },600)
  }

  this.getUserData();
/*Функция получает письма из переписки из сервиса mailService*/
  this.correspondence = function() {
    var self = this;
    var options = {
      partnerId: self.girlCorres,
      dateTimeFrom: self.resultFromDate,
      dateTimeTo: self.resultToDate,
      limit: self.limit,
      offset: 0
    };
    mailService.correspondenceGet(options).$promise.then(
      function(data) {
        self.letterCor =data;
        self.gillsLength = self.letterCor.totalCount;
        self.countPage = self.gillsLength / 20;
        self.totalPage = Math.ceil(self.countPage);
        if(self.totalPage==1) {
          self.buttonAddLetter = true;
        }
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.page = 0;
  this.limit = 20;
/*Функция добавление писем из переписки*/
  this.paginaLetterCor = function() {
     if (this.totalPage){
      this.page += 1;
      this.limit += 20;
      this.correspondence();
      if(this.page==this.totalPage)
        this.buttonAddLetter = true;
    }
  };
/*Функция получае данные с кем ведется переписка из сервиса mailIdService*/
   this.girlsIdGet = function(id) {
    console.log(id, id);
    var self = this;
    mailIdService.conversationGirlsId(id).$promise.then(
      function(data) {
        self.girlsId = data;
        self.girlCorres = self.girlsId.girl.userId;
        self.correspondence();
      },
      function(error) {
        console.log(error);
      }
    );
  };
  this.girlsIdGet(id);
/*Функция отправки письма обращается к сервису mailService*/
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
/*Функция отрисовывает письма в переписке где полученное, а где отправленное и выделенное*/
  this.addClass = function(arg1, arg2, arg3) {
    if(arg3==false) {
      return 2;
    }else return arg1==arg2? 0:1;
  };
/*Функция показывает или прячит фильтры для писем*/
  this.showFilter = function() {
    this.filterDiv  = this.filterDiv ? false : true;
  };
/*Функция показывает список ссылок*/
  this.showList = function(){
    this.listDiv = this.listDiv ? false : true;
  };
/*Функция обрезает длинное письмо*/
  this.switchMore = function(letterText) {
    if (letterText==null) {
      return false;}
      else if(letterText.length>90) {
      return false;
    } else return true;
  };
/* Функция показывает полностью письмо и обрезает в исходное состояние*/
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
/*Функция оплаты за окрытие письма*/
  this.payment =function(id, partnerid) {
    var self = this;
    mailService.paymentLetter(id).$promise.then(
      function(data) {
        self.messagIdPay = data;
        self.readTheLetter(id);
        self.correspondence();
      },
      function(error) {
        console.log(error);
      }
    );
  };
/*Функция выводит в отдельное окно выбранное письмо обращается к сервису mailService*/
  this.readTheLetter = function(id, partnerid){
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
/*Функция сортировки писем за текущию неделю*/
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
    this.correspondence();
    $timeout(function(){
      this.resultFromDate = undefined;
      this.resultToDate = undefined;
    },500);
  }
/*Функция сортировки писем за последнию неделю*/
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
    this.correspondence();

    $timeout(function(){
      this.resultFromDate = undefined;
      this.resultToDate = undefined;
    },500);
  };
/*Функция сортировки писем по выбранным двум датам*/
  this.showDate = function() {

    var arrDate2 = new String(this.fromDate).split(' ');
    var month2 = this.fromDate.getMonth() +1;
    this.resultFromDate = arrDate2[3] + '-' + month2 + '-' + arrDate2[2] + ' ' + '00:00:00';

    var arrDate = new String(this.toDate).split(' ');
    var month = this.toDate.getMonth() + 1;
    this.resultToDate = arrDate[3] + '-' + month +'-' + arrDate[2] + ' ' + '23:59:59';
    if(this.fromDate.getTime()<this.toDate.getTime()) {
      // this.getMessages();
    };
        // console.log(this.resultToDate, resultFromDate);
    this.correspondence();
    $timeout(function(){
      this.resultFromDate = undefined;
      this.resultToDate = undefined;
    },500);
  };
/*Функция выделяет кнопку сортировки*/
  this.watchInputDate = function(fromDate, toDate) {
    if(fromDate && toDate)
      return fromDate.getTime()<toDate.getTime()? true : false;
  };
/*Функция сбрасывает все параметры сортировки*/
  this.resetSortDate = function() {
    this.onThisWeek = false;
    this.onLastWeek = false;
    this.toDate = undefined;
    this.fromDate = undefined;
    this.resultFromDate = undefined;
    this.resultToDate = undefined;
    this.buttonAddLetter = false;
    this.correspondence();
  }

};

mailIdController.$inject = ['$document', '$stateParams', '$location', '$anchorScroll', '$timeout', 'mailService', 'userService', 'girlsService', 'mailIdService', '$rootScope'];