module.exports = formController;

function formController (formService, $scope) {

  $scope.cropper = {};
  $scope.cropper.sourceImage = null;
  $scope.cropper.croppedImage = null;
  $scope.bounds = {};
  $scope.bounds.left = 10;
  // $scope.bounds.right = 400;
  // $scope.bounds.top = 200;
  // $scope.bounds.bottom = 600;


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
    // var photo = $scope.cropper.croppedImage
    //var photo = this.image;
    // var im = $('#subImg').val();
    var htmlFiles = angular.element(document.forms[0].photo);
    var fd = new FormData();
    console.log('$scope.cropper.sourceImage');
    console.log($scope.cropper.sourceImage);

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.onload = function () {
      console.log('onload');
      console.log(imageObj.naturalWidth);
      console.log(imageObj.naturalHeight);
    };
    //imageObj.src = document.getElementById("tempImg").src;
    imageObj.src = $scope.cropper.sourceImage;

    console.log(htmlFiles[0].files[0]);
    // console.log(im);
    // console.log(htmlFiles[0].files[0]);
    // fd.append('photo', photo);//htmlFiles[0].files[0]
        fd.append('photo', htmlFiles[0].files[0]);

    if(isMainPhoto) {
      fd.append('isMainPhoto', true);
      fd.append('startX', $scope.bounds.left);
      fd.append('startY', 1);
    }
    // console.log(fd);
  // console.log(fd);

    // formService.addPhotos(fd);
    // htmlFiles[0].files[0] = undefined;
    // console.log(photo);
    // alert("Фотография загружена");
//     $event.preventDefault();
  };

};

formController.$inject = ['formService', '$scope'];