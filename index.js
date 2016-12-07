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
//for managing uploads
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img/photo')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})
var upload = multer({ storage: storage });

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
app.get('/', function(req, res) {  
    res.render('home.ejs');
});

app.get('/categories', function(req, res){
    res.render('categories.ejs');
});

app.get('/university', function(req, res){
    res.render('university.ejs');
});

/*
 *GET libraries of unitn 
 */
app.get('/libraries', function(req, res){

    pg.connect(
    connectionString,
    function(err, client, done){
        client.query('SELECT * FROM place WHERE type=1', function(err, result){
            //release client
            done();
            
            //manage errors
            if (err){
                console.error(err); 
            }else{
                //get the objects
                if(typeof result.rows[0] != 'undefined' && result.rows[0]){
                    console.log("got libraries");
                    res.render('libraries.ejs',{
                        libraries: result.rows
                    });
                }else{
                    res.end("Error");
                }
            }
        });
    });

});

/*
 *GET departments of unitn 
 */
app.get('/departments', function(req, res){

    pg.connect(
    connectionString,
    function(err, client, done){
        client.query('SELECT * FROM place WHERE type=0;', function(err, result){
            //release client
            done();
            
            //manage errors
            if (err){
                console.error(err); 
            }else{
                //get the objects
                if(typeof result.rows[0] != 'undefined' && result.rows[0]){
                    console.log("got departments");
                    res.render('libraries.ejs',{
                        libraries: result.rows
                    });
                }else{
                    res.end("Error");
                }
            }
        });
    });

});

/*
 *GET information for a specific place
 */
app.post('/place',function(req, res){
    var placeId;
    if (typeof req.body != 'undefined' && req.body){
        if(typeof req.body.placeId != 'undefined' && req.body.placeId){
            placeId = parseInt(req.body.placeId);
            //query DB for info
            pg.connect(
            connectionString,
            function(err, client, done){
                client.query('SELECT * FROM place WHERE id=$1', [placeId], function(err, result){
                    //release client
                    done();

                    //manage errors
                    if (err){
                        console.error(err); 
                    }else{
                        //get the objects
                        if(typeof result.rows[0] != 'undefined' && result.rows[0]){
                            console.log("got place info");
                            res.render('place.ejs',{
                                place: result.rows[0]
                            });
                        }else{
                            res.end("Error");
                        }
                    }
                });
            });
            
        }else{
            res.end("NO ID RECIEVED");
        }
    }else{
        res.end("NO DATA SENT");
    }
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
        res.render('insert.ejs', {
            where: "1",
            newsMessage: "1",
            placeMessage: "1",
            eventMessage: "1",
            flag: "1",
            title: "",
            desc: "",
            data: "",
            hour: "",
            place: "",
            placeName: "",
            placeAddress: "",
            placeHistory: "",
            placeType: "",
            placeInfo: "",
            eventName: "",
            eventAddress: "",
            eventData : "",
            eventHours: "",
            eventDescription: "",
            eventCost: "",
            eventPlace: "",
            eventType: ""
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
                        where: "1",
                        newsMessage: "1",
                        placeMessage: "1",
                        eventMessage: "1",
                        title: "",
                        desc: "",
                        data: "",
                        hour: "",
                        place: "",
                        placeName: "",
                        placeAddress: "",
                        placeHistory: "",
                        placeType: "",
                        placeInfo: "",
                        eventName: "",
                        eventAddress: "",
                        eventData : "",
                        eventHours: "",
                        eventDescription: "",
                        eventCost: "",
                        eventPlace: "",
                        eventType: ""
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
app.post('/placeupload', upload.single('placePhoto'), function (req, res, next) {
    // req.file is the `placePhoto` file 
    var text = "";
    var fileName;
    if (req.file != 'undefined' && req.file){
        //file choosed by the user
        console.log("file choosed and uploaded");
        fileName = req.file.filename;
        console.log("new filename: "+fileName);
    }else{
        //no file was coosed
        console.log("no file choosen");
        text = text + "file; ";
    }
    
    // req.body will contain the text fields, if there were any 
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
        console.log(req.body.placeName);
        
        if(typeof req.body.placeName != undefined && req.body.placeName){
            //placeName inserted, get it
            name = req.body.placeName;
        }else{
            //no name was inserted, let's write the message
            text = text + "name; ";
        }
        
        if(typeof req.body.placeAddress != 'undefined' && req.body.placeAddress){
            address = req.body.placeAddress;
        }else{
            text = text + "address; ";
        }
        
        if(typeof req.body.placeHistory != 'undefined' && req.body.placeHistory){
            history = req.body.placeHistory;
        }else{
            text = text + "history; ";
        }
        
        if(typeof req.body.placeInfo != 'undefined' && req.body.placeInfo){
            info = req.body.placeInfo;
        }else{
            text = text + "info; ";
        }
        
        if(typeof req.body.placeType != 'undefined' && req.body.placeType){
            type = parseInt(req.body.placeType);
        }else{
            text = text + "type; ";
        }
        
        //if there was an empty field
        if(text != ""){
            //complete the message
            text = text + "missing - PLACE NOT INSERTED - TRY AGAIN";
            console.log(text);
            
            //redirect to the page with a message
            res.render('insert.ejs', {
                where: "1",
                newsMessage: "1",
                placeMessage: text,
                eventMessage: "1",
                flag: "1",
                title: "",
                desc: "",
                data: "",
                hour: "",
                place: "",
                placeName: name,
                placeAddress: address,
                placeHistory: history,
                placeType: type,
                placeInfo: info,
                eventName: "",
                eventAddress: "",
                eventData : "",
                eventHours: "",
                eventDescription: "",
                eventCost: "",
                eventPlace: "",
                eventType: ""
            });
            
        }else{
            //all the parameters was inserted
            console.log("parameters inserting place OK");
            
            //let try to insert them in the DB
            pg.connect(
                //enviromentallocal variabile, or heroku one
                connectionString, 
                function(err, client, done) {
                //query INSERTING a new PLACE
                    console.log(fileName);
                client.query('INSERT INTO place(name, address, history, info, type, photo) values ($1::text, $2::text, $3::text, $4::text, $5::int, $6::text);', [name, address, history, info, type, fileName], function(err, result) {
                    //release the client back to the pool
                    done();

                    //manages err
                    if (err){ 
                        console.error(err); 
                        text = "Database ERROR during INSERT - " + err;
                    }else{
                        //corect Insert
                        text = "Place succesfully inserted in DB";
                        console.log(text);
                    }

                    //response here, otherwise the page will be sent before the execution of the query
                    //redirect to the page giving the message
                    //redirect to the page with a message
                    res.render('insert.ejs', {
                        where: "1",
                        newsMessage: "1",
                        placeMessage: "OK",
                        eventMessage: "1",
                        flag: "1",
                        title: "",
                        desc: "",
                        data: "",
                        hour: "",
                        place: "",
                        placeName: "",
                        placeAddress: "",
                        placeHistory: "",
                        placeType: "",
                        placeInfo: "",
                        eventName: "",
                        eventAddress: "",
                        eventData : "",
                        eventHours: "",
                        eventDescription: "",
                        eventCost: "",
                        eventPlace: "",
                        eventType: ""
                    });
                });
            });
        }    
    }else{
        //no data sent
        res.render('insert.ejs', {
            where: "1",
            newsMessage: "1",
            placeMessage: text,
            eventMessage: "1",
            flag: "1",
            title: "",
            desc: "",
            data: "",
            hour: "",
            place: "",
            placeName: "",
            placeAddress: "",
            placeHistory: "",
            placeType: "",
            placeInfo: "",
            eventName: "",
            eventAddress: "",
            eventData : "",
            eventHours: "",
            eventDescription: "",
            eventCost: "",
            eventPlace: "",
            eventType: ""
        });
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
            text = text + "- missing - NEWS NOT INSERTED - TRY AGAIN";
            console.log(text);
            //redirect to the inserting page giving a message
            res.render('insert.ejs',{
                where: "2",
                newsMessage: text,
                placeMessage: "1",
                eventMessage: "1",
                title: title,
                desc: description,
                data: data,
                hour: hour,
                place: place,
                placeName: "",
                placeAddress: "",
                placeHistory: "",
                placeType: "",
                placeInfo: "",
                eventName: "",
                eventAddress: "",
                eventData : "",
                eventHours: "",
                eventDescription: "",
                eventCost: "",
                eventPlace: "",
                eventType: ""
            });
        }else{
            //messagge for the server
            console.log("Paramaters inserting NEWS OK");
            text = "OK";
            
            //parameters was inserted
            //now connect to DB and insert data
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
                            where: "2",
                            newsMessage: "1",
                            placeMessage: "1",
                            eventMessage: "OK",
                            title: title,
                            desc: description,
                            data: data,
                            hour: hour,
                            place: place,
                            placeName: "",
                            placeAddress: "",
                            placeHistory: "",
                            placeType: "",
                            placeInfo: "",
                            eventName: "",
                            eventAddress: "",
                            eventData : "",
                            eventHours: "",
                            eventDescription: "",
                            eventCost: "",
                            eventPlace: "",
                            eventType: ""
                        });
                    }

                });
            });
        }    
    }else{
        //no data sent
        res.render('insert.ejs',{
            where: "2",
            newsMessage: text,
            placeMessage: "1",
            eventMessage:"1",
            title: title,
            desc: description,
            data: data,
            hour: hour,
            place: place,
            placeName: "",
            placeAddress: "",
            placeHistory: "",
            placeType: "",
            placeInfo: "",
            eventName: "",
            eventAddress: "",
            eventData : "",
            eventHours: "",
            eventDescription: "",
            eventCost: "",
            eventPlace: "",
            eventType: ""
        });
    }
});

app.post('/eventUpload', function(req, res){
    var text = "";
    var name = "";
    var address = "";
    var data = "";
    var hours = "";
    var description = "";
    var cost = "";
    var place = "";
    var type = "";
    
    if (typeof req.body != 'undefined' && req.body){
        //body defined
        //check all parameters - all parameters are needed
        if(req.body.eventName != 'undefined' && req.body.eventName){
            //parameter not null -> set field
            name = req.body.eventName;
        }else{
            //parameter null -> add text mesage
            text = text + "name; ";
        }
        
        if(req.body.eventAddress != 'undefined' && req.body.eventAddress){
            //parameter not null -> set field
            address = req.body.eventAddress;
        }else{
            //parameter null -> add text mesage
            text = text + "address; ";
        }
        
        if(req.body.eventData != 'undefined' && req.body.eventData){
            //parameter not null -> set field
            data = req.body.eventData;
        }else{
            //parameter null -> add text mesage
            text = text + "date; ";
        }
        
        if(req.body.eventHours != 'undefined' && req.body.eventHours){
            //parameter not null -> set field
            hours = req.body.eventHours;
        }else{
            //parameter null -> add text mesage
            text = text + "hours; ";
        }
        
        if(req.body.eventDescription != 'undefined' && req.body.eventDescription){
            //parameter not null -> set field
            description = req.body.eventDescription;
        }else{
            //parameter null -> add text mesage
            text = text + "description; ";
        }
        
         if(req.body.eventCost != 'undefined' && req.body.eventCost){
            //parameter not null -> set field
            cost = req.body.eventCost;
        }else{
            //parameter null -> add text mesage
            text = text + "cost; ";
        }
        
        
        if(req.body.eventPlace != 'undefined' && req.body.eventPlace){
            //parameter not null -> set field
            place = req.body.eventPlace;
        }else{
            //parameter null -> add text mesage
            text = text + "place; ";
        }
        
        if(req.body.eventType != 'undefined' && req.body.eventType){
            //parameter not null -> set field
            type = parseInt(req.body.evenType);
        }else{
            //parameter null -> add text mesage
            text = text + "type; ";
        }
        
        if(text != ""){
            //complete the message
            text = text + "missing - EVENT NOT INSERTED - TRY AGAIN";
            console.log(text);
            
            //redirect to the page with a message
            //ad pass what inserted in the last iteraction
            res.render('insert.ejs', {
                where: "3",
                newsMessage: "1",
                placeMessage: "1",
                eventMessage: text,
                flag: "1",
                title: "",
                desc: "",
                data: "",
                hour: "",
                place: "",
                placeName: "",
                placeAddress: "",
                placeHistory: "",
                placeType: "",
                placeInfo: "",
                eventName: name,
                eventAddress: address,
                eventData : data,
                eventHours: hours,
                eventDescription: description,
                eventCost: cost,
                eventPlace: place,
                eventType: type
            });
        }else{
            //all the fields was inserted
            console.log("Parameters inserting EVENT OK");
            
             pg.connect(
            //enviromentallocal variabile, or heroku one
                connectionString, 
                function(err, client, done) {
                //insert data throught a query
                client.query('INSERT INTO event(name, address, hour_range, description, cost, place_name, type) VALUES($1, $2, $3, $4, $5, $6, $7);', 
                             [name, address, hours, description, cost, place, type], function(err, result) {
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
                            where: "3",
                            newsMessage: "1",
                            placeMessage: "1",
                            eventMessage: "OK",
                            title: "",
                            desc: "",
                            data: "",
                            hour: "",
                            place: "",
                            placeName: "",
                            placeAddress: "",
                            placeHistory: "",
                            placeType: "",
                            placeInfo: "",
                            eventName: "",
                            eventAddress: "",
                            eventData : "",
                            eventHours: "",
                            eventDescription: "",
                            eventCost: "",
                            eventPlace: "",
                            eventType: ""
                        });
                    }

                });
            });
        }
        
        
    }else{
        //body undefined
        //redirect on the page with a message
        res.render('insert.ejs',{
            where: "3",
            newsMessage: "1",
            placeMessage: "1",
            eventMessage: "-1",
            title: title,
            desc: description,
            data: data,
            hour: hour,
            place: place,
            placeName: "",
            placeAddress: "",
            placeHistory: "",
            placeType: "",
            placeInfo: "",
            eventName: "",
            eventAddress: "",
            eventHours: "",
            eventData : "",
            eventDescription: "",
            eventCost: "",
            eventPlace: "",
            eventType: ""
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
  console.log('Discover Trento app is running on port', app.get('port'));
});