//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//page loading

var loading = {
    
    //add loading page when calll
    startLoading:function(){
        $(".app").prepend("<div class='loadingPage'><div class='loadingFrame'><img class='loadingIcon' src='img/progress_loading.png'></img></div></div>");
    },
    
    //remove loading page when call
    endLoading:function(){
        $(".loadingPage").remove();
    }
};



var db;
var dbmanager = {
    initdb:function(){
        db = window.openDatabase("Database", "1.0", "WHAZZUPNOW", 200000);
    },
    
    createTable:function(){
        db.transaction(createTableTransaction, this.errorExecuteSQL, this.successExecuteSQL);
        
        function createTableTransaction(t){
            t.executeSql('create table if not exists PROFILE(USER_ID TEXT, USER_NAME TEXT, USER_PWD TEXT, USER_PHONE TEXT, USER_PHOTO TEXT, TOTAL_ACT_CREATED TEXT, TOTAL_ACT_LIKED TEXT, TOTAL_ACT_COMMENTED TEXT,USER_EMAIL TEXT)');
            t.executeSql('create table if not exists FIRSTRUN(RUN TEXT)');
        }
    },
    
    getProfile:function(returnData){
        db.transaction(function(tx){
            tx.executeSql('SELECT * FROM PROFILE', [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        });
    },
    
    getRedId:function(returnData){
        db.transaction(function(tx){
            tx.executeSql('SELECT * FROM regisid', [], function(tx,rs){
            returnData(rs);  
        }, this.errorExecuteSql);
                       });
        
    },
    
    getLikedActId:function(returnData){
        db.transaction(function(tx){
            tx.executeSql('SELECT * FROM ACTIVITY', [], function(tx,rs){
                returnData(rs);
            },this.errorExecuteSQL);
        });
    },
    
    checkFirstRun:function(returnData){
        db.transaction(function(tx){
            tx.executeSql('create table if not exists FIRSTRUN(RUN TEXT)');
            tx.executeSql('SELECT * FROM FIRSTRUN', [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        });
    },
    
    successExecuteSQL:function(){
        //success to executeSQL
    },
    
    errorExecuteSQL:function(err){
        //fail executeSQL
        alert("fail"+err.message);
    },
};


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//getDataFromUrl

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
