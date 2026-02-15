let allCertificates = [];

// Load certificates on page load
$(document).ready(function() {
  // Fetch the JSON data
  $.ajax({
    url: 'https://raw.githubusercontent.com/sonu041/certificates/main/certificates.json',
    dataType: 'json',
    success: function(data) {
      allCertificates = data.data;
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

  // Show-all checkbox change handler
  $(document).on('change', '#showAllCheckbox', function() {
    applyTypeFilterTimeline();
  });

  // Go-to-top button: show on scroll and smooth scroll to top on click
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

  // Display results
  displaySearchResults(filteredCertificates, searchTerm);
}

// Apply type filter for timeline view (separate from performSearch)
function applyTypeFilterTimeline() {
  const showAll = $('#showAllCheckbox').is(':checked');
  let filtered = allCertificates;
  if (!showAll) {
    filtered = allCertificates.filter(cert => (cert.type && cert.type.toLowerCase() === 'important'));
  }
  // Render timeline with the filtered set
  displaySearchResults(filtered, '');
}

function displaySearchResults(results, searchTerm) {
  const timelineContainer = $('.timeline .container');
  
  // Clear existing items
  timelineContainer.html('');

  if (results.length === 0) {
    timelineContainer.html('<p style="text-align: center; margin: 50px 0;">No certificates found matching "' + searchTerm + '"</p>');
    return;
  }

  // Display search results
  results.forEach((cert, index) => {
    const timelineItem = `
      <div class="timeline-item">
        <div class="timeline-img"></div>
        <div class="timeline-content timeline-card ${index % 2 === 0 ? 'js--fadeInLeft' : 'js--fadeInRight'}">
          <img src="${cert.image_file}" width="100%">
          <div class="date">${cert.date}</div>
          <p>${cert.description}</p>
        </div>
      </div>
    `;
    timelineContainer.append(timelineItem);
  });

  // Re-initialize scroll animations for new elements
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().sync();
  }
}
