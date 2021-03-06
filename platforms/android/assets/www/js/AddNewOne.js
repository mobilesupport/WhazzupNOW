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
}

//var categories=1; //1=event, 2=sale
//
//function saleImage() {
//    $("#saleimage").css({"border-radius": "50%", "border" :"5px solid skyblue" });
//
//    $("#eventimage").css({"border" :"transparent" });
//    categories=2;
//}
//function eventImage(){
//    $("#eventimage").css({"border-radius": "50%", "border" :"5px solid skyblue" });
//    
//    $("#saleimage").css({"border" :"transparent" });
//    categories=1;
//}
var categoryId ="3E528B45-43F6-4C98-86F8-2FC416C8EEA9";
function categoryonclick(btnnum){
    resetBtnBorder();
    setBtnBorder(btnnum);
}

function resetBtnBorder(){
     $(".merchantDiv .imageBtnLeft").css("border", "none");
     $(".merchantDiv .imageBtnRight").css("border", "none");
}

function setBtnBorder(btnnum){
    $("#button"+btnnum).css({"border-radius": "50%", "border" :"5px solid skyblue" });
    categoryId = $("#button"+btnnum).val();
   
    
}


function NextOnClick(){
    if(categoryId=="3E528B45-43F6-4C98-86F8-2FC416C8EEA9")
        location.href="AddNewTwoEvent.html?value="+categoryId;
    else 
        location.href="AddNewTwoEvent.html?value="+categoryId;
}
function BackOnClick(){
    window.location="home.html";
}

function HomeOnClick(){
    window.location="home.html";
}

