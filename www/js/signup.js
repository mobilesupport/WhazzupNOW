/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var pictureSource;   // picture source
        var destinationType; // sets the format of returned value
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function BackOnClick(){
    window.location="index.html";
}

function LoginOnClick(){
    window.location="signin.html";
}
var photo;
function CreateOnClick(){
    var name, pwd, email;
    name=$("#name").val();
    email=$("#email").val();
    pwd=$("#password").val();
    
    //var c = document.createElement("Canvas");
    //var ctx = c.getContext("2d");
    //var img = document.getElementById("smallImage");
    //ctx.drawImage(img, 0, 0);
    //var imageDataUrl=c.toDataURL();
    //var subStr=imageDataUrl.replace("data:image/png;base64,","");
    //alert(subStr);
    //$("#imagecode").val(subStr);
    if(name==""){
        alert("Please enter name");
    }
    else if(name.length<5){
        alert("Name must be at least 5 characters.");
    }
    else if(email==""){
        alert("Please enter email");
    }
    else if(!isValidEmailAddress(email)){
        alert("Invalid email address");
    }
    else if(pwd==""){
        alert("Please enter password");
    }
    else if(pwd.length<6){
        alert("Password must be at least 6.");
    }
    else{
        try{
            //alert(photo.toString());
            dbmanager.initdb();
            dbmanager.getRedId(function(returnData){
            registrationId=returnData.rows.item(0).rregid;
            postRegister(email, pwd, photo, "email", name, registrationId )});
        }
        catch(ex){
            alert(ex);
        }
        
        
    }
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

function btnFacebookonClick(){
    var permission=["public_profile", "email"];
    var fbLoginSuccess = function (userData) {
        alert("hi");
        facebookConnectPlugin.api("/me?fields=id,email,name&access_token="+userData.authResponse.accessToken, permission,
        function (result) {
            var name=result.name;
            var email=result.email;
            var fbid=result.id;
            //alert(JSON.stringify(userData));
            dbmanager.initdb();
            dbmanager.getRedId(function(returnData){
            registrationId=returnData.rows.item(0).rregid;
            postLogin(email, fbid, "", "fb", fbid, registrationId)}); //fblogin, password =fbid
        },
        function (error) {
            alert("Facebook login failed: " + JSON.stringify(error));
        });
//        alert("UserInfo: " + JSON.stringify(userData));
//        window.location="home.html";
    }
                
    facebookConnectPlugin.login(permission, 
                                fbLoginSuccess, 
                                function (error) { alert("fail login with Facebook " + JSON.stringify(error))}
                               );
}

function btnCameraOnClick(){
    navigator.notification.confirm(
    'Snap a photo now or upload existing photo?',  // message
    onConfirm,                  // callback to invoke
    'Photo',                    // title
    ['Snap','Upload']           // buttonLabels
    );
        
}
        
function onConfirm(buttonIndex) {

    if(buttonIndex==1){
        capturePhoto();
    }
    else if(buttonIndex==2)
        alert("upload");
        navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 30,
        destinationType: destinationType.FILE_URI,
        sourceType: PHOTOLIBRARY  });
}
function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      smallImage.src = imageURI;
    }

function capturePhoto() {
    
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality : 20,
  destinationType : Camera.DestinationType.DATA_URL,
  sourceType : Camera.PictureSourceType.CAMERA,
  encodingType: Camera.EncodingType.JPEG,
  targetWidth: 50,
  targetHeight: 50,
  saveToPhotoAlbum: false });
    }


function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);
      // Get image handle
      //
    var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
    
      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
    smallImage.src = "data:image/jpeg;base64," + imageData;
    //resize_images(10,10,10,10);
    photo=imageData;
    var photo1=photo.replace(/\s/g, '');
    alert(photo1);
    
}




// Call this function *after* the page is completely loaded!
//function resize_images(maxht, maxwt, minht, minwt) {
//  var imgs = document.getElementById('smallImage');
//
//  var resize_image = function(img, newht, newwt) {
//    img.height = newht;
//    img.width  = newwt;
//  };
//  
//  for (var i = 0; i < imgs.length; i++) {
//    var img = imgs[i];
//    if (img.height > maxht || img.width > maxwt) {
//      // Use Ratios to constraint proportions.
//      var old_ratio = img.height / img.width;
//      var min_ratio = minht / minwt;
//      // If it can scale perfectly.
//      if (old_ratio === min_ratio) {
//        resize_image(img, minht, minwt);
//      } 
//      else {
//        var newdim = [img.height, img.width];
//        newdim[0] = minht;  // Sort out the height first
//        // ratio = ht / wt => wt = ht / ratio.
//        newdim[1] = newdim[0] / old_ratio;
//        // Do we still have to sort out the width?
//        if (newdim[1] > maxwt) {
//          newdim[1] = minwt;
//          newdim[0] = newdim[1] * old_ratio;
//        }
//        resize_image(img, newdim[0], newdim[1]);
//      }
//    }
//  }
//};


//function getBase64Image(img) {
//    // Create an empty canvas element
//    var canvas = document.createElement("canvas");
//    canvas.width = img.width;
//    canvas.height = img.height;
//
//    // Copy the image contents to the canvas
//    var ctx = canvas.getContext("2d");
//    ctx.drawImage(img, 0, 0);
//
//    // Get the data-URL formatted image
//    // Firefox supports PNG and JPEG. You could check img.src to
//    // guess the original format, but be aware the using "image/jpg"
//    // will re-encode the image.
//    var dataURL = canvas.toDataURL("image/png");
//
//    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
//}

function onFail(message) {
      alert('Failed because: ' + message);
}



