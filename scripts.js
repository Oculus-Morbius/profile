// Constants
const TILE_SIZE = 100;
const colors = ['#abcdef', '#ff6677', '#ffff77', '#ffffff'];
const container = document.getElementById('stars-container');

// Helper function for generating random integers in a range
const randomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function for creating random stars
const randomStar = (row, col) => {
  const x = col * TILE_SIZE + randomInt(TILE_SIZE);
  const y = (row - 2) * TILE_SIZE + randomInt(TILE_SIZE);
  const opacity = randomInt(10) / 10;
  const width = Math.max(1, randomInt(2, 1) * randomInt(2, 1) - randomInt(4));
  const color = randomInt(colors.length - 1);
  return { x, y, opacity, width, color };
};

// Generate random stars and append them to the container
const generateStars = () => {
  const stars = [];
  const nY = Math.floor(window.innerHeight / TILE_SIZE) + 1;  // Number of rows
  const nX = Math.floor(window.innerWidth / TILE_SIZE) + 1;  // Number of columns

  // Generate a star grid with some random values
  for (let row = 0; row < nY; row++) {
    for (let col = 0; col < nX; col++) {
      // Randomly generate stars with varying size and opacity
      if (!randomInt(4)) stars.push(randomStar(row, col));
      if (!randomInt(4)) stars.push(randomStar(row, col));
      if (!randomInt(3)) stars.push(randomStar(row, col));
      if (!randomInt(2)) stars.push(randomStar(row, col));
      if (!randomInt(1)) stars.push(randomStar(row, col));
    }
  }

  // Create and append star elements to the container
  stars.forEach(star => {
    const starElement = document.createElement('div');
    starElement.classList.add('star');
    starElement.style.top = `${star.y}px`;
    starElement.style.left = `${star.x}px`;
    starElement.style.width = `${star.width}px`;
    starElement.style.height = `${star.width}px`;
    starElement.style.backgroundColor = colors[star.color];
    starElement.style.opacity = star.opacity;
    starElement.style.animationDelay = `${1 + star.opacity}s`;  // Add delay based on opacity
    starElement.style.boxShadow = `0 0 ${star.width * 3}px ${colors[star.color]}`;
    container.appendChild(starElement);
  });
};

// Simple Parallax effect on scroll
const handleScroll = () => {
  const scrollOffset = window.scrollY;
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    const speed = parseFloat(star.style.animationDelay) * 100;  // Get speed based on animation delay
    star.style.transform = `translateY(${scrollOffset * speed / 100}px)`;
  });
};

// Initialize stars
generateStars();

// Event listener for scroll (parallax effect)
window.addEventListener('scroll', handleScroll);
