module.exports = girlsAllService;

function girlsAllService ($resource) {
  var girlsResource = $resource('/api/girls',
    { });
  var countriesResource = $resource('/api/countries',
    { });

  this.getGirlsAll = function (options) {
    return girlsResource.get({
      birthdateFrom: options.birthdateFrom,
      birthdateTo: options.birthdateTo,
      countryId: options.countryId,
      direction: options.direction,
      limit: options.limit,
      offset: options.offset,
      relations: '{"user":{"country":{}, "mainphoto": {} } }'
    });
  };

  this.getCountries = function() {
    return countriesResource.get({direction: 'asc'});
  }



  return this;
};



girlsAllService.$inject = ['$resource'];