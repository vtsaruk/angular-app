module.exports = formController;

function formController (formService, $scope, $timeout, userService, $rootScope) {
  this.showMainContent = 1;
  this.isMainPhoto = true;
  this.idPhotoForPathc = 0;
  this.showBlock = function(id) {
    this.showMainContent = id;
  };
  this.arrModelSh = [];
  this.getPhotos = function(id) {
    var self = this;
    formService.getPhotosUser(id).$promise.then(
      function(data) {
        self.Photos= data;
        for(var i=0; i<data.photos.length; i++) {
          self.arrModelSh[i] = false;
        }
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.getUserData = function () {
    var self = this;
    userService.getUser().$promise.then(
      function(data) {
        self.user = data;
        $rootScope.hrefLadies =false;
        $rootScope.global2 = data;
        $('.head_footer').show();
        self.getPhotos(self.user.user.id);
      },
      function(error) {
        console.log(error);
        $('.head_footer').show();
      }
    );
  };

  this.getUserData();

  $scope.cropper = {};
  $scope.cropper.sourceImage = [];
  // $scope.cropper.sourceImage = null;
  // this.cropperSourceImg = $scope.cropper.sourceImage = null;
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


  this.postPhoto = function ($event, index)  {
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
    console.log(index);
    var htmlFiles = angular.element(document.forms[index+1].photoAdd);
    var fd = new FormData();
    // console.log('$scope.cropper.sourceImage');
    // console.log($scope.cropper.sourceImage);

    var canvas = document.getElementById("canvas"+index);
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.onload = function () {
      self.heightPicture = imageObj.naturalHeight;
      self.widthPicture = imageObj.naturalWidth;
      // self.topWindow =imageObj.naturalHeight;
      console.log(imageObj.naturalHeight);
    };
      // console.log('onload');
      // console.log(imageObj.naturalWidth);
    //imageObj.src = document.getElementById("tempImg").src;
    imageObj.src = $scope.cropper.sourceImage[index];
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
      this.WidthPhoto = widthPhoto;
      var heightPhotoA = $scope.bounds.top - $scope.bounds.bottom;
      var startXPhoto = $scope.bounds.left;
      if(self.heightPicture) {
      var startYPhoto = self.heightPicture - $scope.bounds.top;
    } else var startYPhoto =1;
      // console.log(startYPhoto);
      // console.log(self.heightPicture);
      // console.log($scope.bounds.top);
      // if(1>startYPhoto && startYPhoto>1000)
      //   startYPhoto = 1;
      this.StartYPhoto = startYPhoto;
      this.StartXPhoto = startXPhoto;
      // startYPhoto= 20;
      if (startYPhoto==0) startYPhoto = 1;
      if(heightPhotoA<420) {
        startYPhoto = this.heightPicture-420;
        startXPhoto =800-420;
        heightPhotoA = 420;

      }
      // console.log(heightPhotoA);
      // console.log(startXPhoto);
      // console.log(startYPhoto);
      fd.append('startX', startXPhoto);
      fd.append('startY', startYPhoto);
      fd.append('width', heightPhotoA);
      fd.append('height', heightPhotoA);//420);//heightPhoto)
    }

    // formService.addPhotos(fd);
    // htmlFiles[0].files[0] = undefined;
    // console.log(photo);
    // alert("Фотография загружена");
//     $event.preventDefault();
  // this.cropperSourceImg = null;
  };

  this.addSaveAvatar = function($event, index, starX, starY, width) {
    this.postPhoto($event, index);
    // if(startYPhoto == NaN || startYPhoto==0 )
    //   this.StartYPhoto=1;
    var imgElement = document.getElementById('img' + index);
    var imgHeight = imgElement.naturalHeight;


    var startPointY = imgHeight - starY;
    var cof = imgHeight/600;
    if(imgHeight>600) {
      var natHeig = Math.floor(cof*width);
    } else var natHeig = width;
    if(natHeig<420) {
      natHeig=420;
    }
    var fd = new FormData();
    fd.append('isMainPhoto', true);
    fd.append('startX', starX);
    fd.append('startY', startPointY);
    fd.append('width', natHeig);
    fd.append('height', natHeig);
    // console.log(cof);
    // console.log('imgHeight');
    // console.log(imgHeight);
    // console.log('natHeig');
    // console.log(natHeig);
    // console.log('startPointY');
    // console.log(startPointY);
    // console.log('startPointX');
    // console.log(starX);
    var option = {
      id: this.idPhotoForPathc,
      isMainPhoto: true,
      // startX: this.StartXPhoto,
      startX: starX,
      startY: startPointY,
      width: natHeig,
      height: natHeig
    };

    // var request = new XMLHttpRequest();
    // request.open('PATCH', 'irinadating.loc/api/photos/' + this.idPhotoForPathc, fd);
    // request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    // request.send(fd);

    // $.ajax({
    //   url : 'irinadating.loc/api/photos/' + this.idPhotoForPathc,
    //   data : data,
    //   type : 'PATCH',
    //   contentType : 'application/json'
    // )};
      $.ajax(
        {
            url: '/api/photos/' + this.idPhotoForPathc,
            type: 'PATCH',
            data: option,
            success: function(msg){
              // alert( "Data Saved: " + msg );
            }
        }
      );

    // formService.removeAvatPhot(fd, this.idPhotoForPathc, option);
    // formService.removeAvatPhot(option);
    // $scope.cropper.sourceImage = '';

  };

  this.addPostPhoto = function ($event) {
    var htmlFiles = angular.element(document.forms[0].photoAdd);
    var fd = new FormData();
    fd.append('photo', htmlFiles[0].files[0]);
    formService.addPhotos(fd);

  };
  this.heightIngCan = [];


  // for(var i=0; i<50; i++) {
  //     var imgElement = document.getElementById('img' + i);
  //     console.log(imgElement);
  //     // var imgHeight = imgElement.naturalHeight;
  //     // this.heightIngCan[i] = imgHeight;
  //   };
    console.log(this.heightIngCan);
  this.recordWindowPhoto = function(namePhoto, index) {
    var imgElement = document.getElementById('img' + index);
    var imgHeight = imgElement.naturalHeight;
    this.heightIngCan = imgHeight;
    console.log(this.heightIngCan);
    $scope.cropper.sourceImage[index] = namePhoto.path;
    this.idPhotoForPathc = namePhoto.id;

    for(var i=0; i<this.arrModelSh.length; i++) {
      this.arrModelSh[i] = false;
    }
    this.arrModelSh[index] = true;
    // var divEl = document.createElement('div');
    // divEl.className = 'box_change_avatar';
    // document.body.appendChild(divEl);
    // divEl.innerHTML = '';
  };
  $('.filter-girls-top-menu').hide();
  $('body').on('click', function(event) {
    if (event.target.className == 'show_filter_top_menu' ||
      event.target.className == 'clearfix show_filter_top_menu') {
      $('.filter-girls-top-menu').show();
    } else {
      $('.filter-girls-top-menu').hide();
    }
  });
};

formController.$inject = ['formService', '$scope', '$timeout', 'userService','$rootScope'];