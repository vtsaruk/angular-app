module.exports = formController;

function formController (formService, $scope, $timeout, userService, $rootScope) {
  this.showMainContent = 1;

  this.showBlock = function(id) {
    this.showMainContent = id;
  }

  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
        $rootScope.global2 = data;
        $('.head_footer').show();
      },
      function(error) {
        console.log(error);
        $('.head_footer').show();
      }
    );
  };

  this.getUserData();

  $scope.cropper = {};
  $scope.cropper.sourceImage = null;
  this.cropperSourceImg = $scope.cropper.sourceImage = null;
  $scope.cropper.croppedImage = null;
  $scope.bounds = {};
  $scope.bounds.left = 0;
  $scope.bounds.right = 457;
  $scope.bounds.top = 552;
  $scope.bounds.bottom = 95;
  this.Height = 1;
  // this.tumblerHeight = false;
  this.onloadFotoCheck = function() {
    self = this;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.onload = function () {
      self.heightPicture = imageObj.naturalHeight;
      // self.rateHeight = Math.round((500 / self.heightPicture) * 420);
      // console.log(self.heightPicture);
      // console.log(self.rateHeight);
    };
    imageObj.src = $scope.cropper.sourceImage;
    // $timeout(function(){
    //   self.tumblerHeight = true;
    //   console.log(11111111111111);
    // },5000)

    };
  //irinadating.loc/upload/photos/384/EsFeKxMO_300_420_crop.jpg
  //irinadating.loc/upload/photos/384/EsFeKxMO.jpg


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
    // console.log('$scope.cropper.sourceImage');
    // console.log($scope.cropper.sourceImage);

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.onload = function () {
      self.heightPicture = imageObj.naturalHeight;
      self.widthPicture = imageObj.naturalWidth;
      // self.topWindow =imageObj.naturalHeight;
      // console.log(imageObj.naturalHeight);
    };
      // console.log('onload');
      // console.log(imageObj.naturalWidth);
    //imageObj.src = document.getElementById("tempImg").src;
    imageObj.src = $scope.cropper.sourceImage;
    // console.log('self.topWindow');
    // console.log(this.heightPicture - $scope.bounds.top);
    // console.log(htmlFiles[0].files[0]);
    // console.log(im);
    // console.log(htmlFiles[0].files[0]);
    // fd.append('photo', photo);//htmlFiles[0].files[0]
        fd.append('photo', htmlFiles[0].files[0]);

    if(isMainPhoto) {
      if($scope.bounds.left==0) $scope.bounds.left=1;

      fd.append('isMainPhoto', true);
      var widthPhoto = $scope.bounds.right - $scope.bounds.left;
      var heightPhotoA = $scope.bounds.top - $scope.bounds.bottom;
      var startXPhoto = $scope.bounds.left;
      var startYPhoto = this.heightPicture - $scope.bounds.top;
      if (startYPhoto==0) startYPhoto = 1;
      if(heightPhotoA<420) {
        startYPhoto = this.heightPicture-420;
        startXPhoto =800-420;
        heightPhotoA = 420;
      }
      console.log(heightPhotoA);
      console.log(startXPhoto);
      console.log(startYPhoto);
      fd.append('startX', startXPhoto);
      fd.append('startY', startYPhoto);
      fd.append('width', heightPhotoA);
      fd.append('height', heightPhotoA);//420);//heightPhoto)
    }

    formService.addPhotos(fd);
    // htmlFiles[0].files[0] = undefined;
    // console.log(photo);
    // alert("Фотография загружена");
//     $event.preventDefault();
  // this.cropperSourceImg = null;
  };

};

formController.$inject = ['formService', '$scope', '$timeout', 'userService','$rootScope'];