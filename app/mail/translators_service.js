module.exports = translatorsService;

function translatorsService($resource) {
  // var translatorsResource = $resource('api/translators/:translators_id/girls',
  //   { translators_id: '@translators' });
  var translatorsResource = $resource('api/translators/me/girls');

  this.getTranslIdGirl = function(Id) {
    return translatorsResource.get({ relations: { user: {} } });
  };

  return this;
};
translatorsService.$inject = ['$resource'];