<!DOCTYPE html>
<html >
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Certificate Timeline</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100i,300,400,500,700" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Allura" rel="stylesheet">
  <link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/modal.css">
  <link rel="icon" href="https://raw.githubusercontent.com/sonu041/certificates/main/assets/ss.png" type="image/icon type">
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-NZNFZYCFN1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-NZNFZYCFN1');
  </script>
</head>

<body>
  <header>
    <div class="container">
      <div class="header-content">
        <a href="/" class="home-btn">Home</a>
        <h1 class="text-center">Certificates</h1>
        <div class="search-section">
          <div class="input-group">
            <input type="text" id="searchInput" class="form-control" placeholder="Search certificates by date or description...">
            <span class="input-group-btn">
              <button id="searchBtn" class="btn btn-primary">Search</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
  <?php
  // Read the JSON file
  $json = file_get_contents('https://raw.githubusercontent.com/sonu041/certificates/main/certificates.json');
      
  // Decode the JSON file
  $json_data = json_decode($json,true);

  if(isset($_GET['view']) && $_GET['view'] == 'list') {
  ?>
  <section>
  <?php
    foreach ($json_data as $key => $value) {
      foreach ($value as $key => $val) {
    ?>
    <p><?php echo $val['date'].' - '.$val['description']; ?></p>
    <?php
      }
    }
    ?>
  </section>
  
  <?php
  } else {
  ?>
  <section class="timeline">
    <div class="container">
    <?php
    foreach ($json_data as $key => $value) {
      foreach ($value as $key => $val) {
    ?>
        <div class="timeline-item">
          <div class="timeline-img"></div>
          <div class="timeline-content timeline-card <?php echo $key%2==0?'js--fadeInLeft':'js--fadeInRight'; ?>">
            <img src="<?php echo $val['image_file']; ?>" width="100%">
            <div class="date"><?php echo $val['date']; ?></div>
            <p><?php echo $val['description']; ?></p>
          </div>
        </div> 
    <?php
      }
    }
  }
    ?>
    </div>
  </section>   
  <div class="modal-overlay" id="imageModal">
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <div class="modal-description"></div>
      <img id="modalImage" src="" alt="Certificate">
    </div>
  </div>
  <script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
  <script src='https://cdn.jsdelivr.net/scrollreveal.js/3.3.1/scrollreveal.min.js'></script>
  <script src="js/index.js"></script>
  <script src="js/modal.js"></script>
  <script src="js/search.js"></script>
</body>
</html>
