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
function GetActivityCategory(){
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
    alert(imeiNo);
    
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
        alert(JSON.stringify(data));
        alert("Success");
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
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
        alert(JSON.stringify(data));
       
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
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

function getCommentedActivity(userId){

    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/myactcommented?userid=",
      type: "GET",  
      data:"userId="+userId,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
        alert(JSON.stringify(data));
        $(".NumComment").text(data);
       
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    })    
}

function getActivityList(registrationId){
    var distancekm="";
    var startrow="";
    var countryCode="MY";
    var searchValue="";
    var startdate="";
    var order=0;
    alert("hi");
    $.ajax({
      url: "http://192.168.1.18/MRWebApi/api/activity/listall?registrationid="+registrationId+"&distancekm="+distancekm+"&startRow="+startrow+"&countryCode="+countryCode+"&searchValue="+searchValue+"&startDate="+"&order="+order,
      type: "GET",  
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


