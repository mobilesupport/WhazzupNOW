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


function BackOnClick(){
    window.location="index.html";
}

function CreateOnClick(){
    window.location ="signup.html";
}

function LoginOnClick(){
    var pwd, email,registrationId;
    email=$("#email").val();
    pwd=$("#password").val();
    
    if(email==""){
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
        dbmanager.initdb();
        dbmanager.getRedId(function(returnData){
        registrationId=returnData.rows.item(0).rregid;
        //alert(registrationId);
        postLogin(email, "", "", "email",pwd, registrationId)});
    }
}


function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

function btnFbOnClick(){
    var permission=["public_profile", "email"];
    var fbLoginSuccess = function (userData) {
        facebookConnectPlugin.api("/me?fields=id,email,name&access_token="+userData.authResponse.accessToken, permission,
        function (result) {
            var name=result.name;
            var email=result.email;
            var fbid=result.id;
            alert(email);
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

function ForgotOnClick(){
    navigator.notification.prompt(
    'Please enter your email address.',  // message
    onPrompt,                  // callback to invoke
    'Forgot Password',            // title
    ['Ok','Cancel'],             // buttonLabels
    'Email Address'                 // defaultText
    );
}

function onPrompt(results) {
//alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
    if(results.buttonIndex==1)
    {
        if(results.input1.length==0)
            alert("Please enter your email address");
        else if (!isValidEmailAddress(results.input1))
            alert("Invalid email address");
        else
            postForgotPwd(results.input1);
    
}
}

