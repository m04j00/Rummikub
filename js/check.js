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
function inputTile(){
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 13; j++) {
            initTile.push({
                "id": `${i}${tileColor[i]}${j}`,
                "path": `${tileColor[i]}${j}`,
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
shuffle(initTile);
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
function splitTile(){
    for (let i = 0, p = 0, a = 0, r = 0; i < 104;) {
        if (i < 28) {
            playerTile[p++] = initTile[i++];
            AITile[a++] = initTile[i++];
        } else {
            remainTile[r++] = initTile[i++];
        }
    }
}
splitTile();
// console.log(playerTile.length, AITile.length, remainTile.length);

const playerBoard = document.querySelector('.player-board');
const AIBoard = document.querySelector('.AI-board');
const mainBoard = document.querySelector('.main-board');

function show_player_tile(){
    for (let i = 0; i < playerTile.length; i++) {
        let id = playerTile[i].id;
        let path = playerTile[i].path;
        playerBoard.innerHTML += '<img onclick="plyaer_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="tile no-drag">';
    }
}

function show_tile(){
    for (let i = 0; i < playerTile.length; i++) {
        let id = AITile[i].id;
        let path = AITile[i].path;
        AIBoard.innerHTML +='<img src="image/' + path + '.svg" class="tile">';
    }
    
    for(let i = 0; i < remainTile.length; i++){
        let path = remainTile[i]?.path;
        mainBoard.innerHTML +='<img src="image/' + path + '.svg" class="tile">';
    }
}
show_player_tile();
show_tile();
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


// 타일 선택 시 clickTile 배열에 추가
const clickTile = [];

function tile_click_shadow(id) {
    const tile = document.getElementById(id);
    tile.classList.toggle('tile-click');
}

function plyaer_tile_click(id) {
    // alert(id); 
    const tilInfo = playerTile.findIndex((e) => {
        return e.id == id;
    });
    const tile = document.getElementById(id);
    if (!tile.classList.contains('tile-click')) {
        clickTile.push(playerTile[tilInfo]);
    } else {
        const popTile = clickTile.findIndex((e) => {
            return e.id == id;
        })
        clickTile.splice(popTile, 1);
    }
    tile_click_shadow(id);
    console.log("tile", tile);
    console.log("clickTile", clickTile);
    console.log(playerTile[tilInfo]);
}

function AI_tile_click(id) {
    //alert(id); 
    const tilInfo = AITile.findIndex((e) => {
        return e.id == id;
    });
    const tile = document.getElementById(id);
    // tile.className.add("tile-click");
    document.getElementById(id).classList.toggle('tile-click');
    console.log(tile)

    console.log(AITile[tilInfo]);
}

function set_board_click() {
    const setIsPass = isPass();
    const mainBoard = document.querySelector('.main-board');
    let div = document.createElement("div");
    console.log(div);
    if(setIsPass){
        div.className = 'main-board-set-pass';
    }
    else{
        div.className = 'main-board-set-fail';
    }
    
    for (let i = 0; i < clickTile.length; i++) {
        let id = clickTile[i].id;
        let path = clickTile[i].path;

        //플레이어 보드에 이미지 노드 삭제
        const tileInfo = playerTile.findIndex((e) => {
            return e.id == id;
        });
        playerTile.splice(tileInfo, 1);
        const nodeImg = document.getElementById(id);
        playerBoard.removeChild(nodeImg);

        //메인 보드에 이미지 노드 추가
        const set_tile = document.querySelector('.set-board');
        div.innerHTML += '<img onclick="plyaer_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="tile no-drag">';
        mainBoard.insertBefore(div, set_tile);
    }
    clickTile.length = 0;
}
let PorF = [];
//타일의 숫자가 모두 똑같은지 비교
function is777(tile){
    let firstNum = tile[0].number;
    let isColor = [];
    isColor.push(tile[0].color);
    for(let i = 1; i < tile.length; i++){
        if(isColor.includes(tile[i].color)) return false;
        isColor.push(tile[i].color);
        if(firstNum != tile[i].number) return false;
    }
    return true;
}
function is789(tile){
    let isColor = [];
    isColor.push(tile[0].color);
    for(let i = 1; i < tile.length; i++){
        if(!isColor.includes(tile[i].color)) return false;
        isColor.push(tile[i].color);
        if((Number)(tile[i - 1].number) + 1 != tile[i].number) return false;
    }
    return true;
}
function isPass(){
    if(clickTile.length < 3) return false;
    PorF = clickTile.slice();
    tile_a_to_z(PorF);
    const tile777 = is777(PorF);
    if(!tile777){
        const tile789 = is789(PorF);
        if(!tile789){
            return false;
        }
        return true;
    }
    return true;    
}

// 플레이어 타일 sort
//숫자 정렬
function tile_a_to_z(arrTile){
    arrTile.sort(function(a, b){
        return a.number - b.number;
    })
}
//색깔 정렬
function tile_r_to_b(arrTile){
    arrTile.sort(function(a, b){
        return a.color - b.color;
    })
}
function player_tile_refresh(){
    playerBoard.innerText = '';
    input_player_tile();
}

function r_to_b_click(){
    tile_r_to_b(playerTile);
    tile_a_to_z(playerTile);

    player_tile_refresh();
}
function a_to_z_click(){
    tile_a_to_z(playerTile);
    tile_r_to_b(playerTile);

    player_tile_refresh();
}