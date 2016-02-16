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

function UpdateOnClick(){
        
    var username=$("#nameinput").val();

    if(username==""){
        alert("Please enter your name.");
    }
    else if(username.length<5){
        alert("Name must be at least 5 characters.");
    }
    else{
        navigator.notification.prompt(
            'Please enter your password to proceed.',  // message
            onPrompt,                  // callback to invoke
            'Update Profile',            // title
            ['Ok','Cancel'],             // buttonLabels
            'Password'                 // defaultText
        );   
    } 
}

function onPrompt(results) {

    if(results.buttonIndex==2){//If User selected Cancel, then we just do nothing
        return; 
    }else if(results.buttonIndex==1){
        dbmanager.initdb();
        dbmanager.getProfile(function(returnData){
        var pwd=returnData.rows.item(0).USER_PWD;
        if(pwd!=results.input1){
            alert("Invalid authentication type");
        }
        else {
            var userid=returnData.rows.item(0).USER_ID;
            var userpwd=returnData.rows.item(0).USER_PWD;
    var useremail=$("#emailinput").val();
    var username=$("#nameinput").val();
    var userphone=$("#phoneinput").val();
    var $img = $("#smallImage");
    var src = $img.attr("src");
    var userphoto=src.replace('data:image/jpeg;base64,','');
            alert(useremail);
            alert(userphoto);
        }
        
    });    
    }}


    
var photo;
var pictureSource=navigator.camera.PictureSourceType;
function photoOnClick(){
    navigator.notification.confirm(
    'Snap a photo now or upload existing photo?',  // message
    onConfirm,                  // callback to invoke
    'Photo',                    // title
    ['Snap','Upload']           // buttonLabels
    );
        
}
        
function onConfirm(buttonIndex) {

    if(buttonIndex==1){
        alert("snap");
    
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.DATA_URL
});
    }
    else if(buttonIndex==2)
        alert("upload");
    getPhoto(pictureSource.SAVEDPHOTOALBUM);
        
}


function onSuccess(imageData) {
    alert("success");
    var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function getPhoto(source) {
    alert("getphoto");
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }
function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      smallImage.src = imageURI;
    }


function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
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
    alert(photo1);
    
}

function BackOnClick(){
    window.location="home.html";
}

function btnEditOnClick(){
    window.location="EditProfile.html";
}

