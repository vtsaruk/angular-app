module.exports = mailIdService;

function mailIdService ($resource) {
  var girlsResource = $resource('/api/girls/:girls_id',
    { girls_id: '@id' });

  this.conversationGirlsId = function (id) {
    return girlsResource.get({ girls_id: id, relations: '{"user":{"country":{} } }' });
  };

  return this;
};

mailIdService.$inject = ['$resource'];
