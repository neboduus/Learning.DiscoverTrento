

$(document).ready(function(){
    //try to send form data in JSON to server
    $("#place_btn").click(function(e){
        var form = $("#place_form");
        $.ajax({
            url: "http://localhost:5000/placeUpload",
            type: "POST",
            data: JSON.stringify(form),
            success: function(data){
                //check response from the server
                
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("status: " +textStatus+ " - errorThrown: " +errorThrown);
            }
        });
        e.preventDefault(); //Stop defaut action
    });
});
    

    