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
// for(let i = 0; i < 104; i++){console.log(initTile[i])}

// playerBoard = document.querySelector('.board');
// console.log(playerBoard);
// playerBoard.innerHTML ='<img src="image/11.svg" class="tile"><br>';

// 타일 띄우기
// for(let i = 0, k = 1; i < 104; i++, k++){
//     let path = initTile[i].id;
//     console.log(path);
//     playerBoard.innerHTML +='<img src="image/' + path + '.svg" class="tile">';
//     if(k % 13 == 0) playerBoard.innerHTML += '<br>';
// }

const playerTile = [];
const AITile = [];
const remainTile = [];
for(let i = 0, p = 0, a = 0, r = 0; i < 104;){
    if(i < 28){
        playerTile[p++] = initTile[i++];
        AITile[a++] = initTile[i++];
    }
    else {
        remainTile[r++] = initTile[i++];
    }
}
console.log(playerTile.length, AITile.length, remainTile.length);

playerBoard = document.querySelector('.player-board');
for(let i = 0; i < playerTile.length; i++){
    let path = playerTile[i]?.id;
    playerBoard.innerHTML +='<img onclick="plyaer_tile_click(' + path + ')" src="image/' + path + '.svg" class="tile no-drag">';
}
AIBoard = document.querySelector('.AI-board');
for(let i = 0; i < playerTile.length; i++){
    let path = AITile[i]?.id;
    AIBoard.innerHTML +='<img onclick="plyaer_tile_click(' + path + ')" src="image/' + path + '.svg" class="tile">';
}
// mainBoard = document.querySelector('.main-board');
// for(let i = 0; i < remainTile.length; i++){
//     let path = remainTile[i]?.id;
//     mainBoard.innerHTML +='<img src="image/' + path + '.svg" class="tile">';
// }

//타일 이동
// const tiles = document.querySelectorAll(".tile");
// const boards = document.querySelectorAll(".board");
// console.log(tiles);
// tiles.forEach(draggable =>{
//     draggable.addEventListener("dragstart", () =>{
//         draggable.classList.add("dragging");
//     });
//     draggable.addEventListener("dragend", () =>{
//         draggable.classList.remove("dragging");
//     });
// });

// boards.forEach(board =>{
//     board.addEventListener("dragover", e => {
//         e.preventDefault();
//         const draggable = document.querySelector(".dragging");
//         board.appendChild(draggable);
//     });
// });

function isId(e){
    if(e.id === id) return true;
}

function plyaer_tile_click(id){ 
    //alert(id); 
    const tile = playerTile.findIndex((e) =>{
        return e.id == id;
    });
    console.log(playerTile[tile]);
}
