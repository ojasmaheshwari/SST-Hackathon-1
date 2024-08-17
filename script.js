
const map = [0, 1, 0,
             1, 1, 0,
             0, 1, 0];



const gridContainerElement = document.querySelector('#grid-container');
const bombElement = "<img src=\"assets/bomb.png\" alt=\"bomb\" class=\"bomb-image\">";
const leafElement = "<img src=\"assets/leaf.webp\" alt=\"leaf\" class=\"leaf-image\">";

const getGridBoxElement = (number) => {
    return gridContainerElement.children[number-1];
}

const placeBombs = () => {
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

placeBombs();