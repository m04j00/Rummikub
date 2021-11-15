const tileColor = {
    "1": 1,
    "2": 1,
    "3": 2,
    "4": 2,
    "5": 3,
    "6": 3,
    "7": 4,
    "8": 4
}
const initTile = [];
const inputTile = () => {
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 13; j++) {
            initTile.push({
                "id": `${tileColor[i]}${j}`,
                "number": `${j}`,
                "color": `${tileColor[i]}`
            })
        }
    }
}
const shuffle = (arr) => {
    arr.sort(() => Math.random() - 0.5);
}
inputTile();
shuffle(initTile);
for(let i = 0; i < 104; i++){console.log(initTile[i])}

playerBoard = document.querySelector('.board');
console.log(playerBoard);
playerBoard.innerHTML ='<img src="image/11.svg" class="tile"><br>';
for(let i = 0; i < 104; i++){
    
}