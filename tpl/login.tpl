<!DOCTYPE html>
<html>
    <head>
          <!-- Here goes the metadata -->  
          <meta charset="utf-8">
          <title> Insertion Place Page </title>
          <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="     crossorigin="anonymous"></script>
          <script src="../scripts/tryLogin.js"></script>
            
    </head>

    <body>  
        <h1>Login Admin</h1>
        
        <br>
        <form id="logForm" method="POST" action="http://localhost:5000/login">
            username:<br>
            <input id="username" type="text" name="username"><br>
            password:<br>
            <input id="password" type="text" name="password"><br>
            <br>
            <button id="button" type="tryLogin()">Login</button>
            <p id="responseText">(:message ~ Insert your credentials and try to Log In if you are an admin:)</p>
        </form>

        
    </body>

</html>