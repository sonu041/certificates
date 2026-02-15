let allCertificates = [];

$(document).ready(function() {
  // Fetch the JSON data
  $.ajax({
    url: 'https://raw.githubusercontent.com/sonu041/certificates/main/certificates.json',
    dataType: 'json',
    success: function(data) {
      allCertificates = data.data;
      // Show only important certificates by default on initial load
      applyTypeFilterTiles();
    }
  });

  // Search button click handler
  $('#searchBtn').click(function() {
    performSearch();
  });

  // Menu toggle for mobile
  $('#menuToggle').click(function() {
    $('.nav-menu').toggleClass('open');
  });

  // Tag button click: populate search input and run search
  $(document).on('click', '.tag-btn', function() {
    let tag = $(this).data('tag') || $(this).text();
    // active state for tags
    $('.tag-btn').removeClass('active');
    $(this).addClass('active');

    if (typeof tag === 'string' && tag.toUpperCase() === 'ALL') {
      // Clear search input to show all certificates
      $('#searchInput').val('');
    } else {
      $('#searchInput').val(tag);
    }
    // close mobile menu if open
    $('.nav-menu').removeClass('open');
    performSearch();
  });

  // Enter key in search input
  $('#searchInput').keypress(function(e) {
    if (e.which == 13) {
      performSearch();
      return false;
    }
  });

  // Show-all checkbox change handler (controls tiles display only)
  $(document).on('change', '#showAllCheckbox', function() {
    applyTypeFilterTiles();
  });

  // Go-to-top button: show on scroll and smooth scroll to top on click (tiles page)
  const $goTop = $('#goTopBtn');
  if ($goTop.length) {
    $goTop.hide();
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 200) {
        $goTop.fadeIn();
      } else {
        $goTop.fadeOut();
      }
    });

    $goTop.on('click', function() {
      $('html, body').animate({ scrollTop: 0 }, 500);
    });
  }

  // Set 'All' as active on page load
  $('.tag-btn[data-tag="ALL"]').addClass('active');
});

function performSearch() {
  const searchTerm = $('#searchInput').val().toLowerCase().trim();
  
  // update tag active states based on manual search
  if (searchTerm === '') {
    $('.tag-btn').removeClass('active');
    $('.tag-btn[data-tag="ALL"]').addClass('active');
  } else {
    $('.tag-btn').removeClass('active');
  }

  let filteredCertificates;
  
  if (searchTerm === '') {
    // If search term is blank, show all certificates
    filteredCertificates = allCertificates;
  } else {
    // Filter certificates based on search term (search in date, description, and tags)
    filteredCertificates = allCertificates.filter(cert => {
      return cert.date.toLowerCase().includes(searchTerm) || 
             cert.description.toLowerCase().includes(searchTerm) ||
             (cert.tag && cert.tag.toLowerCase().includes(searchTerm));
    });
  }

  // Display results (performSearch does not consider the show-all checkbox)
  displayTilesResults(filteredCertificates, searchTerm);
}

// Apply type filter for tiles view (separate from performSearch)
function applyTypeFilterTiles() {
  const showAll = $('#showAllCheckbox').is(':checked');
  let filtered = allCertificates;
  if (!showAll) {
    filtered = allCertificates.filter(cert => (cert.type && cert.type.toLowerCase() === 'important'));
  }
  displayAllTiles(filtered);
}

function displayAllTiles(certificates) {
  const tilesGrid = $('#tilesGrid');
  tilesGrid.html('');

  certificates.forEach((cert) => {
    const tile = `
      <div class="tile">
        <div class="tile-image">
          <img src="${cert.image_file}" alt="Certificate">
        </div>
        <div class="tile-content">
          <div class="tile-date">${cert.date}</div>
          <div class="tile-description">${cert.description}</div>
        </div>
      </div>
    `;
    tilesGrid.append(tile);
  });

  // Re-initialize scroll animations
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().sync();
  }
}

function displayTilesResults(results, searchTerm) {
  const tilesGrid = $('#tilesGrid');
  tilesGrid.html('');

  if (results.length === 0) {
    tilesGrid.html('<p style="text-align: center; margin: 50px 0; grid-column: 1 / -1;">No certificates found matching "' + searchTerm + '"</p>');
    return;
  }

  results.forEach((cert) => {
    const tile = `
      <div class="tile">
        <div class="tile-image">
          <img src="${cert.image_file}" alt="Certificate">
        </div>
        <div class="tile-content">
          <div class="tile-date">${cert.date}</div>
          <div class="tile-description">${cert.description}</div>
        </div>
      </div>
    `;
    tilesGrid.append(tile);
  });

  // Re-initialize scroll animations
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().sync();
  }
}
