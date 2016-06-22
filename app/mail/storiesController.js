module.exports = storiesController;

function storiesController ($document, $stateParams, $location, userService, $rootScope, storiesService) {
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
        $('.head_footer').show();
      }
    );
  };
  this.getUserData();

  this.offset = 0;
  this.stories = [];
  this.getStories = function () {
    var option = {
      limit: 8,
      offset: this.offset
    };
    var self = this;
    storiesService.getAllStories(option).$promise.then(
      function(data) {
        for(var i=0; i<data.stories.length; i++) {
          self.stories.push(data.stories[i]);
        }
        if(data.totalCount<self.offset + 8)
          self.showPagin = true;
      },
      function(error) {
        console.log(error);
      }
    );
  };
  this.getStories();

  this.paginStories = function() {
    this.offset += 8;
    this.getStories();
  }

  this.sliseText = function(text) {
    var newText = text.slice(0, 220) + ' ...';
    return newText;
  };

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


storiesController.$inject = ['$document', '$stateParams', '$location', 'userService', '$rootScope', 'storiesService'];