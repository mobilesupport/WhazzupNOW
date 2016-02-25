
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

var photo;
var pictureSource=navigator.camera.PictureSourceType;
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
    var abc=getUrlParameter("value");
    window.location="AddNewTwoEvent.html?value="+abc;
}

function HomeOnClick(){
    window.location="home.html";
}

//start date
function StartDateOnClick(){
    var options = {
    date: new Date(),
    mode: 'date', // or 'time'
    allowOldDates: false,
    allowFutureDates: true,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
};
    datePicker.show(options, onSuccess, onError);
}

function onSuccess(date) {
    // change date format to dd/mm/yyyy
    var daa=date;
    var curr_date = daa.getDate();
    var curr_month = daa.getMonth();
    curr_month=curr_month+1;
    var curr_year = daa.getFullYear();

    
    $("#startdate span").text(curr_date+"/"+curr_month+"/"+curr_year);
}

function onError(error) { // Android only
    alert('Error: ' + error);
}

//end date
function endDateOnClick(){
var options = {
    date: new Date(),
    mode: 'date', // or 'time'
    allowOldDates: false,
    allowFutureDates: true,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
};
    datePicker.show(options, onEndSuccess, onError);
}
function onEndSuccess(date) {
    //change date format to dd/mm/yyyy
    var daaa=date;
    var curr_date = daaa.getDate();
    var curr_month = daaa.getMonth();
    curr_month=curr_month+1;
    var curr_year = daaa.getFullYear();

    
    $("#enddate span").text(curr_date+"/"+curr_month+"/"+curr_year);
}

