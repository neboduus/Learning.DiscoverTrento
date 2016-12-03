<!DOCTYPE html>
<html>
    
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Discover Trento Places</title>
        <meta name="description" content="Home page of Discover Trento Web-Application">
        <meta name="author" content="MarianDiaconu">
        <!-- Bootstrap Default Favicon -- Have to change it-->
        <link rel="icon" href="../../favicon.ico">
        <!-- Bootstrap Latest compiled and minified CSS -->
        <link href="http://getbootstrap.com/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- Custom styles from bootstrap -->
        <script src="http://getbootstrap.com/assets/js/ie-emulation-modes-warning.js"></script>
    </head>
    
    <body>
        
        <!-- Barra -->
        <nav class="navbar navbar-inverse navbar-ficex-top" style="margin-bottom: 0px;">
            <div class="container">
                
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Discover Trento <small>and surroundings </small></a>
                </div>
                
                <div id="navbar" class="navbar-collapse collapse">
                    
                    <form class="navbar-form navbar-right">    
                        <div class="form-group">
                            <input type="text" placeholder="Place name" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-success">Search</button>
                        
                        <button type="button" class="btn btn-primary" aria-haspopup="true" aria-expanded="false">
                            Places
                        </button>
                        
                        <button type="button" class="btn btn-primary" aria-haspopup="true" aria-expanded="false">
                            Events
                        </button>
                        
                        <button type="button" class="btn btn-primary" aria-haspopup="true" aria-expanded="false">
                            News
                        </button>
                        
                        
                        
                  </form>
                    
                </div>
             
            </div>
        </nav>        
        <!-- Main message for users -->
        <div class="jumbotron">
            <div class="container">
                <div class="col-md-8">
                    <h1>Discover Trento</h1>
                    <p>Through this application, you can find out many places of the city of Trento and its surroundings and not only. Browse the site to find out more.</p>
                </div>
                <div class="col-md-4">
                    <div class="resize" >
                        <img style="max-width:100%; max-height:100%;" src="../img/Trento_dall_alto.jpg">                   
                    </div>
                </div>
            </div>
        </div>
            
        <div class="container">
        <!-- Home Page Content -->        
            <div class="row">
                
                <div class="col-md-6">
                    <h2>News</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                    <p><a class="btn btn-default" href="#" role="button">More News!! »</a></p>
                </div>
                <div class="col-md-6">
                    <h2>Weather</h2>
                    <iframe style="max-width:100%; max-height:100%;" src="https://www.meteoblue.com/en/weather/widget/three?geoloc=detect&days=4&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&layout=image"  frameborder="0" scrolling="NO" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups" style="width: 460px;height: 593px"></iframe>
                </div>
                
            </div>
            
            <div class="row">
                <div class="col-md-12">
                    <h2>Some Places to visit</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                    <p><a class="btn btn-default" href="#" role="button">More Places! »</a></p>
                </div>                
            </div>
                       
        </div>

        <br>
        <br>
        <br>
        <footer>
            <p style="text-align: right;">© 2016 Discover Trento, A project made by <a href="/log/">Marian Alexandru Diaconu.</a></p>
        </footer>
        
    
        <!-- Bootstrap javascript -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="http://getbootstrap.com/dist/js/bootstrap.min.js"></script>
    </body>
</html>
