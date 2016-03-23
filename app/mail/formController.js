module.exports = formController;

function formController (formService, $scope) {

  $scope.cropper = {};
  $scope.cropper.sourceImage = null;
  $scope.cropper.croppedImage = null;
  $scope.bounds = {};
  $scope.bounds.left = 10;
  $scope.bounds.right = 400;
  $scope.bounds.top = 200;
  $scope.bounds.bottom = 600;


  this.postPhoto = function ($event)  {
    var self = this;
    // var photo = {
    //   photo: $scope.cropper.sourceImage.base64,
    //   filename: $scope.cropper.sourceImage.filename,
    //   filetype: $scope.cropper.sourceImage.filetype,
    //   filesize: $scope.cropper.sourceImage.filesize,
    //   //photo: $scope.cropper.croppedImage,
    //   //filename: "home-bg2.jpg",
    // };
    // console.log($scope.cropper.croppedImage);
    // formService.addPhotos($scope.cropper.sourceImage);
    // var formData = new FormData(angular.element(document.forms.form1.file));
    // console.log($scope.cropper.sourceImage);
    // console.log('----------------------');
    // console.log(htmlFiles[0]);
    // console.log(htmlFiles[0].files[0]);
    var isMainPhoto = this.isMainPhoto;
    var photo = $scope.cropper.croppedImage
    //var htmlFiles = angular.element(document.forms[0].photo);
    var fd = new FormData();
    fd.append('photo', photo);//htmlFiles[0].files[0]
    fd.append('isMainPhoto', isMainPhoto);
//console.log(htmlFiles[0].files[1]);
// console.log(fd);

    formService.addPhotos(fd);
    alert("Фотография загружена");
//     $event.preventDefault();
  };

};

formController.$inject = ['formService', '$scope'];