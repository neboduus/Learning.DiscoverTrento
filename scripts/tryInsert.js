$(document).ready(function(){

	//post - try to insert news in the DB
	$("#news_btn").click(function(){
        var title = $("#title").val();
        var desc = $("#desc").val();
        var data = $("#data").val();
        var hour = $("#hour").val();
        var place = $("#place").val();
        
        if (title==="" || desc==="" || data==="" || hour==="" || place===""){
            alert("Fai attenzione forse mancano dei campi!");
        }else{
            $.post("http://localhost:5000/newsUpload",
            {
                title: title,
                desc: desc,
                data: data,
                hour: hour,
                place: place
            },
            function(data, status){
                switch(data){
                    case "1":
                        alert("News successfully Inserted");
                        document.getElementById("news_form").reset();
                        break;
                    case "-1":
                        alert("We have some errors with the server and we can not process the inserting now! Please try again Later!");
                        break;
                    case "-2":
                        alert("Server recieved no data! are you sure you completed all the fields?");
                        break;
                    case "-3":
                        alert("News not Inserted due to parameter missing");
                        break;
                }
            });
        }
    });
        
    //post - try to insert events in the DB
	$("#event_btn").click(function(){
        var eventName = $("#eventName").val();
        var eventAddress = $("#eventAddress").val();
        var eventData = $("#eventData").val();
        var eventHours = $("#eventHours").val();
        var eventDesc = $("#eventDesc").val();
        var eventCost = $("#eventCost").val();
        var eventPlace = $("#eventPlace").val();
        var eventType = $("#eventType").val();
        
        alert(eventName+" "+eventAddress+" "+eventData+" "+eventHours+" "+eventDesc+" "+eventCost+" "+eventPlace+" "+eventType);
        
        if (eventName==="" || eventAddress==="" || eventData==="" || eventHours==="" 
            || eventDesc==="" || eventCost==="" || eventPlace==="" || eventType===""){
            alert("Fai attenzione forse mancano dei campi!");
        }else{
            $.post("http://localhost:5000/eventUpload",
            {
                eventName: eventName,
                eventAddress: eventAddress,
                eventData: eventData,
                eventHours: eventHours,
                eventDesc: eventDesc,
                eventCost: eventCost,
                eventPlace: eventPlace,
                eventType: eventType
            },
            function(data, status){
                switch(data){
                    case "1":
                        alert("Event successfully Inserted");
                        document.getElementById("eventForm").reset();
                        break;
                    case "-1":
                        alert("We have some errors with the server and we can not process the inserting now! Please try again Later!");
                        break;
                    case "-2":
                        alert("Server recieved no data! are you sure you completed all the fields?");
                        break;
                    case "-3":
                        alert("Event not Inserted due to parameter missing");
                        break;
                }
            });
        }       
	});
    
    
    //post - try to insert places in the DB
	$("#place_btn").click(function(){
        var placeName = $("#placeName").val();
        var placeAddress = $("#placeAddress").val();
        var placeHistory = $("#placeHistory").val();
        var placeInfo = $("#placeInfo").val();
        var placeType = $("#placeType").val();
        
        if (placeName==="" || placeAddress==="" || placeHistory==="" || placeType===""){
            alert("Fai attenzione forse mancano dei campi!");
        }else{
            $.post("http://localhost:5000/placeUpload",
            {
                placeName: placeName,
                placeInfo: placeInfo,
                placeAddress: placeAddress,
                placeHistory: placeHistory,
                placeType: placeType
            },
            function(data, status){
                switch(data){
                    case "1":
                        alert("Place successfully Inserted");
                        document.getElementById("eventForm").reset();
                        break;
                    case "-1":
                        alert("We have some errors with the server and we can not process the inserting now! Please try again Later!");
                        break;
                    case "-2":
                        alert("Server recieved no data! are you sure you completed all the fields?");
                        break;
                    case "-3":
                        alert("Place not Inserted due to parameter missing");
                        break;
                }
            });
        }       
	});

});