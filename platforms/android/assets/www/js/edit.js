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


function Backtohomeonclick(){
    window.location="home.html";
}

function viewonclick(actname,address,lat,lon){

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

function closePwd(){
    $(".PwdBg").remove();
}
var currentpage=1;
function changepage(pagenumber){
    if(pagenumber==1 && currentpage!=pagenumber){
        $(".pagenumone").show();
        $(".pagenumtwo").hide();
        $(".pagenumthree").hide();
        
        if(currentpage>pagenumber){
            $(".pagenumone").css("marginLeft", "-100%");
        }
        
        if(currentpage<pagenumber){
            $(".pagenumone").css("marginLeft", "100%");
        }
        
        $(".pagenumone").animate({
                marginLeft: "0%",}, 300, function() {currentpage=1;});
        $(".pagenumtwo").animate({
                marginLeft: "100%",}, 300, function() {});
        $(".pagenumthree").animate({
                marginLeft: "200%",}, 300, function() {});
        
        $(".selectedItem").animate({
                marginLeft: "0%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
        
    }
    
    if(pagenumber==2 && currentpage!=pagenumber){
        
        $(".pagenumone").hide();
        $(".pagenumtwo").show();
        $(".pagenumthree").hide();
        
        if(currentpage>pagenumber){
            $(".pagenumtwo").css("marginLeft", "-100%");
        }
        
        if(currentpage<pagenumber){
            $(".pagenumtwo").css("marginLeft", "100%");
        }
        
        $(".pagenumone").animate({
                marginLeft: "-100%",}, 300, function() {});
        $(".pagenumtwo").animate({
                marginLeft: "0%",}, 300, function() {currentpage=2;});
        $(".pagenumthree").animate({
                marginLeft: "100%",}, 300, function() {});
        
        $(".selectedItem").animate({
                marginLeft: "32.75%",}, 300, function() {$(".selectedItem").css("width", "34.5%");});

    }
    
    if(pagenumber==3 && currentpage!=pagenumber){
        $(".pagenumone").hide();
        $(".pagenumtwo").hide();
        $(".pagenumthree").show();
        
        
        if(currentpage>pagenumber){
            $(".pagenumthree").css("marginLeft", "-100%");
        }
        
        if(currentpage<pagenumber){
            $(".pagenumthree").css("marginLeft", "100%");
        }
        
        $(".pagenumone").animate({
                marginLeft: "200%",}, 300, function() {});
        $(".pagenumtwo").animate({
                marginLeft: "100%",}, 300, function() {});
        $(".pagenumthree").animate({
                marginLeft: "0%",}, 300, function() {currentpage=3;});
        
        $(".selectedItem").animate({
                marginLeft: "67.25%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
        
    }
}

function pageSwipeLeft(){

        if(currentpage==1){
            $(".pagenumone").hide();
            $(".pagenumtwo").show();
            $(".pagenumthree").hide();

            $(".pagenumtwo").css("marginLeft", "100%");

            $(".pagenumone").animate({
                    marginLeft: "-100%",}, 300, function() {});
            $(".pagenumtwo").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=2;});
            $(".pagenumthree").animate({
                    marginLeft: "100%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "32.75%",}, 300, function() {$(".selectedItem").css("width", "34.5%");});
            
        }
        else if(currentpage==2){
             $(".pagenumone").hide();
            $(".pagenumtwo").hide();
            $(".pagenumthree").show();

            $(".pagenumthree").css("marginLeft", "100%");

            $(".pagenumone").animate({
                    marginLeft: "200%",}, 300, function() {});
            $(".pagenumtwo").animate({
                    marginLeft: "100%",}, 300, function() {});
            $(".pagenumthree").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=3;});

            $(".selectedItem").animate({
                    marginLeft: "67.25%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
        }    
    
}

function pageSwipeRight(){
    
    if(!menuStatus){
        if(currentpage==3){
            $(".pagenumone").hide();
            $(".pagenumtwo").show();
            $(".pagenumthree").hide();

            $(".pagenumtwo").css("marginLeft", "-100%");

            $(".pagenumone").animate({
                    marginLeft: "-100%",}, 300, function() {});
            $(".pagenumtwo").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=2;});
            $(".pagenumthree").animate({
                    marginLeft: "100%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "32.75%",}, 300, function() {$(".selectedItem").css("width", "34.5%");});
            
        }
        else if(currentpage==2){
            $(".pagenumone").show();
            $(".pagenumtwo").hide();
            $(".pagenumthree").hide();

            $(".pagenumone").css("marginLeft", "-100%");

            $(".pagenumone").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=1;});
            $(".pagenumtwo").animate({
                    marginLeft: "100%",}, 300, function() {});
            $(".pagenumthree").animate({
                    marginLeft: "200%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "0%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
        
        }
    }
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
        postCommentReview(userId,comment,activityId);
            });   
        
    }
    
    
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
    var abb=daa.getUTCMonth();
    alert(abb);
    var acc=daa.toDateString();
    alert(acc);
    var aasd=daa.getUTCDate();
    alert(aasd);
    var dsa=daa.toISOString();
    alert(dsa);
    var cxz=daa.toLocaleDateString();
    alert(cxz);
    // thu feb 18 2016
    var curr_date = daa.getDate();
    var curr_month = daa.getMonth();
    alert(curr_month);
    alert(daa);
    curr_month=curr_month+1;
    var curr_year = daa.getFullYear();

    
    $(".btnstartdate span").text(curr_date+"/"+curr_month+"/"+curr_year);
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

    
    $(".btnenddate span").text(curr_date+"/"+curr_month+"/"+curr_year);
}

function updateOnClick(activityId){

    var name = $(".actname").val();
    var desc = $(".actdesc").val();
    var nostartdate= $(".btnstartdate span").text();
    var noenddate=$(".btnenddate span").text();
    if(startdate =="Start Date"){
        var startdate="";
    }
    if(enddate=="End Date"){
        var enddate="";
    }
    postActivityUpdate(activityId,name,desc,startdate,enddate);

    
    
}

