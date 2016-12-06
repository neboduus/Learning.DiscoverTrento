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

//defining some static content
app.use("/img", express.static(__dirname + '/img'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/scripts", express.static(__dirname + '/scripts'));

// set the view engine to ejs
app.set('view engine', 'ejs');

//use sessions
app.use(session({ 
	//required, used to prevent tampering
	secret: 'discoverTN', 
	//set time of validity of cookies
	cookie: { maxAge: 600000 }
}));

//seting server port 
app.set('port', (process.env.PORT || 5000));

//required to parse request bodies - POST and JSON
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * @brief binds to home page
 * @return the first page of the app
 */
app.get('/', function(req, res) 
{  
    res.render('home.ejs');
});

/**
 * intercepts request GET to private space 
 * if already logged in redirect to a page that allows to manage 
 * site places, events and news
 */
app.get("/login", function(req, res){
    var sess = req.session;
    //checking for session
    if (typeof sess.username != 'undefined' && sess.username){
        //redirect to manage info page
        //if no session redirect to login
        res.render('insert.ejs', {
            flag: "1",
            title: "",
            desc: "",
            data: "",
            hour: "",
            place: ""
        });
    }else{
        //if no session redirect to login
        res.render('login.ejs', {flag: "1"});
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
		if ( typeof req.body.user != 'undefined' && req.body.user){
            username = req.body.user;
        }else{
            response = "Username or password NOT INSERTED!";
        }
        //check password
        if( typeof req.body.psw != 'undefined' && req.body.psw){
            password = req.body.psw
        }else{
            response = "Username or password NOT INSERTED!";
        }
    }else{
        response = "Username or password NOT INSERTED!"
        console.log(response);
    }
    
    //if no errors
    if (response=="OK"){
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
                    res.render('insert.ejs', {
                        newsMessage: '1',
                        title: "",
                        desc: "",
                        data: "",
                        hour: "",
                        place: ""
                    });
                }else{
                    //admin doesn't exist
                    //redirect to login page
                    res.render('login.ejs',{flag: '-1'});
                }
            });
        });
    }else{
        //User or Pass not inserted
        //admin doesn't exist
        //redirect to login page
        res.render('login.ejs', {flag: '-1'})
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
 * intercepts POST request to /newsUpload that contains infos to insert a new place in DB
 * 
 */
app.post("/newsUpload", function(req, res){
    //variable message to send back to the requester
    var text = "";
    //variables nedded for update
    var title = "";
    var description = "";
    var data = "";
    var hour = "";
    var place = "";
    //check if they sent something that makes sense
    if( typeof req.body!='undefined' && req.body){        
        //check all the fields needed
        if( typeof req.body.title != 'undefined' && req.body.title){
            title = req.body.title;
        }else{
            text = text + "title ";
        }       
        
        if(typeof req.body.desc !='undefined' && req.body.desc){
            description = req.body.desc;
        }else{
            text = text + "description ";
        }    
        
        if(typeof req.body.data !='undefined' && req.body.data){
            data = req.body.data;
        }else{
            text = text + "data ";
        }    
        
        if(typeof req.body.hour !='undefined' && req.body.hour){
            hour = req.body.hour;
        }else{
            text = text + "hour ";
        }     
        
        if(typeof req.body.place !='undefined' && req.body.place){
            place = req.body.place;
        }else{
            text = text + "place ";
        }
        
        if(text != ""){
            text = text + "- missing";
            console.log(text);
            //redirect to the inserting page giving a message
            res.render('insert.ejs',{
                newsMessage: text,
                title: title,
                desc: description,
                data: data,
                hour: hour,
                place: place
            });
        }else{
            //messagge for the server
            console.log("Paramaters inserting NEWS OK");
            text = "OK";
            
            //parameters was inserted
            //now connect to erver and insert data
            pg.connect(
            //enviromentallocal variabile, or heroku one
                connectionString, 
                function(err, client, done) {
                //insert data throught a query
                client.query('INSERT INTO news(title, description, data, hour, place_name) VALUES($1, $2, $3, $4, $5);', 
                             [title, description, data, hour, place], function(err, result) {
                    //release the client back to the pool
                    done();

                    //manages err
                    if (err){ 
                        console.error(err); 
                        response = "Database ERROR during INSERT - " + err;
                    }else{
                        //inserted in db OK
                        console.log('row inserted ');
                        //redirect to admin page
                        res.render('insert.ejs',{
                            newsMessage: "OK",
                            title: title,
                            desc: description,
                            data: data,
                            hour: hour,
                            place: place
                        });
                    }

                });
            });
        }    
    }else{
        //no data sent
        res.render('insert.ejs',{
                newsMessage: text,
                title: title,
                desc: description,
                data: data,
                hour: hour,
                place: place
            });
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