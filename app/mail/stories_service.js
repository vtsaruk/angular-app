module.exports = storiesService;

function storiesService($resource) {
  var storiesResource = $resource('api/stories');
  var storyResource = $resource('api/stories/:stories_id', { stories_id: '@stories' });
  var commentStorResource = $resource('api/stories/:stories_id/comments', { stories_id: '@stories' });

  this.getAllStories = function(option) {
    return storiesResource.get({
      limit: option.limit,
      offset: option.offset
    });
  };
  this.getStoryId = function(Id) {
    return storyResource.get({ stories_id: Id });
  };

  this.getCommentStory = function(Id) {
    return commentStorResource.get({ stories_id: Id, relations: '{"user":{"country":{}, "mainphoto": {} } }' });
  };

  return this;
};
storiesService.$inject = ['$resource'];