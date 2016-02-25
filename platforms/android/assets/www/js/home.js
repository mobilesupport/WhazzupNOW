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

function AddOnClick(){
    window.location="AddNewOne.html";
}

function pageSwipeLeft(){
    if(menuStatus){
        $("body").on("swipeleft", function(){
            if (menuStatus){	
            $(".menubg").animate({
                marginLeft: "-50%",
              }, 300, function(){menuStatus = false});
              }
        });
    }
}

function commentOnClick(activityId){
    
  var actID='"'+activityId+'"';
  $(".app").append("<div class='PwdBg'><div class='PwdContent'><div class='PwdHeader'><button class='PwdTitle'>Comments</button><button class='PwdCloseBtn' onclick='closeCmt();'><img src='img/close.png'/></button></div><div class='MiddleComment'><input class='inputComment' placeholder='Write your comment here...' maxlength='200'></input><button class='btnSend' onclick='sendOnClick("+actID+")'>Send</button></div><div class='CMTcontent'><div class='CMTpageone'><div class='CMTwrapper'><div class='CMTscroll-content'><ul class='CMTscrollul'></ul><br></div></div></div></div></div></div>");
  getActCommentList(activityId);
    
    
    

}

function sendOnClick(activityId){
    var comment =$(".inputComment").val();
    if(comment.length>200){
        alert("Please enter a comment with maximum 200 words.")
    }
    else {
        dbmanager.initdb();
        dbmanager.getProfile(function(returnData){
        var userId=returnData.rows.item(0).USER_ID;
        postComment(userId,comment,activityId);
        
        });
    }
    
     
}


    
function closeCmt(){
    
    $(".PwdBg").remove();
    $('.scrollul li').remove();
    onDeviceReady();

    }


    
function locationOnClick(actname, address, lat,lon){
 
    $(".app").append("<div class='PwdBg'><div class='PwdContent'><div class='PwdHeader'><button class='PwdTitle'>Location</button><button class='PwdCloseBtn' onclick='closePwd();'><img src='img/close.png'/></button></div><span class='activityName'>"+actname+"</span><span class='activityAddress'>"+address+"</span><div id='map'></div></div></div>");
    
    initMap(lat,lon);
}

  function initMap(lat,lon) {
     
    var la1 = lat;
    var lo1 = lon;
    var coords = new google.maps.LatLng(la1,lo1);
    var mapOptions = {
        zoom: 18,
        center: coords,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(
        document.getElementById("map"), mapOptions
        );
      
    var marker = new google.maps.Marker({
    position: coords,
    map: map,
    
  });
}

function likeOnClick(activityId,rowNum){
    dbmanager.initdb();
    dbmanager.getProfile(function(returnData){
    var userId=returnData.rows.item(0).USER_ID;
        postLike(activityId,userId,rowNum)
         
            });   
}

function goDetailPage(actPhoto, actName, actAddress, actLat, actLon,desc,startdate,enddate,username,id){
    window.location="detail.html?actPhoto="+actPhoto+"&actName="+actName+"&actAddress="+actAddress+"&actLat="+actLat+"&actLon="+actLon+"&actDesc="+desc+"&startdate="+startdate+"&enddate="+enddate+"&username="+username+"&id="+id;
   
}

function deleteOnClick(activityId){
    var id=activityId;
     navigator.notification.confirm("Do you want to delete this post?", onConfirm, "Delete Post", "Yes,Cancel"); 
    
    function onConfirm(button) {
        
    if(button==2){//If User selected Cancel, then we just do nothing
        return; 
        
    }else if(button==1){

        getDeleteActivity(id);
       
        
    }
    }
}

function editOnClick(actPhoto, actName, actAddress, actLat, actLon,desc,startdate,enddate,username,id){
    window.location="edit.html?actPhoto="+actPhoto+"&actName="+actName+"&actAddress="+actAddress+"&actLat="+actLat+"&actLon="+actLon+"&actDesc="+desc+"&startdate="+startdate+"&enddate="+enddate+"&username="+username+"&id="+id;
    
}



