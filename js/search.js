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
