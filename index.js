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

//defining some static content
app.use("/img", express.static(__dirname + '/img'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/scripts", express.static(__dirname + '/scripts'));

//required to parse request bodies - POST and JSON
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
 * intercepts request GET to private space 
 * if already logged in redirect to a page that allows to manage 
 * site places, events and news
 */
app.get("/login", function(req, res){
    var sess = req.session;
    //checking for session
    console.log("session = "+sess);
    if (typeof sess.username != 'undefined' && sess.username){
        //redirect to manage info page
        //if no session redirect to login
        bind.toFile('tpl/insert.tpl',{},
                    function(data){
                        //write response
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(data);
                    });
    }else{
        //if no session redirect to login
        bind.toFile('tpl/login.tpl',{},
                    function(data){
                        //write response
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(data);
                    });
    }
});

/**
 * intercepts POST request from login page
 * try to login a user if there is data in the request body
 * redirect to login otherwise
 */
app.post("/login", function(req, res){
    var username = "undefined";
    var password = "undefined";
    var response = "OK";
    if( typeof req.body!='undefined' && req.body){
        //read the content of the post and check it
        //if query is defined and not null
        //check username
		if ( typeof req.body.username != 'undefined' && req.body.username){
            username = req.body.username;
        }else{
            response = "Username or password NOT INSERTED!";
        }
        //check password
        if( typeof req.body.password != 'undefined' && req.body.password){
            password = req.body.password
        }else{
            response = "Username or password NOT INSERTED!";
        }
    }else{
        response = "Username or password NOT INSERTED!"
        console.log(response);
    }
    
    //if no errors
    if (response=="OK"){
        console.log("User and Pass INSERTED");
        //check if user exists
        //connect to database
        pg.connect(
            //enviromentallocal variabile, or heroku one
            connectionString, 
            function(err, client, done) {
            //query
            client.query('SELECT username FROM admin WHERE username=$1::text AND password=$2::text;', [username, password], function(err, result) {
                //release the client back to the pool
                done();
                
                //manages err
                if (err){ 
                    console.error(err); 
                    response = "Database ERROR during SELECT - " + err;
                }else{
                    //check for matching row
                    if(typeof result.rows[0] != 'undefined' && result.rows[0]){
                        console.log("found username = "+ result.rows[0].username);
                        response = "1";
                        console.log("Username and Password ACCEPTED");
                    }else{
                        response = "Username and Password DON'T EXISTS!";
                        console.log(response);
                    }
                }

                //response here, otherwise the page will be sent before the execution of the query
                if (response=="1"){
                    //admin exists 
                    //set a session
                    req.session.username = username;
                    console.log("session inserted")
                    //redirect to private page
                    bind.toFile('tpl/insert.tpl',{},
                        function(data){
                            //write response
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.end(data);
                        });
                }else{
                    //admin doesn't exist
                    //redirect to login page
                    bind.toFile('tpl/login.tpl',
                                {
                        FLAG :  true
                    },
                        function(data){
                            //write response
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.end(data);
                        });
                }
            });
        });
    }else{
        //User or Pass not inserted
        //admin doesn't exist
        //redirect to login page
        bind.toFile('tpl/login.tpl',
        {   //set a message for the user
            message : "Username or Password does not exist!!!"
        },
            function(data){
            //write response
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
        });
    }    
})

/*
 * intercepts POST request to /placeUpload that contains infos to insert a new place in DB
 * 
 */
app.post("/placeUpload", function(req, res){
    //variable message to send back to the requester
    var response = "-1";
    //variables nedded for update
    var name;
    var address;
    var history;
    var info;
    var type;
    //check if they sent something that makes sense
    if( typeof req.body!='undefined' && req.body){
        //check all the fields needed
        
    }
    
});


/*
 * for destroying session
 
 app.get('/logout',function(req,res){
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
    
 */

//start server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});