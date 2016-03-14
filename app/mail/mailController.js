module.exports = mailController;

function mailController ($document, $location, $timeout, $anchorScroll, mailService, userService , girlsService) {

  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
  }

  this.removeClassTab = function(arg) {
    var list =  angular.element(document.getElementsByClassName('message-tabs-item'));
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
        self.arrLength = self.messages.totalCount/20;
        self.arrLengthCeil = Math.ceil(self.arrLength);
        self.arrIndex = [];
        for(var i=1; i<self.arrLengthCeil+1; i++) {
          self.arrIndex.push(i);
        }
        angular.forEach(self.messages.letters, function(letter, index) {
          self.messages.letters[index]['deleted'] = false;

        });
        //self.paginaAddClass(0);
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
  //$timeout( function() { this.paginaAddClass(0);}, 3000 );
//this.paginaAddClass();
// nextSibling.nextSibling

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
  }

  this.getMessagesIntroductions();

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

  }

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

  this.addClass = function(arg1, arg2) {
    return arg1==arg2? 1:0;
  }

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
    // do {

    // } while(self.messagesId.letter.isPaid==true);
    //$timeout( function(id) {self.readTheLetter(id); }, 1000);
  }

  this.correspondence = function(partnerid) {
    if(this.tumbler) {
        this.tumbler = false;
      };
    var self = this;
    self.currentPartnerid = partnerid;
    mailService.correspondenceGet(partnerid).$promise.then(
      function(data) {
        self.letterCor =data;
        console.log("correspondence");
      },
      function(error) {
        console.log(error);
      }
    );
    //$location.hash('top');

    //console.log('!!!!!!!!!!!!');
    //self.readTheLetter(id);
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
        self.newMessage = '';
        self.correspondence(id);

      },
      function(error) {
        console.log(error);
      }
    );
    // this.newMessage = '';
    // self.correspondence(id);
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
            self.getMessages();
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
//this.classDeletMessages();

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


mailController.$inject = ['$document', '$location', '$timeout', '$anchorScroll', 'mailService', 'userService', 'girlsService'];
