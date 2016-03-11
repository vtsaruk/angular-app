module.exports = girlsAllService;

function girlsAllService ($resource) {
  var girlsResource = $resource('/api/girls',
    {  });

  this.getGirlsAll = function (id) {
    return girlsResource.get({ countryId: id, relations: '{"user":{"country":{} } }' });
  };

  return this;
};

girlsAllService.$inject = ['$resource'];