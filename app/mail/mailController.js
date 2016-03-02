module.exports = mailController;


function mailController (mailService, userService) {
  this.getUserData = function () {
    var self = this;

    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.getUserData();
  // $cookies.put('PHPSESSID', 'jar9vlgoddf0puj6fl6scuifh6');
  this.tumbler = true;

  this.getMessages = function (type) {
    if(this.tumbler==false) {
      this.tumbler=true
    }
     var self = this;
     mailService.getAllMessages(type).$promise.then(
      function(data) {
        self.messages = data;
        angular.forEach(self.messages.letters, function(letter, index) {
          self.messages.letters[index]['deleted'] = false;
        });
      }, function(error) {
        console.log(error);
      });
   };


  this.readTheLetter = function(id){
    if(this.tumbler) {
      this.tumbler = false;
    }
    var self = this;
    mailService.getMessagesId(id).$promise.then(
      function(data) {
        self.messagesId = data;
        console.log(self.messagesId)
      },
      function(error) {
        console.log(error);
      }
    );
  }

  this.addClass = function(arg1, arg2) {
    return arg1==arg2? 1:0;
  }

  this.payment =function(id) {
    var self = this;
    mailService.paymentLetter(id).$promise.then(
      function(data) {
        self.messagesId = data;
        console.log(self.messagesId)
      },
      function(error) {
        console.log(error);
      }
    );
  }

  this.correspondence =function(partnerid){
    if(this.tumbler) {
      this.tumbler = false;
    };
    var self = this;
    self.currentPartnerid = partnerid;
    mailService.correspondenceGet(partnerid).$promise.then(
      function(data) {
        self.letterCor =data;
        console.log(self.letterCor);
      },
      function(error) {
        console.log(error);
      }
    );
  }

  this.addMessage = function(id) {
    var self = this;
    var msg = {
      text: this.newMessage,
      recipientId: id,
      type: 'box'
    };
    mailService.addMessage2(msg);
    this.newMessage = '';
  }

  this.change = function(type) {
    this.getMessages(type);
  };
  this.getMessages('inbox');

  this.deleteMessages = function() {
    var self = this;
    angular.forEach(this.messages.letters, function(letter) {
      if(letter.deleted) {
        mailService.deleteMessage(letter.id).$promise.then(
          function(data) {
            self.getMessages('inbox');
          }, function(error) {
            console.log(error);
          });
      }
    })
  }

}

mailController.$inject = ['mailService', 'userService'];
