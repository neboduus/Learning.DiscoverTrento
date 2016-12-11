//utility lib
var util = require('util');
//express lib
var express = require('express');
//connect DB
var pg = require('pg');
//general lib
var app = express();
//manage session
var session = require('express-session')
//my modules
var rendering = require('./modules/rendering.js');
//required to parse request bodies - POST and JSON
var bodyParser = require('body-parser');
//for managing uploads
var multer  = require('multer');

//setting a disk storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //set folder
        cb(null, 'img/photo')
    },
    filename: function (req, file, cb) {
        //set how to rename
        cb(null, Date.now() + '.jpg') //Appending .jpg
    }
});
var upload = multer({ storage: storage });
//string that allows connection to DB
var connectionString = process.env.DATABASE_URL || 'postgres://mario:calculator@localhost/discoverdb';

//defining some static content
app.use("/img", express.static(__dirname + '/img'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/modules", express.static(__dirname + '/modules'));
//use sessions
app.use(session({ 
	//required, used to prevent tampering
	secret: 'discoverTN', 
	//set time of validity of cookies
	cookie: { maxAge: 600000 },
    resave: true,
    saveUninitialized: true
}));

// set the view engine to ejs
app.set('view engine', 'ejs');
//seting server port 
app.set('port', (process.env.PORT || 5000));
//parsers for body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * @brief binds to home page
 * @return the first page of the app
 */
app.get('/', function(req, res) {  
    rendering.renderHome(res);
});

/**
 * @brief binds to a place categories
 * @return a page with 2 categories of places -> City places and University Places
 */
app.get('/categories', function(req, res){
    res.status(200).render('categories.ejs',{
        req: req
    });
});

/**
 * @brief binds to university places
 * @return a page with 2 categories of university places -> Libraries and Departments
 */
app.get('/university', function(req, res){
    res.render('university.ejs',{
        req: req
    });
});

/**
 * @brief binds to city places page
 * @return a page with 2 categories of city places -> Monuments and squares
 */
app.get('/city', function(req, res){
    res.render('city.ejs');
});

/*
 * @brief intercepts all GET requests to see departments of unitn
 *        connects to DB, collects all data for all the departments
 * @return a page with a list of all departments of unitn
 */
app.get('/departments', function(req, res){
    rendering.renderPlaceByType(0, res);
});

/*
 * @brief intercepts all GET requests to see libraries of unitn
 *        connects to DB, collects all data for all the libraries
 * @return a page with a list of all libraries of unitn
 */
app.get('/libraries', function(req, res){
    rendering.renderPlaceByType(1, res);
});

/*
 * @brief intercepts all GET requests to see squares of Trento city
 *        connects to DB, collects all data for all the squares
 * @return a page with a list of all squares of unitn
 */
app.get('/squares', function(req, res){
    rendering.renderPlaceByType(2, res);
});

/*
 * @brief intercepts all GET requests to see monuments of Trento city
 *        connects to DB, collects all data for all the monuments
 * @return a page with a list of all monuments of unitn
 */
app.get('/monuments', function(req, res){
   rendering.renderPlaceByType(3, res);
});

/*
 * @brief intercepts all GET requests to see events of Trento city
 *        connects to DB, collects all data for all the events
 * @return a page with a list of all events of unitn
 */
app.get('/events', function(req, res){
    rendering.renderByTable('event', res);
});

/*
 * @brief intercepts all GET requests to see events of Trento city
 *        connects to DB, collects all data for all the events
 * @return a page with a list of all events of unitn
 */
app.get('/news', function(req, res){
    rendering.renderByTable('news', res);
});

/*
 *GET information for a specific place
 */
app.post('/place',function(req, res){
    rendering.renderPlaceById(req, res);
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
        rendering.renderEmptyInsert(res);
    }else{
        //if no session redirect to login
        res.render('login.ejs', {flag: "1"});
    }
});

/**
 * intercepts request POST searching a neame 
 * checks if there was some parameter inserted, if show an error
 * else redirect on a page which shows a list with places 
 * which name pattern machings the string inserted
 */
app.post("/search", function(req, res){
    var placeName;
    var r;
    //check body of req
    if(typeof req.body!='undefined' && req.body){
        //check parameter needed
        if(typeof req.body.placesearch != 'undefined' && req.body.placesearch){
            //parameter present
            placeName = req.body.placesearch; 
            
            //select * from place where lower(name) similar to lower('%biblio%%sci%');
            //query DB for info
            pg.connect(
            connectionString,
            function(err, client, done){
                client.query('SELECT * FROM place WHERE lower(name) SIMILAR TO lower($1) ', ['%'+placeName.replace(" ","%%")+'%'], function(err, result){
                    //release client
                    done();

                    //manage errors
                    if (err){
                        console.error(err); 
                        r = "-1";
                    }else{                        
                        //get the objects
                        if(typeof result.rows[0] != 'undefined' && result.rows[0]){
                            r = "1";
                            console.log("Found: \n" + result.rows);
                        }else{
                            r="0";
                            console.log("nothing");
                        }
                    }
                    
                    switch(r){
                        case "0":
                            //there are no rows after query
                            res.render('error.ejs',{
                                message: "We apologize but we don't find any data that match you search. But maybe the place which you're searching exists but you typed another name. Try navigate the site to find your place!"
                            });
                            break;
                        case "1":
                            //there is a result after query
                            res.render('places.ejs',{
                                libraries: result.rows
                                });
                            console.log("sent Data");
                            break;
                        case "-1":
                            //there are no rows after query
                            res.render('error.ejs',{
                                message: "We have some problems with the server! Come back later to see if problems will be fixed!"
                            });
                            break;
                    }
                });
            });
            
        }else{
            //there are no rows after query
            res.render('error.ejs',{
                message: "You didn't insert no word in the field. Check it and try again!"
            });
        }
    }else{
        //there are no rows after query
        res.render('error.ejs',{
            message: "You didn't insert no word in the field. Check it and try again!"
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
                    rendering.renderEmptyInsert(res);
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
                    var resp = "0";
                    
                    //manages err
                    if (err){ 
                        console.error(err); 
                        text = "Database ERROR during INSERT - " + err;
                        r="-1";
                    }else{
                        //corect Insert
                        text = "Place succesfully inserted in DB";
                        console.log(text);
                        r="1";
                    }

                    //response here, otherwise the page will be sent before the execution of the query
                    //redirect to the page giving the message
                    
                    if (r=="1"){
                        rendering.renderMessageInsert(res, "1", "1", "OK", "1", "1");
                    }else{
                        rendering.renderMessageInsert(res, "1", "1", text, "1", "1");
                    }
                    
                    
                });
            });
        }    
    }else{
        //no data sent
        rendering.renderMessageInsert(res, "1", "1", text, "1", "1");
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
                    var r = "0";
                    //manages err
                    if (err){ 
                        console.error(err); 
                        response = "Database ERROR during INSERT - " + err;
                    }else{
                        //inserted in db OK
                        console.log('News inserted ');
                        r = "1";
                    }
                    
                    if (r == "1"){
                        rendering.renderMessageInsert(res, "2", "OK", "1", "1", "1");
                    }else{
                        //redirect to the inserting page giving a message
                        res.render('insert.ejs',{
                            where: "2",
                            newsMessage: "NEWS not inserted due to DB errors. Try again later!",
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
                    }

                });
            });
        }    
    }else{
        //no data sent
        rendering.renderMessageInsert(res, "2", text, "1", "1", "1");
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
        
        if(req.body.eventDesc != 'undefined' && req.body.eventDesc){
            //parameter not null -> set field
            description = req.body.eventDesc;
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
                client.query('INSERT INTO event(name, address, data, hour_range, description, cost, place_name, type) VALUES($1, $2, $3, $4, $5, $6, $7,1);', 
                             [name, address, data, hours, description, cost, place], function(err, result) {
                    //release the client back to the pool
                    done();
                    var r="0";

                    //manages err
                    if (err){ 
                        console.error("DB " + err);
                    }else{
                        //inserted in db OK
                        console.log('row inserted ');
                        r = "1";
                    }
                    
                    if (r=="1"){
                        //redirect to admin page
                        rendering.renderMessageInsert(res, "3", "1", "1", "OK", "1");
                    }else{
                        rendering.renderMessageInsert(res, "3", "1", "1", "Event not inserted! try again!", "1");
                    }

                });
            });
        }
        
        
    }else{
        //body undefined
        //redirect on the page with a message
        renderMessageInsert(res, "3", "1", "1", "-1", "1");
    }
});

/*
 * logs out an admin and destrois the session
 * after logged out redirect to the home page
 */
 app.get('/logout',function(req,res){
    req.session.destroy(function(err) {
      if(err) {
        console.log("SessionERR " + err);
        res.render('error.ejs',{
            message: "We have some problems with the server! Turn Back later to see if problems will be fixed!"
        });
      }else{
        res.render('home.ejs',{
            session: "0"
        });
      }
    });
 });
    

//start server
app.listen(app.get('port'), function() {
  console.log('Discover Trento app is running on port', app.get('port'));
});