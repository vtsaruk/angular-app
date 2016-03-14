module.exports = girlsAllService;

function girlsAllService ($resource) {
  var girlsResource = $resource('/api/girls',
    {  });

  this.getGirlsAll = function (id, options) {
    return girlsResource.get({
      type: options.type,
      limit: options.limit,
      offset: options.offset,
      countryId: id,
       relations: '{"user":{"country":{} } }'
    });
  };

  return this;
};

girlsAllService.$inject = ['$resource'];