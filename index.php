<!DOCTYPE html>
<html >
<head>
  <meta charset="UTF-8">
  <title>Vertical Timeline</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100i,300,400,500,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Allura" rel="stylesheet">
  
  <link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'>

      <link rel="stylesheet" href="css/style.css">

  
</head>

<body>
  <header>
    <div class="container text-center">
      <h1>Certificates</h1>
      <p>Shuvankar Sarkar</p>
    </div>
  </header>

  

  <section class="timeline">
    <div class="container">
    <?php
    // Read the JSON file 
    $json = file_get_contents('certificates.json');
      
    // Decode the JSON file
    $json_data = json_decode($json,true);

    foreach ($json_data as $key => $value) {
      foreach ($value as $key => $val) { 
    ?>
        <div class="timeline-item">
        <div class="timeline-img"></div>
        <div class="timeline-content timeline-card <?php echo $val['orientation']; ?>">
          <img src="<?php echo $val['image_file']; ?>" width="100%">
       		<div class="date"><?php echo $val['date']; ?></div>
          <p><?php echo $val['description']; ?></p>
        </div>
      </div> 
    <?php
        // print_r($val['image_file']);
      }
    }
    ?>

    </div>
  </section>
  <script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
<script src='https://cdn.jsdelivr.net/scrollreveal.js/3.3.1/scrollreveal.min.js'></script>

    <script src="js/index.js"></script>

</body>
</html>
