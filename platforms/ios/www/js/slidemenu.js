//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//init slide menu
var slideMenu = {
    
    initSlideMenu: function(){

        $("#slidemenu").append("<li onclick='ProfileOnClick();'><div class='itemlabel'>PROFILE<img class='slideimage' src='img/ivprofile.png'/></div></li>");
        $("#slidemenu").append("<li onClick='PasswordOnClick();'><div class='itemlabel'>PASSWORD<img class='slideimage2' src='img/ivpassword.png'/></div></li>");
        $("#slidemenu").append("<li onclick='FeedBackOnClick();'><div class='itemlabel'>FEEDBACK<img class='slideimage3' src='img/ivfeedback.png'/></div></li>");
        $("#slidemenu").append("<li onclick='INFOOnClick();'><div class='itemlabel'>INFO<img class='slideimage4' src='img/ivaboutus.png'/></div></li>");
        $("#slidemenu").append("<li onclick='LogoutOnClick();'><div class='itemlabel'>LOGOUT<img class='slideimage5' src='img/ivlogout.png'/></div></li>");
    },    
}


//$('#target_div').html('<img src="'+ imgPaht +'" width=100 height=100 alt="Hello Image" />');

//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//add slide menu event to control

$(function(){
	
	$("button.MenuBtn").click(function(){
		if(menuStatus != true){				
			$(".menubg").animate({
                marginLeft: "0px",}, 300, function() {
                    menuStatus = true; 
            });
            
		  	return false;
		  } 
        else {
			$(".menubg").animate({
			marginLeft: "-50%",
		  }, 300, function(){menuStatus = false;});
              
			return false;
        }
});
    
//	$("body").on("swipeleft", function(){
//		if (menuStatus){	
//		$(".menubg").animate({
//			marginLeft: "-70%",
//		  }, 300, function(){menuStatus = false});
//		  }
//	});
//	
//	$("body").on("swiperight", function(){
//		if (!menuStatus){	
//		$(".menubg").animate({
//			marginLeft: "0%",
//		  }, 300, function(){menuStatus = true});
//		  }
//	});
//	
//	$("#menu li a").click(function(){
//		var p = $(this).parent();
//		if($(p).hasClass('active')){
//			$("#menu li").removeClass('active');
//		} else {
//			$("#menu li").removeClass('active');
//			$(p).addClass('active');
//		}
//	});
});


function clickmenubutton(){
    if(menuStatus != true){				
        $(".menubg").animate({
        marginLeft: "0px",}, 300, function() {
        menuStatus = true; 
        });
            
        return false;
    } 
    else {
        $(".menubg").animate({
            marginLeft: "-50%",
		  }, 300, function(){menuStatus = false;
        });
              
        return false;
    }
}

function PasswordOnClick(){
    clickmenubutton();
    
    dbmanager.initdb();
        dbmanager.getProfile(function(returnData){
        var emailuser=returnData.rows.item(0).USER_EMAIL;
    $(".app").append("<div class='PwdBg'><div class='PwdContent'><div class='PwdHeader'><button class='PwdTitle'>Change Password</button><button class='PwdCloseBtn' onclick='closePwd();'><img src='img/close.png'/></button></div><div class='PwdDetails'> <button class='text1'>Email Address</button> <input id=Idemail value='"+emailuser+"'class='EmailTextBox'></input><br><button class='text2'>Old Password</button> <input id=oldpassword class='EmailTextBox2'></input><br><button class='text3'>New Password</button> <input id=newpassword class='EmailTextBox3'></input></div><button class='UpdateBtn' onclick='UpdateBtnOnClick();'>Update</button></div></div>");
           
         
    });
    
    
}
    function UpdateBtnOnClick(){
    var oldpwd, newpwd, useremail;
    oldpwd=$("#oldpassword").val();
    newpwd=$("#newpassword").val();
    useremail=$("#Idemail").val();
    
    if(newpwd==""){
        alert("Please enter a new password");  
    }
    else if(newpwd.length<6){
        alert("Password must be at least 6.");
    }
    else {
        postChangePwd(oldpwd,newpwd,useremail);}

        
    }

function closePwd(){
    $(".PwdBg").remove();
}

function FeedBackOnClick(){
    clickmenubutton();
    $(".app").append("<div class='PwdBg'><div class='PwdContent'><div class='PwdHeader'><button class='PwdTitle'>Feedback</button><button class='PwdCloseBtn' onclick='closePwd();'><img src='img/close.png'/></button></div><div class='PwdDetails'><button class='textsubject'>Subject</button><form class='formclass'></form><button class='feedbacktext'>Your Feedback</button><textarea class='feedbackarea' name='paragraph_text'></textarea><button class='UpdateBtn' onclick='SendBtnOnClick();'>Send</button></div></div>");
    getFeedbackCategory();
        
}

function SendBtnOnClick(){
    var feedbackStr=$(".feedbackarea").val();
    if (feedbackStr==""){
        alert("Please enter details.")
    }
    else {
    var rate_id;
    dbmanager.initdb();
    dbmanager.getProfile(function(returnData){
    var iduser=returnData.rows.item(0).USER_ID;
    if (document.getElementById('radio_0').checked) {
        rate_id = document.getElementById('radio_0').value;
        postFeedbackCreate(rate_id,feedbackStr,iduser);
    }
    else if (document.getElementById('radio_1').checked){
        
        rate_id = document.getElementById('radio_1').value;
        postFeedbackCreate(rate_id,feedbackStr,iduser);
    }
    else if (document.getElementById('radio_2').checked){
        rate_id = document.getElementById('radio_2').value;
        postFeedbackCreate(rate_id,feedbackStr,iduser);
    }
    
    
 })   
}
}


function INFOOnClick(){
    window.location="about.html";
    
}



//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//slide menu item onclick
//function aboutUsOnClick(){
//    clickmenubutton();
//    
//    $(".app").append("<div class='aboutUsBg'><div class='aboutUsContent'><div class='aboutUsHeader'><button class='aboutUsTitle'>THE ENTERTAINMENT DIRECTORY</button><button class='aboutUsCloseBtn' onclick='closeAboutUs();'><img src='img/x.png'/></button></div><div class='aboutUsDetails'><div class='aboutUsAppLogoFrame'><img class='aboutUsAppLogo' src='img/logo.png'/></div><div class='aboutUsInfo'><h1>THE ENTERTAINMENT DIRECTORY</h1><br><div><img src='img/address.png'/><p>15, Jalan Dato  Yunus 3, Kawasan Perindustrian Dato Yunus Sulaiman, 81120 Lima Kedai, Gelang Patah, Johor.</p></div><div><img src='img/email.png'/<p>alantan.ted@hotmail.com  </p></div><div><img src='img/phone.png'/><p>+6012 733 3289</p></div></div></div></div></div>");
//    
//    $(".aboutUsAppLogo").load(function(){
//        var marginleft=$(".app").width()/2-$(".aboutUsAppLogo").width()/2;
//        $(".aboutUsAppLogo").css("margin-left", marginleft);
//        $(".aboutUsAppLogo").show();
//    });
//}
//
//function closeAboutUs(){
//    $(".aboutUsBg").remove();
//}
//
//function logoutOnClick(){
//    navigator.notification.confirm("Are you sure you want to logout now?", onConfirm, "Logout", "Logout,Cancel");     
//}
//
//function onConfirm(button) {
//    if(button==2){//If User selected No, then we just do nothing
//        return; 
//    }else{
//        deleteProfile();
//    }
//}
//
//function deleteProfile() {
//    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
//    db.transaction(runDeleteProfile, errorDeleteProfile, successDeleteProfile);
//}
//
//function runDeleteProfile(t){
//    t.executeSql('DELETE FROM PROFILE');
//}
//
//function errorDeleteProfile(err){
//    loading.endLoading();
//    navigator.notification.alert("Logout failed.", function(){}, "myTed", "Ok");
//}
//
//function successDeleteProfile(){
//    loading.endLoading();
//    navigator.notification.alert("Logout succesfully", function(){}, "myTed", "Ok");
//    window.location="index.html";
//}
//
//function forgotPwdOnClick(){
//    dbmanager.getProfile(function(returnData){
//        var email=returnData.rows.item(0).EMAIL;
//        navigator.notification.confirm("Email will be sent to "+email+" for you to set new password. Click ok to proceed", onForgotPasswordConfirm, "Forgot Password", "Cancel,Ok");     
//    });
//}
//
//function onForgotPasswordConfirm(button) {
//    if(button==1){//If User selected No, then we just do nothing
//        return; 
//    }else{
//        clickmenubutton();
//        dbmanager.getProfile(function(returnData){
//            postForgotPwd(returnData.rows.item(0).PHONE);
//        });
//    }
//}
//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
