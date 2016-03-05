module.exports = girlsService;

function girlsService ($resource) {
  var girlsResource = $resource('/api/girls/:girls_id',
    { girls_id: '@id' });

  this.getGirlsId = function (id) {
    return girlsResource.get({ girls_id: id });
  };

  return this;
};

girlsService.$inject = ['$resource'];;