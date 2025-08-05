// Get references to game elements by their IDs
const player = document.getElementById("player");
const topPipe = document.getElementById("obstacle_top");
const bottomPipe = document.getElementById("obstacle_bottom");
const capTop = document.getElementById("cap_top");
const capBottom = document.getElementById("cap_bottom");
const scoreBox = document.getElementById("score");

// Game physics and state variables
let gravity = 2;              // Gravity pulls the player down
let velocity = 0;             // Current vertical speed of the player
let isGameRunning = false;    // Tracks if the game is active
let hasJumped = false;        // Tracks if the player has jumped
let score = 0;                // Player's score
let pipeX = 600;              // Initial horizontal position of the pipes

// Start button click handler
document.getElementById("start").onclick = () => {
  resetGame();                // Reset game state
  isGameRunning = true;       // Start the game
  startGame();                // Begin the game loop
};

// Function to make the player jump
function jump() {
  if (isGameRunning) {
    velocity = -12;           // Give upward velocity
    hasJumped = true;         // Mark that the player has jumped
  }
}

// Reset game to initial state
function resetGame() {
  score = 0;                  // Reset score
  scoreBox.value = score;     // Update score display
  velocity = 0;               // Reset velocity
  hasJumped = false;          // Reset jump state
  pipeX = 600;                // Reset pipe position
  player.style.top = "180px"; // Reset player position

  // Create a gap between top and bottom pipes
  let gap = 130;
  let topHeight = Math.floor(Math.random() * 150) + 50; // Random height for top pipe
  let bottomHeight = 400 - topHeight - gap;             // Calculate bottom pipe height

  // Set pipe heights and positions
  topPipe.style.height = topHeight + "px";
  capTop.style.top = topHeight + "px";

  bottomPipe.style.height = bottomHeight + "px";
  capBottom.style.bottom = bottomHeight + "px";

  topPipe.style.left = pipeX + "px";
  bottomPipe.style.left = pipeX + "px";
  capTop.style.left = (pipeX - 4) + "px";
  capBottom.style.left = (pipeX - 4) + "px";
}

// Main game loop
function startGame() {
  const gameLoop = setInterval(() => {
    if (!isGameRunning) {
      clearInterval(gameLoop); // Stop loop if game ends
      return;
    }

    let playerTop = parseInt(player.style.top); // Get current player position

    if (hasJumped) {
      velocity += gravity;       // Apply gravity
      playerTop += velocity;     // Update player position
      player.style.top = playerTop + "px"; // Move player
    }

    pipeX -= 5; // Move pipes to the left
    if (pipeX < -60) {
      pipeX = 600; // Reset pipe position when off-screen
      score++;     // Increase score
      scoreBox.value = score; // Update score display

      // Generate new pipe heights
      let gap = 130;
      let topHeight = Math.floor(Math.random() * 150) + 50;
      let bottomHeight = 400 - topHeight - gap;

      topPipe.style.height = topHeight + "px";
      capTop.style.top = topHeight + "px";

      bottomPipe.style.height = bottomHeight + "px";
      capBottom.style.bottom = bottomHeight + "px";
    }

    // Update pipe positions
    topPipe.style.left = pipeX + "px";
    bottomPipe.style.left = pipeX + "px";
    capTop.style.left = (pipeX - 4) + "px";
    capBottom.style.left = (pipeX - 4) + "px";

    // Collision detection
    const playerRect = player.getBoundingClientRect();
    const topRect = topPipe.getBoundingClientRect();
    const bottomRect = bottomPipe.getBoundingClientRect();
    const containerRect = document.querySelector(".game_container").getBoundingClientRect();

    const hitTopPipe = playerRect.top < topRect.bottom && playerRect.right > topRect.left && playerRect.left < topRect.right;
    const hitBottomPipe = playerRect.bottom > bottomRect.top && playerRect.right > bottomRect.left && playerRect.left < bottomRect.right;
    const hitTopBoundary = playerRect.top <= containerRect.top;
    const hitBottomBoundary = playerRect.bottom >= containerRect.bottom;

    // End game if collision occurs
    if (hitTopPipe || hitBottomPipe || hitTopBoundary || hitBottomBoundary) {
      isGameRunning = false;
      alert("Game Over! Your score: " + score);
    }
  }, 30); // Run loop every 30ms
}
