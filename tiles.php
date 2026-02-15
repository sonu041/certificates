<!DOCTYPE html>
<html >
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Certificate Tiles</title>
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
        <button id="menuToggle" class="menu-toggle" aria-label="Toggle menu">☰</button>
        <nav class="nav-menu">
          <div class="search-section">
            <div class="input-group">
              <input type="text" id="searchInput" class="form-control" placeholder="Search certificates by date or description...">
              <span class="input-group-btn">
                <button id="searchBtn" class="btn btn-primary">Search</button>
              </span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>

  <!-- Tag bar below header -->
  <div class="tag-bar">
    <div class="container">
      <div class="tag-list">
        <button class="tag-btn btn btn-default" data-tag="ALL">All</button>
        <button class="tag-btn btn btn-default" data-tag="GCP">GCP</button>
        <button class="tag-btn btn btn-default" data-tag="Run">Run</button>
        <button class="tag-btn btn btn-default" data-tag="TCS">TCS</button>
        <button class="tag-btn btn btn-default" data-tag="Infosys">Infosys</button>
        <button class="tag-btn btn btn-default" data-tag="Atos">Atos</button>
      </div>
    </div>
  </div>

  <!-- View toggle buttons -->
  <div class="view-toggle">
    <div class="container">
      <a href="index.php" class="btn btn-default">Timeline View</a>
      <a href="tiles.php" class="btn btn-default active">Tile View</a>
      <label style="margin-left:12px; display:inline-flex; align-items:center;">
        <input type="checkbox" id="showAllCheckbox" style="margin-right:6px;" />
        <span style="margin:0;">Show all certificates</span>
      </label>
    </div>
  </div>

  <section class="tiles-section">
    <div class="container">
      <div class="tiles-grid" id="tilesGrid">
        <!-- Tiles will be populated by JavaScript -->
      </div>
    </div>
  </section>
  <button id="goTopBtn" class="go-top" title="Go to top" aria-label="Go to top">↑</button>

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
  <script src="js/tiles.js"></script>
</body>
</html>
