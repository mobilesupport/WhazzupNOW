
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
var param2;
var param1;
var subcategoryId="1963EC98-C963-44B4-A373-DE48EF380C2C";

function categoryonclick(btnnum){
    resetBtnBorder();
    setBtnBorder(btnnum);
}

function resetBtnBorder(){
     $(".merchantDiv .imageBtnLeft").css("border", "none");
}

function setBtnBorder(btnnum){
    param2=0;
    $("#button"+btnnum).css({"border-radius": "50%", "border" :"5px solid skyblue" });
   
    subcategoryId = $("#button"+btnnum).val();
    param2=subcategoryId;
    
}

function NextOnClick(){
    var abc=getUrlParameter("value");
    param1=abc;
    location.href="AddNewThree.html?value="+param1+"&value2="+param2;
    

}

function BackOnClick(){
    window.location="AddNewOne.html";
}


function HomeOnClick(){
    window.location="home.html";
}

