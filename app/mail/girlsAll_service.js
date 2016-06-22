module.exports = girlsAllService;
/*фабрика*/
function girlsAllService ($resource) {
  var girlsResource = $resource('/api/girls', { });
  var countriesResource = $resource('/api/countries', { });
/*Получаем данные девушек согласно выбранных критериев*/
  this.getGirlsAll = function (options) {
    return girlsResource.get({
      firstTimeActivatedAtFrom: options.firstTimeActivatedAtFrom,
      birthdateRemainingDays: options.birthdateRemainingDays,
      sort: options.sort,
      birthdateFrom: options.birthdateFrom,
      birthdateTo: options.birthdateTo,
      countryId: options.countryId,
      isOnline: options.isOnline,
      limit: options.limit,
      offset: options.offset,
      relations: '{"user":{"country":{}, "mainphoto": {} } }'
    });
  };
  // this.getGirlsTop = function() {
  //   return girlsResource.get({

  //   })
  // }
/*Получаем странны*/
  this.getCountries = function() {
    return countriesResource.get({direction: 'asc'});
  };
  return this;
};


girlsAllService.$inject = ['$resource'];