module.exports = mailController;;

function mailController (mailService, $cookies) {
  $cookies.put('PHPSESSID', 'jar9vlgoddf0puj6fl6scuifh6');
  // this.getMessages = function () {
  //   this.messages = mailService.getAllMessages()
  // };

 console.log(mailService.getAllMessages().$promise.then(
      function(data) {
        console.log(data);
      }, function(error) {
        console.log(error);
      }
    ));;
}

mailController.$inject = ['mailService', '$cookies'];
