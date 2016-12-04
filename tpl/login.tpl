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
        <!-- Bootstrap Latest compiled and minified CSS -->
        <link href="http://getbootstrap.com/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="../css/home.css">
        
        <title> Login </title>
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
            <div class="alert alert-info" role="alert"><b>Admin login only!</b> <small>normal users are not allowed</small></div>
            
                    <form id="logForm" method="POST" action="http://localhost:5000/login">
                        <br>
                        <div class="input-group">
                            <span class="input-group-addon" id="basic-addon1"></span>
                            <input class="form-control" placeholder="Username" aria-describedby="basic-addon1" id="username" type="text" name="username">
                        </div>
                        <br>
                        <br>
                        <div class="input-group">
                            <span class="input-group-addon" id="basic-addon1"></span>
                            <input class="form-control" placeholder="Password" aria-describedby="basic-addon1" id="password" type="password" name="password">
                        </div>
                        <br>
                        <br>
                        <div class="wrapper">
                            <button class=" btn btn-lg btn-default" id="button" type="tryLogin()">Login</button>
                        </div>
                    </form>
                    <br>
                <br>
                (:if[FLAG] ~[:then ~ 
                    <div class="alert alert-danger" role="alert">Username or Password are wrong!</div>:]
                            [:else ~ 
                    <div class="alert alert-success" role="alert">Insert your credentials and try to Login!</div> :]
                :)
        </div>
        
        

        <br><br><br><br>
        <footer class="footer footer_color">
          <div class="container">
            <p class="alignment_right">© 2016 Discover Trento, A project made by 
                <span>Marian Alexandru Diaconu.</span>
                <a href="http://localhost:5000/login" type="button" class="btn btn-default navbar-btn">Sign in</a>
            </p>
          </div>
        </footer>
        
        <!-- Scripts -->
        <script src="http://getbootstrap.com/assets/js/ie-emulation-modes-warning.js"></script>
        <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="     crossorigin="anonymous"></script>
        <script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
        <script src="../scripts/tryLogin.js"></script> 
    </body>

</html>