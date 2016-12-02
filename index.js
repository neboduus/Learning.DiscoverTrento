//express lib
var express = require('express');
//general lib
var app = express();
//seting server port 
app.set('port', (process.env.PORT || 5000));

/**
 * @brief main page, it will check if the user is logged in and print his name
 * @return a page with greetings to user if he/she is logged in, a page with a string that notify the user that he/so is not ogged in yet
 */
app.get('/', function(request, response) 
{
	var text = "Hello world!";	
	
	//write response
	response.writeHead(200, {'Content-Type': 'text/html'});	
    response.end(text);
  	
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});