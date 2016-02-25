module.exports = mailController;;


function mailController (mailService, $cookies) {

  $cookies.put('PHPSESSID', 'jar9vlgoddf0puj6fl6scuifh6');
  this.getMessages = function () {
     mailService.getAllMessages().$promise.then(
      function(data) {
        this.messages = data;
      }, function(error) {
        console.log(error);
      }
  )};
     this.getMessages();
console.log(this.messages);


 // this.messges = mailService.getAllMessages().$promise.then(
 //      function(data) {
 //        this.messges = data;
 //        console.log('hello')
 //      }, function(error) {
 //        console.log(error);
 //      }
 //    );
 // console.log(this.messges);
}

mailController.$inject = ['mailService', '$cookies'];
