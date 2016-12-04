/**
 * @brief this function sends a JSON request with data necessary to login and process a JSON response
 * @return nothing
 */
function tryLogin(){
    //get form object
    var form = document.getElementById("logForm");
    //collect form data iterating 
    var data{};
    for(var i=0; ii=form.length, i<ii; i++){
        var input = form[i];
        if(inpu.name){
            data[input.name] = input.value;
        }
    }
    console.log("sent "+data);
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