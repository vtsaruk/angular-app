module.exports = contactUsController;


function contactUsController ($anchorScroll, $rootScope, userService, contactUsService, $http, $timeout, $interval) {
  /*Функция после загрузки страницы подымает scroll вверх*/
  this.anchorScrollPage = function() {
     //$location.hash('top_anchorScroll');
     $anchorScroll.yOffset = 200;
     $anchorScroll();
  };

  this.anchorScrollPage();
/*Функция получает данние пользователя из сервиса userService*/
  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
        $rootScope.global2 = data;
        $rootScope.hrefLadies =false;
        $('.head_footer').show();
      },
      function(error) {
        console.log(error);
        $('.head_footer').show();
      }
    );
  };

this.getUserData();
/*Функция отправляет feedback через сервис contactUsService*/
  this.addFeedback = function(feedback) {
    var self = this;
    var fd = new FormData();
    fd.append('email', feedback.email);
    fd.append('message', feedback.message);
    fd.append('message', feedback.subject);
    contactUsService.addMessage(fd);
    this.feedback.email = '';
    this.feedback.message = '';
    this.feedback.subject = '';
  };

  this.country = {};
  this.countries = [ // Taken from https://gist.github.com/unceus/6501985
    {name: 'Afghanistan', code: 'AF'},
    {name: 'Åland Islands', code: 'AX'},
    {name: 'Albania', code: 'AL'},
    {name: 'Algeria', code: 'DZ'},
    {name: 'American Samoa', code: 'AS'},
    {name: 'Andorra', code: 'AD'},
    {name: 'Angola', code: 'AO'},
    {name: 'Anguilla', code: 'AI'},
    {name: 'Antarctica', code: 'AQ'},
    {name: 'Antigua and Barbuda', code: 'AG'},
    {name: 'Argentina', code: 'AR'},
    {name: 'Armenia', code: 'AM'},
    ];
    $('.filter-girls-top-menu').hide();
  $('body').on('click', function(event) {
    if (event.target.className == 'show_filter_top_menu' ||
      event.target.className == 'clearfix show_filter_top_menu') {
      $('.filter-girls-top-menu').show();
    } else {
      $('.filter-girls-top-menu').hide();
    }
  });
};


contactUsController.$inject = ['$anchorScroll', '$rootScope', 'userService', 'contactUsService', '$http', '$timeout', '$interval'];