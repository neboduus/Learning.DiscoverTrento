$(document).ready(function(){
    
    
    $("#logForm").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"/log/",
            data:$.param($(this).serializeArray()),
            success:function(datapass){
                if(datapass=='0'){
                    $("#responseText").html("Username or password error.");
                }else if(datapass=='1'){
                    $("#responseText").html("ok");
                }
            }
        });
    });
    
});