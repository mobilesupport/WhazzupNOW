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
       // initGoogleMap();
        
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
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -3.1333, lng: 101.7000},
    zoom: 2
  });
  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('pac-input'));


  var types = document.getElementById('type-selector');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);


  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });
  autocomplete.addListener('place_changed', function() {

    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    var longAddress=place.formatted_address;
    var shortAddress=place.address_components[3].long_name;
    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();
    
      
      
      
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {

      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });




}

//var map;
//function initGoogleMap(){
//
//    var latlong=new google.maps.LatLng(1.542160222923056 , 103.80120195144707);
//
//    var mapOptions={
//        center:latlong,
//        zoom:12,
//        mapTypeId: google.maps.MapTypeId.ROADMAP,
//        navigationControlOptions: {
//            style: google.maps.NavigationControlStyle.SMALL
//        },
//        mapTypeControl: false,
//    };
//
//    map=new google.maps.Map(document.getElementById("geolocation"), mapOptions);
//
//}

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
    
      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
    smallImage.src = "data:image/jpeg;base64," + imageData;
    //resize_images(10,10,10,10);
    photo=imageData;
    var photo1=photo.replace(/\s/g, '');
    alert(photo1);
    
}


function BackOnClick(){
    window.location="AddNewTwoEvent.html";
}

function HomeOnClick(){
    window.location="home.html";
}

