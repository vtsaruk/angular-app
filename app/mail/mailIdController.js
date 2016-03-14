module.exports = mailIdController;

function mailIdController ($document, $stateParams, $location, $timeout, mailService, userService , girlsService, mailIdService) {

  var id = $stateParams.id;
  console.log('GOOD!!!');
  console.log(id);

  this.agePerson = function(birthdate) {
    return ((new Date().getTime() - new Date(birthdate)) / (24 * 3600 * 365.25 * 1000)) | 0;;
  }

  this.getUserData = function () {
    var self = this;

    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
        //console.log(self.user);
      },
      function(error) {
        console.log(error);
      }
    );
  };

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
    //$location.hash('top');
    // $anchorScroll.yOffset = 200;
    // $anchorScroll();
    //console.log('!!!!!!!!!!!!');
    //self.readTheLetter(id);
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
        self.newMessage = '';
        self.correspondence(id);

      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.addClass = function(arg1, arg2) {

    return arg1==arg2? 1:0;
  }


  //this.correspondence(id);

};

mailIdController.$inject = ['$document', '$stateParams', '$location', '$timeout', 'mailService', 'userService', 'girlsService', 'mailIdService'];