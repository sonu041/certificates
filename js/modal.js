// Modal handling for certificate images
// Uses event delegation so handlers work for dynamically added timeline items

document.addEventListener('click', function(e) {
  const img = e.target;
  if (img && img.tagName === 'IMG' && img.closest('.timeline-content')) {
    const content = img.closest('.timeline-content');
    const p = content.querySelector('p');
    const descriptionHTML = p ? p.innerHTML : '';

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalDescription = document.querySelector('.modal-description');

    modal.style.display = 'flex';
    modalImg.src = img.src;
    // Render HTML so links/buttons in description remain clickable
    modalDescription.innerHTML = descriptionHTML;
  }
});

// Close modal when clicking the close button
const closeBtn = document.querySelector('.close-modal');
if (closeBtn) {
  closeBtn.addEventListener('click', function() {
    document.getElementById('imageModal').style.display = 'none';
  });
}

// Close modal when clicking outside the modal content (but not when clicking links or image)
const imageModal = document.getElementById('imageModal');
if (imageModal) {
  imageModal.addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const m = document.getElementById('imageModal');
    if (m) m.style.display = 'none';
  }
});