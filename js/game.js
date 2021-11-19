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

function turnEnd() {
    //console.log("turn End");
    playerTurn = !playerTurn; // 플레이어 변경
    isPlayerTime(); // class toggle
    clearInterval(countInterval); // 타이머 종료
    if (whoseWin() != 1) initTime();
}

function initTime() {
    let min = 5;
    let sec = 0;
    let duration = min * 60 + sec;

    element = document.querySelector('.time-text');
    element.textContent = `제한 시간 ${isUnits(min)}:${isUnits(sec)}`;

    startCountDown(--duration, element);
}

function remainingTile(tile) {
    //console.log(tile);
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
                "color": `${tileColor[i]}`,
                "location" : 'player'
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
    document.querySelector('.set-main-board').classList.toggle('pointer-envent'); // 타일 등록 버튼 막기
    nowTurnPlayer();
}
// 게임 종료
function whoseWin() {
    if (playerTile.length == 0 || AITile.length == 0) return 1;
    else return 0;
}
//time out
function timeOut() {
    //console.log("timeOut");
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
    const set_tile = document.querySelector('.set-player-board');
    //console.log(set_tile);
    for (let i = 0; i < playerTile.length; i++) {
        let id = playerTile[i].id;
        let path = playerTile[i].path;
        let div = document.createElement("div");
        div.id = id;
        div.innerHTML += '<img onclick="player_tile_click(' + id + ')" id= "img' + id + '" src="image/' + path + '.svg" class="tile no-drag">';
        //div.innerHTML += '<img onclick="player_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="tile no-drag">';
        playerBoard.insertBefore(div, set_tile);
    }
}
show_player_tile();
mainBoard.innerHTML += '';
// 타일 선택 시 후광 효과
// 타일 선택 시 clickTile 배열에 추가
const clickTile = [];
const nowTurnTile = [];

function tile_click_shadow(id) {
    const tile = document.getElementById(id);
    //console.log(tile);
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
    tile_click_shadow('img' + id);

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
    playerBoard.innerHTML = '<div class="set-player-board" onclick="set_player_board_click()"><img src="image/set.svg" class="tile-set" id="tile-set"></div>';
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

let tileBundle = 0;
const mainBoardTile = [];
const mainBoardBundle = [];
let mainBoardBundleCnt = 0;
function mainBoardBundleSave(){
    mainBoardBundle.length = 0;
    mainBoardBundleCnt = 0;
    for(let i = 0; i < tileBundle; i++){
        const bundle = document.getElementById('bundle' + i);
        if(bundle== null) continue;
        const bundleList = bundle.childNodes;
        mainBoardBundleCnt++;
        for(let j = 0; j < bundleList.length; j++){
            mainBoardBundle.push({
                "pId" : 'bundle' + i,
                "path" : bundleList[j]
            })
        }
    }
}
// 메인 보드 타일 추가
const player1_tile = document.querySelector('.player1-tile');
function set_board_click() {
    const setIsPass = isPass(clickTile);
    const mainBoard = document.querySelector('.main-board');
    let div = document.createElement("div");
    div.id = 'bundle' + tileBundle;
    tileBundle++;
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
        let location = clickTile[i].location;

        //플레이어 보드에 이미지 노드 삭제
        if(location == 'player'){
            const tileInfo = playerTile.findIndex((e) => {
                return e.id == id;
            });
            // 판에 타일 등록 시 nowTurnTile에 추가, 플레이어 타일에서 제거
            nowTurnTile.push(playerTile[tileInfo]);
            mainBoardTile.push(nowTurnTile[nowTurnTile.length - 1]);
            mainBoardTile[mainBoardTile.length - 1]. location = 'mainBoard';
            playerTile.splice(tileInfo, 1);
            const nodeImg = document.getElementById(id);
            playerBoard.removeChild(nodeImg);
        }else{
            // 현재 추가한 타일인지  true/false
            const nowBoardTile = nowTurnTile.some((e) => {
                return e.id == id;
            });
            if(nowBoardTile){
                document.getElementById(id).remove();
                for(let i = 0; i < tileBundle - 1; i++){
                    const div = document.getElementById('bundle' + i);
                    if(div == null) continue;
                    //console.log("div : ", div);
                    if(!div.hasChildNodes()) {
                        div.remove();
                    }
                }
            }
            else{
                document.getElementById(id).remove();
                for(let i = 0; i < tileBundle - 1; i++){
                    
                    const completeBundle = []; 
                    const success = completeBundeFun(i, completeBundle);
                    if(success == -1) continue;
                    //console.log(completeBundle);

                }
            }
            // console.log(nowBoardTile);
        }
        //메인 보드에 이미지 노드 추가
        const set_tile = document.querySelector('.set-main-board');
        div.innerHTML += '<img onclick="main_board_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="tile no-drag">';
        mainBoard.insertBefore(div, set_tile);
    }
    player1_tile.textContent = `${playerTile.length}`;
    clickTile.length = 0;
    hasChildMainBoard();
}
function completeBundeFun(i, arr){
    bundle_div = document.getElementById('bundle' + i);
    if(bundle_div == null) return -1;
    if(!bundle_div.hasChildNodes()) {
        bundle_div.remove(); return -1;
    }
    count = bundle_div.childElementCount;
    //console.log("타일 개수 : ", count);
    //console.log(bundleDiv.childNodes);
    for(let j = 0; j < count; j++){
        const reId = bundle_div.childNodes[j].id;
        const tileInfo = mainBoardTile.findIndex((e) => {
            return e.id == reId;
        });
        arr.push(mainBoardTile[tileInfo]);
    }
    const isComplete = isPass(arr);
    //console.log(isComplete);
    if (isComplete) {
        bundle_div.className = 'main-board-set-pass';
        bundle_div.className += ' add-tile';
        bundle_div.className += ' old-tile';
    } else {
        bundle_div.className = 'main-board-set-fail';
        bundle_div.className += ' add-tile';
        bundle_div.className += ' old-tile';
    }
}
let bundle_div;
let count;

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
function isPass(tile) {
    if (tile.length < 3) return false;
    PorF = tile.slice();
    tile_a_to_z(PorF);
    const tile777 = is777(PorF);
    if (!tile777) {
        const tile789 = is789(PorF);
        if (!tile789) {
            return false;
        }
        tile_a_to_z(tile);
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
    //console.log("남은 타일의 마지막 인덱스 ", remainTile[remainTile.length - 1]);
    playerTile.push(remainTile.pop())
    //console.log("추가된 타일 ", playerTile[playerTile.length - 1]);
    player_tile_refresh();
    remainingTile(remainTile.length);
    turnEnd();
}

function refresh_click() {
    if(mainBoardBundle.length != 0){
        mainBoard.innerHTML = '<div class="set-main-board" onclick="set_board_click()"><img src="image/set.svg" class="tile-set" id="tile-set"></div>';
        const set_tile = document.querySelector('.set-main-board');
        for(let i = 0; i < mainBoardBundle.length; i++){
            let div;
            if(document.getElementById(mainBoardBundle[i].pId) == null){
                div = document.createElement("div");
                div.id = mainBoardBundle[i].pId;
                div.className = 'main-board-set-pass';
            }
            else{
                div = document.getElementById(mainBoardBundle[i].pId);
            }
            const id = mainBoardBundle[i].path.id;
            const path = id.substring(1);
            console.log(div);
            div.innerHTML += '<img onclick="main_board_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="tile no-drag">';
            mainBoard.insertBefore(div, set_tile);
        }
    }
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
        tile.classList.add('old-tile');
        
    } else {
        alert("조건이 일치하지 않습니다.");
        return;
    }
    beforeBtn.style.display = 'block';
    afterBtn.style.display = 'none';
    nowTurnTile.length = 0;
    mainBoardBundleSave();
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

//메인 보드 타일 onclick
function main_board_tile_click(id){
    const tileInfo = mainBoardTile.findIndex((e) => {
        return e.id == id;
    });
    const tile = document.getElementById(id);
    if (!tile.classList.contains('tile-click')) {
        clickTile.push(mainBoardTile[tileInfo]);
    } else {
        const popTile = clickTile.findIndex((e) => {
            return e.id == id;
        })
        clickTile.splice(popTile, 1);
    }
    tile_click_shadow(id);
}
function set_player_board_click(){
    const set_tile = document.querySelector('.set-player-board');
    for (let i = 0; i < clickTile.length; i++) {
        let id = clickTile[i].id;
        let path = clickTile[i].path;
        let location = clickTile[i].location;
        if(location == 'mainBoard'){
            const tileInfo = mainBoardTile.findIndex((e) => {
                return e.id == id;
            });
            const nowBoardTile = nowTurnTile.some((e) => {
                return e.id == id;
            });
            if(nowBoardTile){
                const nowTurnLoc = nowTurnTile.findIndex((e) => {
                    return e.id == id;
                });
                nowTurnTile.splice(nowTurnLoc, 1);
                playerTile.push(mainBoardTile[tileInfo]);
                playerTile[playerTile.length - 1].location = "player";
                mainBoardTile.splice(tileInfo, 1);
                const tile = document.getElementById(id);
                tile.remove();
                for(let i = 0; i < tileBundle; i++){
                    const completeBundle = []; 
                    const success = completeBundeFun(i, completeBundle);
                    if(success == -1) continue;
                }
            }
            else continue;
            let div = document.createElement("div");
            div.id = id;
            div.innerHTML += '<img onclick="player_tile_click(' + id + ')" id= "img' + id + '" src="image/' + path + '.svg" class="tile no-drag">';
            playerBoard.insertBefore(div, set_tile);
        }
    }
    clickTile.length = 0;
}