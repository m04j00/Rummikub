// timer
//1의 자리일 경우 앞에 0 붙이기
function isUnits(num) {
    return num < 10 ? "0" + num : num;
}

function startCountDown(duration, element) {
    let setTime = duration;
    let min = 0,
        sec = 0;

    let countInterval = setInterval(function () {
        min = parseInt(setTime / 60);
        sec = parseInt(setTime % 60);

        element.textContent = `제한 시간 ${isUnits(min)}:${isUnits(sec)}`;

        setTime--;
        if (setTime < 0) {
            clearInterval(countInterval);
        } // 타이머 종료
    }, 1000);
}

function initTime() {
    let min = 1;
    let sec = 0;
    let duration = min * 60 + sec;

    element = document.querySelector('.time-text');
    element.textContent = `제한 시간 ${isUnits(min)}:${isUnits(sec)}`;

    startCountDown(--duration, element);
}

function remainingTile(tile) {
    element = document.querySelector('.remaining-tile-text');
    element.textContent = `남은 타일 개수 ${isUnits(tile)}`;
}
window.onload = function () {
    //initTime();
};

// 타일 나눠주기
// playerBoard = document.querySelector('.player-board');
// console.log(playerBoard);
// playerBoard.innerHTML ='<img src="image/1-01.svg" class="tile"><br>';

// 타일 선언 및 셔플
const initTile = [];
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
// 타일 저장
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
// 타일 섞기
function shuffle(arr){
    arr.sort(() => Math.random() - 0.5);
}
inputTile();
shuffle(initTile);
// for(let i = 0; i < 104; i++){console.log(initTile[i])}

//타일 나누기
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
// console.log(playerTile);

const playerBoard = document.querySelector('.player-board');
const mainBoard = document.querySelector('.main-board');

// plyaer 타일 띄우기
function show_player_tile(){
    for (let i = 0; i < playerTile.length; i++) {
        let id = playerTile[i].id;
        let path = playerTile[i].path;
        playerBoard.innerHTML += '<img onclick="player_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="tile no-drag">';
    }
}
show_player_tile();

// 타일 선택 시 후광 효과
// 타일 선택 시 clickTile 배열에 추가
const clickTile = [];

function tile_click_shadow(id) {
    const tile = document.getElementById(id);
    tile.classList.toggle('tile-click');
}

function player_tile_click(id) {
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
    show_player_tile();
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