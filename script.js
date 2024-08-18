
const map = [0, 1, 0,
             1, 1, 0,
             0, 1, 0];


const gridContainerElement = document.querySelector('#grid-container');
const bombElement = "<img src=\"assets/bomb.png\" alt=\"bomb\" class=\"bomb-image\">";
const leafElement = "<img src=\"assets/leaf.webp\" alt=\"leaf\" class=\"leaf-image\">";
const clearViewInterval = 5;
const clearViewTimerElement = document.querySelector("#clearview-timer");
const clearViewLabelElement = document.querySelector(".clearview-label");
const boxClickedId = -1;
const userRevealedLeaves = [];
const numOfLeavesInMap = map.filter(val => val === 0).length;
const gameOverPopUpOverlay = document.querySelector(".gameover-popup-overlay");
const gameWonPopUpOverlay = document.querySelector(".gamewon-popup-overlay");

const getGridBoxElement = (number) => {
    return gridContainerElement.children[number-1];
}

const placeBombsAndLeaves = () => {
    for (let i=0; i<map.length; i++) {
        if (map[i] == 1) {
            const gridBoxToPlaceBomb = getGridBoxElement(i+1);
            gridBoxToPlaceBomb.innerHTML += bombElement;
        }
        else if (map[i] == 0) {
            const gridBoxToPlaceLeaf = getGridBoxElement(i+1);
            gridBoxToPlaceLeaf.innerHTML += leafElement;
        }
    }
}

const clearBoard = () => {
    const gridBoxes = gridContainerElement.children;

    for (let i=0; i<gridBoxes.length; i++) {
        const gridBox = gridBoxes[i];

        // Label boxes with id
        gridBox.id = i;

        gridBox.innerHTML = "";
    }
}

const startClearViewTimer = () => {
    let sec = clearViewInterval - 1;

    const timer = setInterval(function(){
        clearViewTimerElement.innerText = sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);

            clearBoard();
            clearViewLabelElement.innerText = "Click on boxes to reveal them. If it's a bomb, the game ends.";
            startMainGame();
        }
    }, 1000);
}

const startMainGame = () => {
    makeBoxesClickable();
}

const isBomb = (id) => {
    return map[id] == 1;
}

const revealBox = (id) => {
    id = Number(id);
    const gridBox = getGridBoxElement(id+1);

    if (isBomb(id)) {
        gridBox.innerHTML = bombElement;
    }
    else {
        gridBox.innerHTML = leafElement;
    }
}

const checkWin = () => {
    return numOfLeavesInMap === userRevealedLeaves.length;
}

const boxClicked = (e) => {
    const gridBox = e.target;

    if (isBomb(gridBox.id)) {
        revealBox(gridBox.id);
        console.log("Game Over!");
        gameOverPopUpOverlay.style.display = "flex";
    }
    else {
        revealBox(gridBox.id);
        userRevealedLeaves.push(gridBox.id);
    }

    if (checkWin()) {
        console.log("User won!");
        gameWonPopUpOverlay.style.display = "flex";
    }
}

const makeBoxesClickable = () => {
    const gridBoxes = gridContainerElement.children;
    for (let i=0; i<gridBoxes.length; i++) {
        const gridBox = gridBoxes[i];
        gridBox.addEventListener("click", boxClicked);
    }
}


placeBombsAndLeaves();
startClearViewTimer();