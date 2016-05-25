module.exports = searchService;

function searchService ($resource) {
  var searchResource = $resource('/api/girls');

  this.getSearch = function (options) {
    return searchResource.get({
      birthdateFrom: options.birthdateFrom,
      birthdateTo: options.birthdateTo,
      countryId: options.countryId,
      city: options.city,
      firstname: options.firstname,
      heightFrom: options.heightFrom,
      heightTo: options.heightTo,
      weightFrom: options.weightFrom,
      weightTo: options.weightTo,
      hairColor: options.hairColor,
      eyeColor: options.eyeColor,
      englishRating: options.englishRating,
      maritalStatus: options.maritalStatus,
      profession: options.profession,
      education: options.education,
      religion: options.religion,
      smoking: options.smoking,
      drinking: options.drinking,
      zodiacSign: options.zodiacSign,
      childrenNumberFrom: options.childrenNumberFrom,
      childrenNumberTo: options.childrenNumberTo,
      limit: options.limit,
      offset: options.offset,
      // direction: options.direction,
      relations: '{"user":{"country":{}, "mainphoto": {} } }'
    });
  };

  return this;
};

searchService.$inject = ['$resource'];