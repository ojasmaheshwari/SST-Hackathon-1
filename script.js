const map = new Array(16).fill(0);

const gridContainerElement = document.querySelector("#grid-container");
const bombElement = '<img src="assets/bomb.png" alt="bomb" class="bomb-image">';
const leafElement =
  '<img src="assets/leaf.webp" alt="leaf" class="leaf-image">';
const clearViewLabelInitialValue =
  'Clearing board in <span id="clearview-timer">5</span> seconds';
const clearViewInterval = 5;
let clearViewTimerElement = document.querySelector("#clearview-timer");
const clearViewLabelElement = document.querySelector(".clearview-label");
const boxClickedId = -1;
let userRevealedLeaves = [];
const gameOverPopUpOverlay = document.querySelector(".gameover-popup-overlay");
const gameWonPopUpOverlay = document.querySelector(".gamewon-popup-overlay");
const playAgainLinks = document.querySelectorAll(".playagain-link");
let bombs = [];
const mapSize = map.length;
const scoreLabel = document.querySelector("#gamescore");
const playTimerLabel = document.querySelector("#play-timer");
let playTimerInterval;
const explosionSound = new Audio("assets/explosion.mp3");
let elapsedTime;
const gameWonRecordLabel = document.querySelector("#gamewon-record-time");

const generateBombs = () => {
  if (bombs.length === 5) {
    return;
  }
  const bombPosition = Math.floor(Math.random() * (mapSize - 1));
  if (bombs.includes(bombPosition)) {
    generateBombs();
  } else {
    bombs.push(bombPosition);
  }

  if (bombs.length < 5) {
    generateBombs();
  }
};

const insertBombsInMap = () => {
  bombs.forEach((bombPosition) => {
    map[bombPosition] = 1;
  });
};

const getGridBoxElement = (number) => {
  return gridContainerElement.children[number - 1];
};

const placeBombsAndLeaves = () => {
  for (let i = 0; i < map.length; i++) {
    if (map[i] == 1) {
      const gridBoxToPlaceBomb = getGridBoxElement(i + 1);
      gridBoxToPlaceBomb.innerHTML += bombElement;
    } else if (map[i] == 0) {
      const gridBoxToPlaceLeaf = getGridBoxElement(i + 1);
      gridBoxToPlaceLeaf.innerHTML += leafElement;
    }
  }
};

const clearBoard = () => {
  const gridBoxes = gridContainerElement.children;

  for (let i = 0; i < gridBoxes.length; i++) {
    const gridBox = gridBoxes[i];

    // Label boxes with id
    gridBox.id = i;

    gridBox.innerHTML = "";
  }
};

const startPlayTimer = () => {
    let startTime = Date.now();

    playTimerInterval = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        playTimerLabel.innerText = (elapsedTime / 1000).toFixed(3);
    }, 100);
}

const startClearViewTimer = () => {
  let sec = clearViewInterval - 1;

  const timer = setInterval(function () {
    clearViewTimerElement.innerText = sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);

      clearBoard();
      clearViewLabelElement.innerText =
        "Click on boxes to reveal them. If it's a bomb, the game ends.";
      startMainGame();
      startPlayTimer();
    }
  }, 1000);
};

const startMainGame = () => {
  makeBoxesClickable();
};

const isBomb = (id) => {
  return map[id] == 1;
};

const revealBox = (id) => {
  id = Number(id);
  const gridBox = getGridBoxElement(id + 1);

  if (isBomb(id)) {
    gridBox.innerHTML = bombElement;
  } else {
    gridBox.innerHTML = leafElement;
  }
};

const checkWin = () => {
  const numOfLeavesInMap = map.filter((val) => val === 0).length;
  return numOfLeavesInMap === userRevealedLeaves.length;
};

const boxClicked = (e) => {
  const gridBox = e.target;

  if (isBomb(gridBox.id)) {
    revealBox(gridBox.id);
    console.log("Game Over!");
    explosionSound.play();
    gameOverPopUpOverlay.style.display = "flex";
    clearInterval(playTimerInterval);
  } else {
    revealBox(gridBox.id);
    userRevealedLeaves.push(gridBox.id);
  }

  if (checkWin()) {
    console.log("User won!");
    gameWonPopUpOverlay.style.display = "flex";
    gameWonRecordLabel.innerText = (elapsedTime / 1000).toFixed(3);
    clearInterval(playTimerInterval);
  }

  scoreLabel.innerText = userRevealedLeaves.length;
};

const makeBoxesClickable = () => {
  const gridBoxes = gridContainerElement.children;
  for (let i = 0; i < gridBoxes.length; i++) {
    const gridBox = gridBoxes[i];
    gridBox.addEventListener("click", boxClicked);
  }
};

const removeBoxClickListeners = () => {
  const gridBoxes = gridContainerElement.children;
  for (let i = 0; i < gridBoxes.length; i++) {
    const gridBox = gridBoxes[i];
    gridBox.removeEventListener("click", boxClicked);
  }
};


const playAgain = () => {
  userRevealedLeaves = [];
  bombs = [];
  map.fill(0);
  scoreLabel.innerText = 0;
  clearInterval(playTimerInterval);
  playTimerLabel.innerText = 0;
  if (gameOverPopUpOverlay.style.display === "flex") {
    gameOverPopUpOverlay.style.display = "none";
  } else if (gameWonPopUpOverlay.style.display === "flex") {
    gameWonPopUpOverlay.style.display = "none";
  }

  removeBoxClickListeners();

  clearBoard();
  generateBombs();
  insertBombsInMap();
  clearViewLabelElement.innerHTML = clearViewLabelInitialValue;
  clearViewTimerElement = document.querySelector("#clearview-timer");
  placeBombsAndLeaves();
  startClearViewTimer();
};

generateBombs();
insertBombsInMap();
placeBombsAndLeaves();
startClearViewTimer();

playAgainLinks.forEach((link) => {
  link.addEventListener("click", playAgain);
});
