function tryNewsUpdate(){
    //get form object
    var form = document.getElementById("news_form");
    //collect form data iterating 
    var data = new Array();
    for(var i=0; ii=form.length, i<ii; i++){
        var input = form[i];
        if(input.name){
            //data1.push(input.name);
            //data2.push(input.value);
            data[input.name] = input.value;
            //alert(data.toString);
        }
    }
    console.log("sent "+ data);
    //construct an HttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    //send collected data as JSON
    xhr.send(JSON.stringify(data));
    
    xhr.onloadend = function(){
        var result = xhr.responseText;
        console.log(result);
    }
}