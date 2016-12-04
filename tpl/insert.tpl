<!DOCTYPE html>
<html>
    <head>
          <!-- Here goes the metadata -->  
          <meta charset="utf-8">
          <title> Insertion Place Page </title>
    </head>

    <body>  
        <h1>Insert Place Page</h1>
        
        <br>
        <form method="post" enctype="multipart/form-data" action="/file-upload">
            Name:<br>
            <input type="text" name="name"><br>
            Address:<br>
            <input type="text" name="address"><br>
            History:<br>
            <input type="text" name="history"><br>
            Other Info:<br>
            <input type="text" name="info"><br>
            Type [ 0(University Place) or 1(City Place) ]:<br>
            <input type="number" name="type" min="0" max="1"><br>
            
            Choose a photo:
            <input type="file" name="photo"><br>
            <input type="submit" value="Insert Place">
        </form>
        
    </body>

</html>