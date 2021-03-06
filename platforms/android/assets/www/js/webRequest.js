var apiTimeOut = 20000;
var appV="1.0.0";

// Sha1 encryption //
function SHA1(msg) {
  function rotate_left(n,s) {
    var t4 = ( n<<s ) | (n>>>(32-s));
    return t4;
  };
  function lsb_hex(val) {
    var str="";
    var i;
    var vh;
    var vl;
    for( i=0; i<=6; i+=2 ) {
      vh = (val>>>(i*4+4))&0x0f;
      vl = (val>>>(i*4))&0x0f;
      str += vh.toString(16) + vl.toString(16);
    }
    return str;
  };
  function cvt_hex(val) {
    var str="";
    var i;
    var v;
    for( i=7; i>=0; i-- ) {
      v = (val>>>(i*4))&0x0f;
      str += v.toString(16);
    }
    return str;
  };
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };
  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;
  msg = Utf8Encode(msg);
  var msg_len = msg.length;
  var word_array = new Array();
  for( i=0; i<msg_len-3; i+=4 ) {
    j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
    msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
    word_array.push( j );
  }
  switch( msg_len % 4 ) {
    case 0:
      i = 0x080000000;
    break;
    case 1:
      i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
    break;
    case 2:
      i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
    break;
    case 3:
      i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
    break;
  }
  word_array.push( i );
  while( (word_array.length % 16) != 14 ) word_array.push( 0 );
  word_array.push( msg_len>>>29 );
  word_array.push( (msg_len<<3)&0x0ffffffff );
  for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
    for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
    for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;
    for( i= 0; i<=19; i++ ) {
      temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=20; i<=39; i++ ) {
      temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=40; i<=59; i++ ) {
      temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=60; i<=79; i++ ) {
      temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }
  var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

  return temp.toLowerCase();
}


var sha1key="8345627";

//Login
function postLogin(email, fbId, googleId, loginType, password, registrationId){
    var checksumStr=email+ fbId+ googleId+ loginType+ password+ registrationId+sha1key;
    var hashedStr=SHA1(checksumStr);
    //alert(registrationId);
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/login/user",
      type: "POST",  
                        data:"emailAddress="+email+"&fbId="+fbId+"&googleId="+googleId+"&loginType="+loginType+"&password="+password+"&registrationId="+registrationId +"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger;        
          //alert(JSON.stringify(data)); 
          
        storeProfile(data.USER_ID, data.USER_NAME, data.USER_PWD, data.USER_PHONE, data.USER_PHOTO, data.TOTAL_ACT_CREATED, data.TOTAL_ACT_LIKED, data.TOTAL_ACT_COMMENTED,data.USER_EMAIL);

      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    })
}

function storeProfile(USER_ID, USER_NAME, USER_PWD, USER_PHONE, USER_PHOTO, TOTAL_ACT_CREATED, TOTAL_ACT_LIKED, TOTAL_ACT_COMMENTED,USER_EMAIL) {
    var db = window.openDatabase("Database", "1.0", "WHAZZUPNOW", 200000);
    var profile = {
    values1 : [USER_ID, USER_NAME, USER_PWD, USER_PHONE, USER_PHOTO, TOTAL_ACT_CREATED, TOTAL_ACT_LIKED, TOTAL_ACT_COMMENTED,USER_EMAIL]
    };

    insertProfile(profile);
    
    function insertProfile(profile) {
        db.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS PROFILE');
            tx.executeSql('create table if not exists PROFILE(USER_ID TEXT, USER_NAME TEXT, USER_PWD TEXT, USER_PHONE TEXT, USER_PHOTO TEXT, TOTAL_ACT_CREATED TEXT, TOTAL_ACT_LIKED TEXT, TOTAL_ACT_COMMENTED TEXT,USER_EMAIL TEXT)');
            tx.executeSql('DELETE FROM PROFILE');
            tx.executeSql(
                'INSERT INTO PROFILE(USER_ID, USER_NAME, USER_PWD, USER_PHONE, USER_PHOTO, TOTAL_ACT_CREATED, TOTAL_ACT_LIKED, TOTAL_ACT_COMMENTED,USER_EMAIL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                profile.values1,
                successLogin,
                errorLogin
            );
        });
    }
}

function errorLogin(err){
    alert('Login failed');
}

function successLogin(){
    alert('Success Login')
    location.href="home.html";
}

//forgot password
function postForgotPwd(email){
    var checksumStr=email+sha1key;
    var hashedStr=SHA1(checksumStr);

   $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/login/resetpassword",
      type: "POST",  
        data:"userEmail="+email+ "&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger;        
        alert(JSON.stringify(data));

      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert("error"+xhr.responseText);
          alert("Error: Unable to connect to server.");
        }
    })
}

//Register
function postRegister(email, pwd, photo, registerType, name, registrationId){

    var checksumStr= email+pwd+photo+name+registerType+registrationId+sha1key;
    var hashedStr=SHA1(checksumStr);

    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/register",
      type: "POST",
data:"emailAddress="+email+"&password="+pwd+"&photo="+photo+"&registerType="+registerType+"&registerName="+name+"&registrationId="+registrationId+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger;   
        //alert(JSON.stringify(data));  
        postLogin(email, "", "", "email", pwd,registrationId);

      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+JSON.stringify(xhr));
          alert("Unable to connect to server.");

        }
    })
}
//create post step 1 of 3
function GetActivity(){
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/category",
      type: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger;     
        for(x=0; x<data.length; x++){
           // alert(JSON.stringify(data));
            if(data[x].categoryType=="ACTCATEGORY"){

                $(".merchantDiv").append("<button class='imageBtnLeft' value='"+data[x].categoryId+"' id='button"+x+"' onclick='categoryonclick("+x+");'><img class='image1' src='"+data[x].categoryPhoto+"'/></button>");
                
                x=x+1;
                $(".merchantDiv").append("<button class='imageBtnRight' value='"+data[x].categoryId+"' id='button"+x+"' onclick='categoryonclick("+x+");'><img class='image1' src='"+data[x].categoryPhoto+"'/></button><br>");
                x=x-1;
                $(".merchantDiv").append("<button class='NameLeft'>"+data[x].categoryName+"</button>");
                x=x+1;
                $(".merchantDiv").append("<button class='NameLeft'>"+data[x].categoryName+"</button><br>");
                x=x+1;
                
            }

        }
          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+JSON.stringify(xhr));
          alert("Error: Unable to connect to server.");

        }
    })
    
}

//create post step 2 of 3
function getCategoryList(category){
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/category",
      type: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger;   
       // alert(JSON.stringify(data));
          
        for(x=0; x<data.length; x++){
           // alert(JSON.stringify(data[x]));
            if(category=="48EA29FA-DF6D-42EB-9732-1DA26D21364D" && data[x].categoryType=="48EA29FA-DF6D-42EB-9732-1DA26D21364D"){

                $(".merchantDiv").append("<button class='imageBtnLeft' value='"+data[x].categoryId+"' id='button"+x+"' onclick='categoryonclick("+x+");'><img class='image1' src='"+data[x].categoryPhoto+"'/></button>");
                x=x+1;
                $(".merchantDiv").append("<button class='imageBtnLeft' value='"+data[x].categoryId+"' id='button"+x+"' onclick='categoryonclick("+x+");'><img class='image1' src='"+data[x].categoryPhoto+"'/></button><br>");
                x=x-1;
                $(".merchantDiv").append("<button class='NameLeft'>"+data[x].categoryName+"</button>");
                x=x+1;
                $(".merchantDiv").append("<button class='NameLeft'>"+data[x].categoryName+"</button><br>");
                x=x+1;
               
                
            }
            else if(category=="3E528B45-43F6-4C98-86F8-2FC416C8EEA9" && data[x].categoryType=="3E528B45-43F6-4C98-86F8-2FC416C8EEA9"){
                
                $(".merchantDiv").append("<button class='imageBtnLeft' value='"+data[x].categoryId+"' id='button"+x+"' onclick='categoryonclick("+x+");'><img class='image1' src='"+data[x].categoryPhoto+"'/></button>");
                x=x+1;
                $(".merchantDiv").append("<button class='imageBtnLeft' value='"+data[x].categoryId+"' id='button"+x+"' onclick='categoryonclick("+x+");'><img class='image1' src='"+data[x].categoryPhoto+"'/></button><br>");
                x=x-1;
                $(".merchantDiv").append("<button class='NameLeft'>"+data[x].categoryName+"</button>");
                x=x+1;
                $(".merchantDiv").append("<button class='NameLeft'>"+data[x].categoryName+"</button><br>");
                x=x+1;
            }
            $("#button2").css({"border-radius": "50%", "border" :"5px solid skyblue" });
            $("#button0").css({"border-radius": "50%", "border" :"5px solid skyblue" });

        }
          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert("error"+JSON.stringify(xhr));
          alert("Error: Unable to connect to server.");

        }
    })
}

//about us
function getInfo(){
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/system/aboutus",
      type: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
          
          
      // alert(JSON.stringify(data));
        var faqStr=data.FAQ;
//        faqStr=faqStr.replace("FAQ","");
//          faqStr=faqStr.replace("<head>","");
//          faqStr=faqStr.replace("</head>","");
//          faqStr=faqStr.replace("<body>","");
//          faqStr=faqStr.replace("</body>","");
//        $(".merchantDiv").append("FAQ<input type='button' id='test_btn' value='-'>  </input>")

        $(".merchantDiv").append("<div id='faq'>"+faqStr+"</div>");
 //       $(".merchantDiv").append("<p> "+JSON.stringify(data)+" </p>");
//        $( "#test_btn" ).click(function() {
////            if($("#test_btn").val=='+'){
////                alert("+ to -")
////            $(this).val('-');}
////            else if($(this).val=='-'){
////                alert("- to +")
////            $(this).val('+');}
//            $( "#faq" ).toggle();
//        
//}
        
        termStr=data.Terms;
//        termStr=termStr.replace("Terms and Conditions","");
        $(".merchantDiv").append("<div id='term'>"+termStr+"</div>");
        privacyStr=data.Privacy;
  //      privacyStr=privacyStr.replace("Privacy Policy","");
        $(".merchantDiv").append("<div id='privacy'>"+privacyStr+"</div>");
//          
        
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert("error"+JSON.stringify(xhr));
          alert("Error: Unable to connect to server.");

        }
    })
}

//change password
function postChangePwd(oldpwd,newpwd,useremail){
    var checksumStr=newpwd+oldpwd+useremail+sha1key;
    var hashedStr=SHA1(checksumStr);
    
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/login/changepassword",
      type: "POST",  
        data:"newPassword="+newpwd+ "&oldPassword="+oldpwd+"&userEmail="+useremail+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger;        
        //alert(JSON.stringify(data));
        alert("Password changed successfully.");
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
         // alert("error"+xhr.responseText);
          alert("Error: Unable to connect to server.");
        }
    })
    
}

//Feedback category
function getFeedbackCategory(){
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/feedback/category",
      type: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger;     
        //alert(JSON.stringify(data));
          
          for(x=2; x<data.length; x--){
              $(".formclass").append("<input id='radio_"+x+"' type='radio' name='"+data[x].categoryType+"' value='"+data[x].categoryId+"'>"+data[x].categoryName+"<br><br></input>");
              
              
             $("#radio_2").prop("checked", true)
             
                  
              }
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+JSON.stringify(xhr));
          //alert("Error: Unable to connect to server.");

        }
    })
}

function postFeedbackCreate(rate_id,feedbackStr,iduser){
    
    var checksumStr=rate_id+feedbackStr+iduser+sha1key;
    var hashedStr=SHA1(checksumStr);
    
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/feedback/Create",
      type: "POST",  
        data:"categoryId="+rate_id+ "&feedbackDetail="+feedbackStr+"&userId="+iduser+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger;        
        //alert(JSON.stringify(data));
        alert("Success");
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    })
    
}

function getLogout(registrationId){
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/logout",
      type: "GET",
      data:"registrationId="+registrationId,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger;     
        //alert(JSON.stringify(data));
        alert("success logout");
        location.href="index.html"; 
          
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert("error"+JSON.stringify(xhr));
          alert("Error: Unable to connect to server.");

        }
    })
    
}

function PostDeviceLog(userId,registrationId){
    var deviceName, imeiNo, appVersion, osVersion;
    deviceName=device.model;
    appVersion=appV;
    osVersion=device.version;
    imeiNo=device.uuid;

    
    var checksumStr=appVersion+deviceName+imeiNo+osVersion+registrationId+userId+sha1key;
    var hashedStr=SHA1(checksumStr);
    
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/device",
      type: "POST",  
        data:"appVersion="+appVersion+ "&deviceName="+deviceName+"&imeiNumber="+imeiNo+"&osVersion="+osVersion+"&registrationId="+registrationId+"&userId="+userId+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger;        
        //alert(JSON.stringify(data));

      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    })
    
}

function postLocationUpdate(registrationId,latitude,longitude){
    var countryCode="MY";
    var checksumStr=countryCode+latitude+longitude+registrationId+sha1key;
    var hashedStr=SHA1(checksumStr);
    
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/location",
      type: "POST",  
        data:"countryCode="+countryCode+ "&latitude="+latitude+"&longitude="+longitude+"&registrationId="+registrationId+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
        //alert("Success location");
        //alert(JSON.stringify(data));
       
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    })
    
    
}

function postProfileUpdate(userid, username, userpwd, useremail, userphone, userphoto){
    var checksumStr=useremail+userid+username+userpwd+userphone+userphoto+sha1key;
    var hashedStr=SHA1(checksumStr);
     $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/profile/update",
      type: "POST",  
        data:"userEmail="+useremail+ "&userId="+userid+"&userName="+username+"&userPassword="+userpwd+"&userPhone="+userphone+"&userPhoto="+userphoto+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
        alert(JSON.stringify(data));
       
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    })    
}

function getUserProfile(userId){

    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/profile/statistic?userid="+userId,
      type: "GET",  
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
        //alert(JSON.stringify(data));
        $(".Numyoulike").text(data.fla); //number you like
        $(".NumLike").text(data.fal);    //like you receive
        $(".Numyoucomment").text(data.fca);//number you comment
        $(".NumComment").text(data.fac);//comment you receive
        var overPoint="";
        var currentPoint=data.tt;
        if(currentPoint<1000){
            overPoint="/1000";
        } 
        else if(currentPoint<2000){
            overPoint="/2000";
        }
        else if(currentPoint<3000){
            overPoint="/3000";
        }
        else if(currentPoint<5000){
            overPoint="/5000";
        }
        else if(currentPoint<10000){
            overPoint="/10k";
        }
        else if(currentPoint<50000){
            overPoint="/50k";
        }
        else if(currentPoint<1000000){
            overPoint="/1m";
        }
        else if(currentPoint<10000000){
            overPoint="/10m";
        }
        
        $(".coinNum").text(currentPoint+overPoint);
       
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    })    
}

function getActivityList(registrationId,latitude,longitude, userid){

    var distancekm=500000000;
    var startrow=1;
    var endrow=20;
    var countryCode="MY";
//    var searchValue="";
//    var startdate="20151101";
//    var order="0";
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/listall?registrationId="+registrationId+"&startRow="+startrow+"&endRow="+endrow+"&countryCode="+countryCode,
      type: "GET",  
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
        //alert(JSON.stringify(data));

          for(x=0; x<data.length; x++){
              if(data[x].date_created[4]+data[x].date_created[5]=="11"){
                  var month="Nov";
              }
              else if(data[x].date_created[4]+data[x].date_created[5]=="12"){
                  var month="Dec";
              }
              else if(data[x].date_created[4]+data[x].date_created[5]=="01"){
                  var month="Jan";
              }
              else if(data[x].date_created[4]+data[x].date_created[5]=="02"){
                  var month="Feb";
              }
              else if(data[x].date_created[4]+data[x].date_created[5]=="03"){
                  var month="Mar";
              }
              else if(data[x].date_created[4]+data[x].date_created[5]=="04"){
                  var month="Apr";
              }
              else if(data[x].date_created[4]+data[x].date_created[5]=="05"){
                  var month="May";
              }
              else if(data[x].date_created[4]+data[x].date_created[5]=="06"){
                  var month="Jun";
              }
              else if(data[x].date_created[4]+data[x].date_created[5]=="07"){
                  var month="Jul";
              }
              else if(data[x].date_created[4]+data[x].date_created[5]=="08"){
                  var month="Aug";
              }
              else if(data[x].date_created[4]+data[x].date_created[5]=="09"){
                  var month="Sep";
              }
              else if(data[x].date_created[4]+data[x].date_created[5]=="10"){
                  var month="Oct";
              }
              


              // calculate distance(km) from user lacation to acticity location
              var R=6371;
              var lat1=latitude;
              var lon1=longitude;
              var lat2=data[x].latitude;
              var lon2=data[x].longitude;
              var dLat = deg2rad(lat2-lat1);  // deg2rad below
              var dLon = deg2rad(lon2-lon1); 
              var a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2)
                ; 
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
              var d = R * c; // Distance in km
              var distance=d.toFixed(2);
            
              var actID='"'+data[x].activityId+'"';
              var actName='"'+data[x].activityName+'"';
              var actAddress='"'+data[x].fullAddress+'"';
              var actlat='"'+data[x].latitude+'"';
              var actlon='"'+data[x].longitude+'"';
              var actPhoto='"'+data[x].activityPhoto+'"';
              var desc='"'+data[x].activityDetail+'"';
              var startdate='"'+data[x].dateStart+'"';
              var enddate='"'+data[x].dateEnd+'"';
              var username='"'+data[x].ownerName+'"';
              
              
              $(".scrollul").append("<li id='"+data[x].activityId+"'><div class='activityDiv'><div class='greenbar'><span class='actName'>"+data[x].activityName+"</span><span class='actDate'>"+data[x].date_created[6]+data[x].date_created[7]+" "+month+"</span></div><div class='imgdiv'><img id='"+data[x].activityId+"' class='actImage' onclick='goDetailPage("+actPhoto+","+actName+","+actAddress+","+actlat+","+actlon+","+desc+","+startdate+","+enddate+","+username+","+actID+");' src='"+data[x].activityPhoto+"'/><img id='"+data[x].activityId+"' class='category' src=''/><button class='btndelete' onclick='deleteOnClick("+actID+");'><img class='delete' src=''/></button><button class='btnedit' onclick='editOnClick("+actPhoto+","+actName+","+actAddress+","+actlat+","+actlon+","+desc+","+startdate+","+enddate+","+username+","+actID+");'><img class='edit' src=''/></button><br></div><div class='whitebar'><button class='btnLocation' onclick='locationOnClick("+actName+","+actAddress+","+actlat+","+actlon+");'><img class='imgLocation' src='img/location.png'/></button><span class='distance'>"+distance+"km</span><button class='btnComment' onclick='commentOnClick("+actID+");'><img class='imgComment' src='img/review.png'/></button><span class='numComment'>"+data[x].totalCommented+"</span><button class='btnLike' onclick='likeOnClick("+actID+","+x+");'><img class='imgLike' src='img/like.png'/></button><span class='numLike'>"+data[x].totalLiked+"</span></div></li>");

              
              
              var fileNameIndex = data[x].activityPhoto.lastIndexOf("/") + 1;
              var filename = data[x].activityPhoto.substr(fileNameIndex);
              

              if(filename ==".Jpeg"){
                  $('#'+data[x].activityId+'.actImage').attr("src","img/defaultpic.png");
                  $('#'+data[x].activityId+'.actImage').css("position","absolute"); 
                 $('#'+data[x].activityId+'.actImage').css("top","10vw");  
                  $('#'+data[x].activityId+'.actImage').css("bottom","10vw");
                  $('#'+data[x].activityId+'.actImage').css("height","50vw"); 
          } 
    
              
            
              
              
             // $(".actImage").attr("src",data[x].activityPhoto);
              getSubCategory(data[x].category,data[x].subCategory, data[x].activityId);
              if(data[x].ownerId==userid){
                  $(".btndelete").css("display","block");
                  $(".btnedit").css("display","block");
                  $(".delete").attr("src","img/deleteact.png");
                  $(".edit").attr("src","img/editact.png");
                  
              }
//              if(data[x].commented ==0){
//                  
//                  $("#activityRow"+x+" .imgComment").attr("src","img/reviewalready.png");
//              }
              
              
          }
       
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    }) 
    
}
function deg2rad(deg) {
  return deg * (Math.PI/180)
}
//get comment list in comment page
function getActCommentList(activityId){

     $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/listcomment?activityid="+activityId,
      type: "GET",  
       
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
        //alert(JSON.stringify(data));
          data.reverse();
          for(x=0; x<data.length; x++){
            
            var userPhoto="data:image/jpeg;base64," +data[x].userPhoto;
            $(".CMTscrollul").append("<li id='commentRow"+x+"'><div class='commentDiv'><img class='imgPhoto' src='"+userPhoto+"'/><span class='userName'>"+data[x].userName+"</span><span class='comment'>"+data[x].Comment+"</span><span class='date'>"+data[x].dateComment[0]+data[x].dateComment[1]+data[x].dateComment[2]+data[x].dateComment[3]+'-'+data[x].dateComment[4]+data[x].dateComment[5]+'-'+data[x].dateComment[6]+data[x].dateComment[7]+"</span><span class='time'>"+data[x].dateComment[8]+data[x].dateComment[9]+':'+data[x].dateComment[10]+data[x].dateComment[11]+':'+data[x].dateComment[12]+data[x].dateComment[13]+"</span></div></li>")

            
            if(data[x].userPhoto ==null){
                $(".imgPhoto").attr("src","img/photodefault.jpg");
            }
            
            
          }
            
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    })  
    
}

//comment post
function postComment(userId,comment,activityId){
    var checksumStr=comment+activityId+userId+sha1key;
    var hashedStr=SHA1(checksumStr);
    
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/comment",
      type: "POST",  
      data:"activityComment="+comment+ "&activityid="+activityId+"&userid="+userId+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
        //alert(JSON.stringify(data));
          $('.CMTscrollul li').remove(); //remove old comment 
          getActCommentList(activityId); //reload all the comments in comment page
      
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    }) 
    
}

function postLike(activityId, userid,rowNum){
    var checksumStr=activityId+userid+sha1key;
    var hashedStr=SHA1(checksumStr);
    
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/like",
      type: "POST",  
      data:"activityid="+activityId+ "&userid="+userid+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
        //alert(JSON.stringify(data));
          
          //if user click dislike, number of like will be decrease
          var nowlike=parseInt($('#'+activityId+'.numLike').text());
          if(data.Message=="You have disliked this activity"){
              
               $('#'+activityId+'.imgLike').attr("src","img/like.png");
              var like=parseInt(nowlike)-1;
              $('#'+activityId+'.imgLike').text(like);
          }// if user click like, number of like will be increase
          else if(data.Message=="You have liked this activity"){
              $('#'+activityId+'.imgLike').attr("src","img/unlike.png");
             var like=parseInt(nowlike)+1;
               $('#'+activityId+'.imgLike').text(like);
              
              
          }
          
      
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    }) 
}

//get comment list in detail/reviw page
function  getActCommentListReview(id){
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/listcomment?activityid="+id,
      type: "GET",  
       
      headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
        //alert(JSON.stringify(data));
          data.reverse();
          for(x=0; x<data.length; x++){
            
            var userPhoto="data:image/jpeg;base64," +data[x].userPhoto;
            $("#scrollul-review").append("<li id='commentRow"+x+"'><div class='commentDiv'><img class='imgPhoto' src='"+userPhoto+"'/><span class='userName'>"+data[x].userName+"</span><span class='comment'>"+data[x].Comment+"</span><span class='date'>"+data[x].dateComment[0]+data[x].dateComment[1]+data[x].dateComment[2]+data[x].dateComment[3]+'-'+data[x].dateComment[4]+data[x].dateComment[5]+'-'+data[x].dateComment[6]+data[x].dateComment[7]+"</span><span class='time'>"+data[x].dateComment[8]+data[x].dateComment[9]+':'+data[x].dateComment[10]+data[x].dateComment[11]+':'+data[x].dateComment[12]+data[x].dateComment[13]+"</span></div></li>")

            
            if(data[x].userPhoto ==null){
                $(".imgPhoto").attr("src","img/photodefault.jpg");
            }
            
            
          }
            
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    })  
    
}

function postCommentReview(userId,comment,activityId){
    var checksumStr=comment+activityId+userId+sha1key;
    var hashedStr=SHA1(checksumStr);
    
         $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/comment",
      type: "POST",  
        data:"activityComment="+comment+ "&activityid="+activityId+"&userid="+userId+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
        //alert(JSON.stringify(data));
          $('#scrollul-review li').remove(); //remove old comment 
          getActCommentListReview(activityId); //reload all the comments in review page
      
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    }) 
    
}

//show category photo in activity list
function getSubCategory(category,subCategory,activityId){

     $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/category",
      type: "GET",  
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
     
          for(x=0; x<data.length; x++){
        if(data[x].categoryType ==category && data[x].categoryId ==subCategory ){
            $('#'+activityId+'.category').attr("src",data[x].categoryPhoto)
            
        }
            }
      
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    }) 
    
}

function getDeleteActivity(activityId){
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/delete?activityid="+activityId,
      type: "GET",  
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
        //alert(JSON.stringify(data));
       $('#'+activityId).remove();

           
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    }) 
    
}

function postActivityUpdate(activityId,name,desc,startdate,enddate){
    var checksum=desc+activityId+name+enddate+startdate+sha1key;
    var hashedStr=SHA1(checksum);
    
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/update",
      type: "POST",  
        data:"activityDetail="+desc+ "&activityid="+activityId+"&activityName="+name+"&dateEnd="+enddate+"&dateStart="+startdate+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
        //alert(JSON.stringify(data));
          alert("success");
          
      
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    }) 
}

function getPhotoList(activityId){
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/listphoto?activityid="+activityId,
      type: "GET",  
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
        //alert(JSON.stringify(data));
        for(x=0;x<data.length;x++){
            
            var PhotoUrl1='"'+data[x].activityPhoto+'"';
            
            $("#scrollul-gallery li").append("<button class='imgbtn' id='"+data[x].activityPhoto+"' onclick='imageonclick("+PhotoUrl1+");'><img class='image' src='"+data[x].activityPhoto+"'/></button>");
            x=x+1;
            PhotoUrl1='"'+data[x].activityPhoto+'"';
            $("#scrollul-gallery li").append("<button class='imgbtn' id='"+data[x].activityPhoto+"' onclick='imageonclick("+PhotoUrl1+");'><img class='image' src='"+data[x].activityPhoto+"'/></button>");
            x=x+1;
            PhotoUrl1='"'+data[x].activityPhoto+'"';
            $("#scrollul-gallery li").append("<button class='imgbtn' id='"+data[x].activityPhoto+"' onclick='imageonclick("+PhotoUrl1+");'><img class='image' src='"+data[x].activityPhoto+"'/></button>");
            

            
        }
          
          
      
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    }) 
    
}

function  getDeletePhoto(photo){
      $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/deletephoto?photourl="+photo,
      type: "GET",  
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
//        alert(JSON.stringify(data));
//        alert("success delete");
          $("#"+photo).remove();
            
        
          
          
      
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    }) 
    
}

