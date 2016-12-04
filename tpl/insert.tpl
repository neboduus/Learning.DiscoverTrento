<!DOCTYPE html>
<html>
    <head>        
        <!-- metadata -->  
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Discover Trento Places</title>
        <meta name="description" content="Home page of Discover Trento Web-Application">
        <meta name="author" content="MarianDiaconu">
        <!-- Favicon -->
        <link rel="icon" href="img/favicon.ico">
        
        <!-- Scripts -->
        <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="     crossorigin="anonymous"></script>
        <script src="http://getbootstrap.com/assets/js/ie-emulation-modes-warning.js"></script>
        <script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
        
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
                

        <!-- Personal Scripts -->
        <script src="../scripts/tryLogin.js"></script>   
        <script src="../scripts/update.js"></script>
        
        <!-- Personal styles -->
        <link rel="stylesheet" href="../css/home.css">
        <title> Insertion Page </title>
    </head>

    <body>  
        <nav class="navbar navbar-inverse navbar-ficex-top">
            <div class="container">
                
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="http://localhost:5000/">Discover Trento <small>and surroundings </small></a>
                </div>
                
                <!-- INSERIRE BOTTONI QUANDO PRONTI -->
                
            </div>
        </nav>  
        <div class="container">
            <div class="alert alert-info" role="alert">Here you can insert new <b>content</b> for the site!</div>

            <div class="col-md-3">
                
                <div class="thumbnail">
                    <h3><span class="label label-default">Insert a Place</span></h3>
                    <br>
                    <form id="place_form" method="POST" enctype="multipart/form-data" action="http://localhost:5000/placeUpload">
                        Name:<br>
                        <input type="text" name="place_name"><br>
                        Address:<br>
                        <div id="locationField">
                          <input id="place_address" name="place_address" onFocus="geolocate()" type="text"/>
                        </div>
                        History:<br>
                        <textarea rows="6" cols="25" type="text" name="place_history"></textarea><br>
                        Other Info:<br>
                        <textarea rows="6" cols="25" type="text" name="place_info"></textarea><br>
                        Type: <br>
                        <input type="number" name="place_type" min="0" max="1">
                        <br>0 for University Place and<br>
                        1 for City Place<br>
                        2 for Other<br>
                        <br>
                        Choose a photo:
                        <input type="file" name="place_photo"><br>
                        <button id="place_btn" class="btn btn-success" type="button" >Insert Place</button>
                    </form>
                
                </div>
                
            </div>
            
            <div class="col-md-1"></div>
            
            <div class="col-md-3">
                <div class="thumbnail">
                    <h3><span class="label label-default">Insert News</span></h3>
                    <br>
                    <form method="POST" enctype="multipart/form-data" action="/newsUpload">
                        Title:<br>
                        <input type="text" name="news_title"><br>
                        Description:<br>
                        <textarea rows="6" cols="25" type="text" name="news_desc"></textarea><br>
                        Data: <br>
                        <input type="text" name="news_data"><br>
                        Hour: <br>
                        <input type="text" name="news_hour"><br>
                        Place: <br>
                        <input type="text" name="news_place"><br>
                        <br><br>
                        <button class="btn btn-success" type="button" >Insert News</button>
                    </form>
                </div>
            </div>
            
            <div class="col-md-1"></div>
            
            <div class="col-md-3">
                <div class="thumbnail">
                    <h3><span class="label label-default">Insert an Event</span></h3>
                    <br>
                    <form method="POST" enctype="multipart/form-data" action="/eventUpload">
                        Name:<br>
                        <input type="text" name="event_name"><br>
                        Address:<br>
                        <input type="text" name="event_address"><br>
                        Data: <br>
                        <input type="text" name="event_data"><br>
                        Hours Range: <br>
                        <input type="text" name="event_hours"><br>
                        Description:<br>
                        <textarea rows="6" cols="25" type="text" name="event_desc"></textarea><br>
                        Cost: <br>
                        <input type="text" name="event_cost"><br>
                        Place: <br>
                        <input type="text" name="event_place"><br>
                        Type: <br>
                        <input type="number" name="event_type" min="0" max="4">
                        <br>0 for University Event<br>
                        1 for Politics <br>
                        2 for Culture <br>
                        3 for Local News <br>
                        4 for Music <br>
                        <button class="btn btn-success" type="button">Insert Event</button>
                    </form>
                </div>
            </div>
            
            <div class="col-md-1"></div>
            
        </div>
        
        <br><br>
        <footer class="footer footer_color">
          <div class="container">
            <p class="alignment_right">© 2016 Discover Trento, A project made by <a href="http://localhost:5000/login">Marian Alexandru Diaconu.</a></p>
          </div>
        </footer>

    </body>

</html>