module.exports = storyIdController;

function storyIdController ($document, $stateParams, $location, userService, $rootScope, storiesService) {
  var id = $stateParams.id;
  /*Функция получает данние пользователя из сервиса userService*/
  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        $rootScope.global2 = data;
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


  this.getStory = function (Id) {
    var self = this;
    storiesService.getStoryId(Id).$promise.then(
      function(data) {
        self.story = data.story;
        var arrTextes = self.story.text.split('\n');
        self.story.arrTextes = arrTextes;
        // console.log(self.story.arrTextes);
      },
      function(error) {
        console.log(error);
      }
    );
  };
  this.getStory(id);

  this.getComments = function (Id) {
    var self = this;
    storiesService.getCommentStory(Id).$promise.then(
      function(data) {
        self.comments = data.comments;
        for(var i=0; i<self.comments.length; i++){
          self.comments[i].date = new Date(self.comments[i].date);
        }
      },
      function(error) {
        console.log(error);
      }
    );
  };
  this.getComments(id);

  this.addComment = function() {

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


storyIdController.$inject = ['$document', '$stateParams', '$location', 'userService', '$rootScope', 'storiesService'];