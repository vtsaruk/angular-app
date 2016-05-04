module.exports = contactUsService;
/*Фабрика*/
function contactUsService ($resource) {
  var contactUsResource = $resource('/api/feedback',
    { }, {
      addFeedback: {
        method: 'POST',
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }
    }
  );
/*Отправляем feedback*/
  this.addMessage = function(formData) {
    return contactUsResource.addFeedback({}, formData);
  };

  return this;
  }

contactUsService.$inject = ['$resource'];