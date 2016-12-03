//GET
var util = require('util');
//for binding in the template
var bind = require('bind');
//express lib
var express = require('express');
//connect DB
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://mario:calculator@localhost/discoverdb';
//general lib
var app = express();
//manage session
var session = require('express-session')

//use sessions
app.use(session({ 
	//required, used to prevent tampering
	secret: 'discoverTN', 
	//set time of validity of cookies
	cookie: { maxAge: 600000 }
}));

//seting server port 
app.set('port', (process.env.PORT || 5000));

/**
 * @brief binds to home page
 * @return the first page of the app
 */
app.get('/', function(request, response) 
{
    //bind to the empty template
    bind.toFile('tpl/home.tpl', 
    {
        //don't bind nothing, only show the home page 
    }, 
    function(data) {
        //write response
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});


/**
 * redirect to login page
 */
app.get('/log', function(request, response){
    //just bind to login page
    bind.toFile('tpl/login.tpl', 
    {
        //don't bind nothing, only show the home page 
    }, 
    function(data) {
        //write response
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});



/**
 * connecting to check DB
 */
app.get("/select/", function(request, response){
    var text = 'response:';
	response.writeHead(200, {'Content-Type': 'text/html'});

	//connect to database
	pg.connect(
		//enviromental variable, set by heroku when first databse is created or local one
		connectionString, 
		function(err, client, done) {
		//query
		client.query('SELECT * FROM place', function(err, result) {
			//release the client back to the pool
			done();
			
			//manages err
			if (err){ 
				console.error(err); 
				response.end("Error select" + err); 
		  	}
		  	else {
                var array_results = util.inspect(result.rows);
                
				text = "<p>Dump db: <br> " + array_results + " </p>";
				text = text + "<br> <br>";
		  	}
			
			//response here, otherwise the page will be sent before the execution of the query
			console.log("text final: "+text);
			response.end(text);
		});
  	});
});



//start server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});