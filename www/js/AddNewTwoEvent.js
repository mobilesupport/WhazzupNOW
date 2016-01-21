
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

function categoryonclick(btnnum){
    resetBtnBorder();
    setBtnBorder(btnnum);
}

function resetBtnBorder(){
     $(".merchantDiv .imageBtnLeft").css("border", "none");
}

function setBtnBorder(btnnum){
    $("#button"+btnnum).css({"border-radius": "50%", "border" :"5px solid skyblue" });
    param2=btnnum;
    
}

function NextOnClick(){
    var abc=getUrlParameter("value");
    param1=abc;
    location.href="AddNewThree.html?value="+param1+"&value2=" + param2;
    // VALUE
    // 1=Event, 2=Sales
    
    //VALUE2 
    //0=open day, 1=festival, 2=home improvement, 3=restaurant, 4=expo, 5=fair, 8=retail, 9=pharmacy, 11=sport and fitness, 12=entertainment, 14=road show, 15=beauty and wellness, 16=services, 17=member day, 18=launching

}

function BackOnClick(){
    window.location="AddNewOne.html";
}


function HomeOnClick(){
    window.location="home.html";
}

