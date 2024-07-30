<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>
 <?php 

    require_once "connection.php";

    $conn = get_connection();
    echo '<p>Hello World</p>';
    for ($i = 0; $i < 10 ; $i++)
    {
        echo "Olá mundo 3!";
        echo "<br/>";
    }
 ?> 
 </body>
</html>