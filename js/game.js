// timer
//1의 자리일 경우 앞에 0 붙이기
function isUnits(num) {
    return num < 10 ? "0" + num : num;
}
// 플레이어 (true)- 로봇(false) 순으로 진행
let playerTurn = true;
let countInterval;

function startCountDown(duration, element) {
    let setTime = duration;
    let min = 0,
        sec = 0;

    countInterval = setInterval(function () {
        min = parseInt(setTime / 60);
        sec = parseInt(setTime % 60);

        element.textContent = `제한 시간 ${isUnits(min)}:${isUnits(sec)}`;

        setTime--;
        if (setTime < 0) {
            console.log("현재 턴 : ", playerTurn);
            if(playerTurn) timeOut();
            else turnEnd();
        } // 타이머 종료
    }, 1000);
}
// 스킵 턴 시 중복 내용이라 함수로 묶음
function turnEnd() {
    console.log("turn End");
    playerTurn = !playerTurn; // 플레이어 변경
    isPlayerTime(); // class toggle
    clearInterval(countInterval); // 타이머 종료
    if (whoseWin() != 1) initTime();
}

function initTime() {
    let min = 0;
    let sec = 5;
    let duration = min * 60 + sec;

    element = document.querySelector('.time-text');
    element.textContent = `제한 시간 ${isUnits(min)}:${isUnits(sec)}`;

    startCountDown(--duration, element);
}

function remainingTile(tile) {
    console.log(tile);
    element = document.querySelector('.remaining-tile-text');
    element.textContent = `남은 타일 개수 ${isUnits(tile)}`;
}
window.onload = function () {
    document.querySelector('.player1').classList.add('now-player');
    // initTime();
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
function inputTile() {
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
function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}
inputTile();
shuffle(initTile);
// for(let i = 0; i < 104; i++){console.log(initTile[i])}

//타일 나누기
const playerTile = [];
const AITile = [];
const remainTile = [];

function splitTile() {
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

// 턴이 바뀔 때마다 paleyrBoard pointer event none toggle
let nowTurn = playerTile;

function isPlayerTime() {
    if (playerTurn) nowTurn = playerTile;
    else nowTurn = AITile;
    playerBoard.classList.toggle('pointer-envent'); // 플레이어 보드 막기
    beforeBtn.classList.toggle('pointer-envent'); // skipTurn 버튼 막기
    document.getElementById('tile-set').style.cursor = "default";
    document.querySelector('.set-board').classList.toggle('pointer-envent'); // 타일 등록 버튼 막기
    nowTurnPlayer();
}
// 게임 종료
function whoseWin() {
    if (playerTile.length == 0 || AITile.length == 0) return 1;
    else return 0;
}

//time out
function timeOut() {
    console.log("timeOut");
    // 추가된 타일이 없을 경우 return
    if (nowTurnTile.length == 0) {
        skip_turn_click();
        return;
    }
    // 조건이 일치하지 않는 타일 묶음이 있을 경우 판 초기화 후 타일 한 장 추가
    if (document.querySelector('.main-board-set-fail')) {
        refresh_click();
        skip_turn_click();
        return;
    }
    pass_click();

}
const playerBoard = document.querySelector('.player-board');
const mainBoard = document.querySelector('.main-board');

// plyaer 타일 띄우기
function show_player_tile() {
    for (let i = 0; i < playerTile.length; i++) {
        let id = playerTile[i].id;
        let path = playerTile[i].path;
        playerBoard.innerHTML += '<img onclick="player_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="tile no-drag">';
    }
}
show_player_tile();
mainBoard.innerHTML += '<div class="set-board" onclick="set_board_click()"><img src="image/set.svg" class="tile-set" id="tile-set"></div>';
// 타일 선택 시 후광 효과
// 타일 선택 시 clickTile 배열에 추가
const clickTile = [];
const nowTurnTile = [];

function tile_click_shadow(id) {
    const tile = document.getElementById(id);
    tile.classList.toggle('tile-click');
}

function player_tile_click(id) {
    // alert(id); 
    const tileInfo = playerTile.findIndex((e) => {
        return e.id == id;
    });
    const tile = document.getElementById(id);
    if (!tile.classList.contains('tile-click')) {
        clickTile.push(playerTile[tileInfo]);
        //nowTurnTile.push(playerTile[tileInfo]);
    } else {
        const popTile = clickTile.findIndex((e) => {
            return e.id == id;
        })
        clickTile.splice(popTile, 1);
    }
    tile_click_shadow(id);

    // 타일 선택 시 커서 변경
    if (clickTile.length > 0) {
        document.getElementById('tile-set').style.cursor = "pointer";
    } else {
        document.getElementById('tile-set').style.cursor = "default";
    }
    // console.log("tile", tile);
    // console.log("clickTile", clickTile);
    // console.log(playerTile[tileInfo]);
}

// 플레이어 타일 sort
//숫자 정렬
function tile_a_to_z(arrTile) {
    arrTile.sort(function (a, b) {
        return a.number - b.number;
    })
}
//색깔 정렬
function tile_r_to_b(arrTile) {
    arrTile.sort(function (a, b) {
        return a.color - b.color;
    })
}

function player_tile_refresh() {
    player1_tile.textContent = `${playerTile.length}`;
    playerBoard.innerText = '';
    show_player_tile();
}

function r_to_b_click() {
    tile_r_to_b(playerTile);
    tile_a_to_z(playerTile);

    player_tile_refresh();
}

function a_to_z_click() {
    tile_a_to_z(playerTile);
    tile_r_to_b(playerTile);

    player_tile_refresh();
}

// 타일 등록
const player1_tile = document.querySelector('.player1-tile');
function set_board_click() {
    const setIsPass = isPass();
    const mainBoard = document.querySelector('.main-board');
    let div = document.createElement("div");
    // console.log(div);

    if (setIsPass) {
        div.className = 'main-board-set-pass';
        div.className += ' add-tile';
    } else {
        div.className = 'main-board-set-fail';
        div.className += ' add-tile';
    }

    for (let i = 0; i < clickTile.length; i++) {
        let id = clickTile[i].id;
        let path = clickTile[i].path;

        //플레이어 보드에 이미지 노드 삭제
        const tileInfo = playerTile.findIndex((e) => {
            return e.id == id;
        });
        // 판에 타일 등록 시 nowTurnTile에 추가, 플레이어 타일에서 제거
        nowTurnTile.push(playerTile[tileInfo]);
        playerTile.splice(tileInfo, 1);
        const nodeImg = document.getElementById(id);
        playerBoard.removeChild(nodeImg);

        //메인 보드에 이미지 노드 추가
        const set_tile = document.querySelector('.set-board');
        div.innerHTML += '<img onclick="plyaer_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="tile no-drag">';
        mainBoard.insertBefore(div, set_tile);
    }
    player1_tile.textContent = `${playerTile.length}`;
    clickTile.length = 0;
    hasChildMainBoard();
}

// 등록 시 조건 일치 확인
let PorF = [];
//타일의 숫자가 모두 똑같은지 비교
function is777(tile) {
    let firstNum = tile[0].number;
    let isColor = [];
    isColor.push(tile[0].color);
    for (let i = 1; i < tile.length; i++) {
        if (isColor.includes(tile[i].color)) return false;
        isColor.push(tile[i].color);
        if (firstNum != tile[i].number) return false;
    }
    return true;
}
//타일의 숫자가 연속인지 비교
function is789(tile) {
    let isColor = [];
    isColor.push(tile[0].color);
    for (let i = 1; i < tile.length; i++) {
        if (!isColor.includes(tile[i].color)) return false;
        isColor.push(tile[i].color);
        if ((Number)(tile[i - 1].number) + 1 != tile[i].number) return false;
    }
    return true;
}
//모든 조건을 만족하는지 확인
function isPass() {
    if (clickTile.length < 3) return false;
    PorF = clickTile.slice();
    tile_a_to_z(PorF);
    const tile777 = is777(PorF);
    if (!tile777) {
        const tile789 = is789(PorF);
        if (!tile789) {
            return false;
        }
        tile_a_to_z(clickTile);
        return true;
    }
    return true;
}

// 버튼
const beforeBtn = document.querySelector(".main-body-before-btn");
const afterBtn = document.querySelector(".main-body-after-btn");

// 메인 보드에 등록 시 버튼 변경 (skip turn -> 초기화/등록)
function hasChildMainBoard() {
    if (document.querySelector(".add-tile") != null) {
        beforeBtn.style.display = 'none';
        afterBtn.style.display = 'block';
    }
}

function skip_turn_click() {
    //로봇 적용 전
    // 타일 푸쉬
    console.log("남은 타일의 마지막 인덱스 ", remainTile[remainTile.length - 1]);
    playerTile.push(remainTile.pop())
    console.log("추가된 타일 ", playerTile[playerTile.length - 1]);
    player_tile_refresh();
    remainingTile(remainTile.length);
    turnEnd();
}

function refresh_click() {
    for (let i = 0; i < nowTurnTile.length; i++) {
        playerTile.push(nowTurnTile[i]);
        //console.log("플레이어 타일에 다시 추가 ", playerTile[playerTile.length - 1]);
    }
    while (document.querySelector('.add-tile') != null) {
        document.querySelector('.add-tile').remove();
    }
    player_tile_refresh();
    beforeBtn.style.display = 'block';
    afterBtn.style.display = 'none';
    nowTurnTile.length = 0;
}

function pass_click() {
    if (document.querySelector('.main-board-set-fail')) {
        alert("조건이 일치하지 않습니다.");
        return;
    }
    if (document.querySelector('.main-board-set-pass')) {
        const tile = document.querySelector('.add-tile');
        tile.classList.remove('add-tile');
    } else {
        alert("조건이 일치하지 않습니다.");
        return;
    }
    beforeBtn.style.display = 'block';
    afterBtn.style.display = 'none';
    nowTurnTile.length = 0;
    turnEnd();
}
// 누구의 턴인가 
function nowTurnPlayer(){
    let player1 = document.querySelector('.player1');
    let player2 = document.querySelector('.player2');
    let player2_tile = document.querySelector('.player2-tile');

    player1.classList.toggle('now-player');
    player2.classList.toggle('now-player');
    player1_tile.textContent = `${playerTile.length}`;
    player2_tile.textContent = `${AITile.length}`;
}