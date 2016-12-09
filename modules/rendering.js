/*
 *  That module helps server to render a view depending on various parameter
 */

//db connection library
var pg = require('pg');
//string that allows connection to DB
var connectionString = process.env.DATABASE_URL || 'postgres://mario:calculator@localhost/discoverdb';
//library that let simultaneous queries on the same connection
var pgp = require('pg-promise')();
var db = pgp(connectionString);

/**
 * @brief binds the response on a page where admin can manage info viewed on the site
 * @return private admin page
 */
var renderEmptyInsert = function(res){
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
};

/*
 * binds the response on the private admin page and shows a page with some messages about modifies POSTED
 */
var renderMessageInsert = function(res, where, newsMessage, placeMessage, eventMessage, flag){
    res.render('insert.ejs', {
        where: where,               //tell what tab make active
        newsMessage: newsMessage,   //news tab msg
        placeMessage: placeMessage, //place tab msg
        eventMessage: eventMessage, //event tab msg
        flag: flag,
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
        eventType: "0"
        });
};

/*
 * after user choose a category, this funct returns a page with all places of that category
 */
var renderPlaceByType = function(type, res){
    var check = "0";
    var message = "";
    
    //check for what page is the error msg
    switch(type){
        case 0: 
            message= "There are no department in ours archieves! Turn back later when we will upload more places!";
            break;
        case 1:
            message= "There are no libraries in ours archieves! Turn back later when we will upload more places!";
            break;
        case 2:
            message= "There are no squares in ours archieves! Turn back later when we will upload more places!";
            break;
        case 3:
            message= "There are no monuments in ours archieves! Turn back later when we will upload more places!";
            break;    
        }
    //open connection
    pg.connect(
        //specify the connection for DB
        connectionString,
        //callback function
        function(err, client, done){
            client.query('SELECT * FROM place WHERE type=$1', [type], function(err, result){
                //release client
                done();

                //manage errors
                if (err){
                    check = "-1";               
                    console.error("DB " + err); //communicate error to server
                }else{
                    //get places found only if there is a result
                    if(typeof result.rows[0] != 'undefined' && result.rows[0]){
                        check = "1";
                    }else{
                        check = "0";
                    }
                }
                //response here 
                if (check == "1"){
                    //there is a result after query
                    res.render('places.ejs',{
                        libraries: result.rows
                        });
                    console.log("sent Data");
                }else if (check =="0"){
                    
                    //there are no rows after query
                    res.render('error.ejs',{
                        message: message
                    });
                }else{
                    //there are no rows after query
                    res.render('error.ejs',{
                        message: "We have some problems with the server! Turn Back later to see if problems will be fixed!"
                    });
                }
            });
        }
    );
}

/**
* gets all the rows of a table and binds them on a page that shows them
*/

var renderByTable = function(table, res){
    var r = "0";
    var message = "";
    var query = 'SELECT';
    
    switch (table){
        case 'news':
            message = "There are no news in ours archieves! Turn back later when we will upload more places!";
            query = 'SELECT * FROM news';
            break;
        case 'event':
            message = "There are no events in ours archieves! Turn back later when we will upload more places!";
            query = 'SELECT * FROM event';
            break;
        }
    
    pg.connect(
    connectionString,
    function(err, client, done){
        client.query(query, function(err, result){
            //release client
            done();
            
            //manage errors
            if (err){
                console.error("DB " + err); 
            }else{
                //get the objects
                if(typeof result.rows[0] != 'undefined' && result.rows[0]){
                    r = "1";
                }else{
                    r = "-1";
                }
            }
            
            //response here to avoid sending req error
            switch (r){
                case "1":
                    //show the page passing data
                    res.render(table + '.ejs',{
                        elements: result.rows
                    });
                    console.log("sent Data");
                    break;
                case "-1":
                    //there are no rows after query
                    res.render('error.ejs',{
                        message: message
                    });
                    break;
                case "0":
                    //there are no rows after query
                    res.render('error.ejs',{
                        message: "We have some problems with the server! Turn Back later to see if problems will be fixed!"
                    });
                    break;
            }
        });
    });
}

/*
 *  get all the place info and redirect on a personalized place for that place
 */
var renderPlaceById = function(req, res){
    var placeId;
    var check = "";
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
                        check = "-1";
                        console.error("DB " + err); 
                    }else{
                        //get the objects
                        if(typeof result.rows[0] != 'undefined' && result.rows[0]){
                            check = "1";                            
                        }else{
                            check = "0";
                        }
                    }
                    
                    //response here to avoid sending req error
                    switch (check){
                        case "1":
                            //show the page passing data
                            res.render('place.ejs',{
                                place: result.rows[0]
                            });
                            console.log("sent Data");
                            break;
                        case "-1":
                            //there are no rows after query
                            res.render('error.ejs',{
                                message: "We apologize but the place that you selected does not exist!"
                            });
                            break;
                        case "0":
                            //there are no rows after query
                            res.render('error.ejs',{
                                message: "We have some problems with the server! Turn Back later to see if problems will be fixed!"
                            });
                            break;
                    }
                });
            });
            
        }else{
            res.render('error.ejs',{
                message: "We apologize but the server recieved no Data! Maybe there is an intern problem. try again Later"
            });
        }
    }else{
        res.render('error.ejs',{
            message: "We apologize but the server recieved no Data! Maybe there is an intern problem. try again Later"
        });
    }
}

/*
 * make 2 simultaneus queries to the DB (gets the info to show on the homepage) and render the homepage
 */
var renderHome  = function(res){
    db.tx(function (t) {
        // this.ctx = transaction config + state context;
        return t.batch([
            t.many("SELECT * FROM place ORDER BY id DESC LIMIT 1"),
            t.many("SELECT * FROM news ORDER BY id DESC LIMIT 3")
        ]);
    })
    .then(function (data) {
        // success;        
        res.render('home.ejs',{
            bestplaces: data[0],
            lastnews: data[1]
        });
    })
    .catch(function (error) {
        console.log("ERROR:", error.message || error);
        res.render('error.ejs',{
            message: "We apologize, maybe we have some problems with the servers, come back later"
        });
    });
    
}

//export functions
exports.renderHome = renderHome;
exports.renderPlaceById = renderPlaceById;
exports.renderEmptyInsert = renderEmptyInsert;
exports.renderMessageInsert = renderMessageInsert;
exports.renderPlaceByType = renderPlaceByType;
exports.renderByTable = renderByTable;