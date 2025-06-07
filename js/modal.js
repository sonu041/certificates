// Add click event to all certificate images
document.querySelectorAll('.timeline-content').forEach(content => {
  const img = content.querySelector('img');
  const description = content.querySelector('p').textContent;
  
  img.addEventListener('click', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalDescription = document.querySelector('.modal-description');
    
    modal.style.display = 'flex';
    modalImg.src = this.src;
    modalDescription.textContent = description;
  });
});

// Close modal when clicking the close button or outside the image
document.querySelector('.close-modal').addEventListener('click', function() {
  document.getElementById('imageModal').style.display = 'none';
});

document.getElementById('imageModal').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('imageModal').style.display = 'none';
  }
}); 