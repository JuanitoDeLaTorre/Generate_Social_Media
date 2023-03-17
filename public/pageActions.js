const likeButton = document.getElementById("likeButton");

// Add a click event listener to the like button image
likeButton.addEventListener('click', function() {
  // Get the current src attribute value of the like button image
  const currentSrc = likeButton.getAttribute('src');
  
  // Check if the current image is the empty heart icon
  if (currentSrc === '/images/instagramLikeButton.png') {
    // If the current image is the empty heart icon, change it to the filled heart icon
    likeButton.setAttribute('src', '/images/instagramLikeButtonFilled.png');
  } else {
    // If the current image is the filled heart icon, change it to the empty heart icon
    likeButton.setAttribute('src', '/images/instagramLikeButton.png');
  }
});
