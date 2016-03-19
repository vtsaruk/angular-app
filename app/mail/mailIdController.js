module.exports = mailIdController;

function mailIdController ($document, $stateParams, $location, $anchorScroll, $timeout, mailService, userService , girlsService, mailIdService) {

  this.anchorScrollPage = function() {
     //$location.hash('top_anchorScroll');
     $anchorScroll.yOffset = 200;
     $anchorScroll();
    console.log("anchorScrollPage")
  };

  this.anchorScrollPage();

  var id = $stateParams.id;

  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
  }

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

  this.textArea = false;

  this.textAreaTime = function() {
    var self = this;
    self.textArea = true;
    $timeout(function(){
      self.textArea = false;
    },100)
  }

this.getUserData();
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

this.girlsIdGet = function(id) {
    console.log(id, id);
    var self = this;
    mailIdService.conversationGirlsId(id).$promise.then(
      function(data) {
        self.girlsId = data;
        self.correspondence(self.girlsId.girl.userId);
      },
      function(error) {
        console.log(error);
      }
    );


  };
  this.girlsIdGet(id);

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

  this.addClass = function(arg1, arg2, arg3) {
    if(arg3==false) {
      return 2;
    }else return arg1==arg2? 0:1;

  };

  this.showFilter = function() {
    this.filterDiv  = this.filterDiv ? false : true;
  };

  this.showList = function(){
    this.listDiv = this.listDiv ? false : true;
  };

  this.letterTextSlice = function(letterText) {
    if (letterText==null){
      return 0;
    }
    else if(letterText.length>200) {
      var text = letterText.slice(0, 200);
      return text;
    }
    else return letterText;
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


  //this.correspondence(id);

};

mailIdController.$inject = ['$document', '$stateParams', '$location', '$anchorScroll', '$timeout', 'mailService', 'userService', 'girlsService', 'mailIdService'];