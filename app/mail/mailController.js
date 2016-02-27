module.exports = mailController;


function mailController (mailService, userService) {
  this.getUserData = function () {
    var self = this;
    console.log('hi');
    console.log(userService.getUser());

    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
        console.log(self.user + "hello");
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.getUserData();
  // $cookies.put('PHPSESSID', 'jar9vlgoddf0puj6fl6scuifh6');
  this.getMessages = function (type) {
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
