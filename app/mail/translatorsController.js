module.exports = translatorsController;

function translatorsController ($document, $stateParams, $location, userService, $rootScope, translatorsService, mailService) {

  this.tumbler = true;
/*Функция получает данние пользователя из сервиса userService*/
  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        $rootScope.global2 = data;
        $rootScope.hrefLadies = false;
        self.user = data;
        $('.head_footer').show();
      },
      function(error) {
        console.log(error);
        $location.path('/home/-ag-18-30-co-Ukraine');
        $('.head_footer').show();      }
    );
  };

  this.getUserData();

  this.getAllGirls = function () {
    var self = this;
    translatorsService.getTranslIdGirl().$promise.then(
      function(data) {
        self.girls = data.girls;
      },
      function(error) {
        console.log(error);
      }
    );
  };
  this.getAllGirls();

  this.getMessages = function(userID) {
    if(this.tumbler==false)
      this.tumbler = true;
    var self = this;
    this.girlID = userID;
    var options = {
      senderId: userID,
      // recipientId: userID,
      type: 'for_translator'
    };
    mailService.getAllMessages(options).$promise.then(
      function(data) {
        self.letters = data.letters;
        console.log(data.letters);
      },
      function(error) {
        console.log(error);
      }
    );
  };
  /*Функция определяет возраст*/
  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;
  };
  this.correspondenceHistory = function(userID, recipientID) {
    var self = this;
    var options = {
      userId: userID,
      partnerId: recipientID
      // type: 'for_translator'
    };
    mailService.correspondenceGet(options).$promise.then(
      function(data) {
        self.lettersInHistory = data.letters;
        console.log(self.lettersInHistory);
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.readTranslederLetter = function(letter) {
    this.tumbler = false;
    var self = this;
    mailService.getMessagesId(letter.id).$promise.then(
      function(data) {
        // console.log(data);
        self.letter = data.letter;
        self.correspondenceHistory(letter.senderId, letter.recipientId);
      },
      function(error) {
        console.log(error);
      }
    );
    // console.log(letter);
    // this.textLetter = letter.additionalData.text;
    // this.firstNameRecipient = letter.recipient.firstname;
    // this.recipientFromCountry = letter.recipient.country.name;
    // this.recipientFromCity = letter.recipient.city;
    // this.ricipientBirthdate = letter.recipient.birthdate;
    // this.createdAtLetter = letter.createdAt;

    // this.correspondenceHistory(letter.senderId, letter.recipientId);
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
  /*Функция отвечает за стили письма в переписке*/
  this.addClass = function(letter) {
    return letter.senderId==this.girlID? 0:1;
  };
  this.sendLetterMan = function(letter) {
    var fd = new FormData();
    fd.append('senderId', letter.senderId);
    fd.append('recipientId', letter.recipientId);
    fd.append('text', this.newMessage);
    fd.append('type', 'box');
    mailService.addMessage2(fd);
    this.newMessage = '';
  };

};

translatorsController.$inject = ['$document', '$stateParams', '$location', 'userService', '$rootScope', 'translatorsService', 'mailService'];