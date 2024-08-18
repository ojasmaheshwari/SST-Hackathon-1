
const map = [0, 1, 0,
             1, 1, 0,
             0, 1, 0];


const gridContainerElement = document.querySelector('#grid-container');
const bombElement = "<img src=\"assets/bomb.png\" alt=\"bomb\" class=\"bomb-image\">";
const leafElement = "<img src=\"assets/leaf.webp\" alt=\"leaf\" class=\"leaf-image\">";
const clearViewInterval = 5;
const clearViewTimerElement = document.querySelector("#clearview-timer");
const clearViewLabelElement = document.querySelector(".clearview-label");

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

}


placeBombsAndLeaves();
startClearViewTimer();