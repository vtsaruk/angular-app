module.exports = mailController;

function mailController ($document, $location, mailService, userService , girlsService) {
  this.removeClassTab = function(arg) {
    var list=  angular.element(document.getElementsByClassName('message-tabs-item'));
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
        self.user = data;
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.getUserData();


  this.changeType = function (type) {
    this.tumbler = true;
    this.limit = 20;
    this.page = 0;
    this.type = type || 'inbox';
    this.getMessages();
  };

  this.getMessages = function () {
    if(this.tumbler==false) {
      this.tumbler=true
    }
    var self = this;
    var options = {
      type: self.type,
      limit: self.limit,
      offset: self.limit * self.page
    };
    mailService.getAllMessages(options).$promise.then(
      function(data) {
        self.messages = data;
        angular.forEach(self.messages.letters, function(letter, index) {
          self.messages.letters[index]['deleted'] = false;
        });
      }, function(error) {
        console.log(error);
      });
    };
  this.getPage = function (page) {
    this.page = page-1;
    this.getMessages();
  };
  this.getNextMessages = function () {
    this.page += 1;
    this.getMessages();
  };

  this.getPrevMessages = function () {
    this.page -= 1;
    this.getMessages();
  };

  this.getMessagesIntroductions = function() {/*introductions*/
    var self = this;
    mailService.getAllMessages('introductions').$promise.then(
      function(data) {
        self.messagesIntroductions = data;
        console.log(self.messagesIntroductions);
        }, function(error) {
        console.log(error);
      }
    );
  }

   // this.getMessagesIntroductions();

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

  this.getMessagesLength = function(type) {
    var self = this;
    mailService.getMessagesLength(type).$promise.then(
      function(data) {
        self.messagesInbox = data;
        console.log('self.messagesInbox');
        console.log(self.messagesInbox);
      }, function(error) {
        console.log(error);
      }
    );
  };

  this.getMessagesLength('inbox');

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
    console.log(id);
    var self = this;
    var msg = {
      text: this.newMessage,
      recipientId: id,
      type: 'box'
    };
    mailService.addMessage2(msg);
    this.newMessage = '';
  };

  //this.change = function(type) {
  //  this.getMessages(type);
  //};

  this.changeType('inbox');

  this.deleteMessages = function() {
    var self = this;
    angular.forEach(this.messages.letters, function(letter) {
      if(letter.deleted) {
        mailService.deleteMessage(letter.id).$promise.then(
          function(data) {
            self.changeType(self.type);
          }, function(error) {
            console.log(error);
          });
      }
    })
  };

this.girlsIdGet = function(id) {
    console.log(id, id);
    var self = this;
    girlsService.getGirlsId(id).$promise.then(
      function(data) {
        self.girlsId = data;
        console.log(self.girlsId);

      },
      function(error) {
        console.log(error);
      }
    );
  };

};


mailController.$inject = ['$document', '$location', 'mailService', 'userService', 'girlsService'];
