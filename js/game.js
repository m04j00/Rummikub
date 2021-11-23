// timer
//1의 자리일 경우 앞에 0 붙이기
function isUnits(num) {
    return num < 10 ? "0" + num : num;
}

// 플레이어 (true) - 로봇(false) 순으로 진행
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
            if (playerTurn) timeOut();
            else turnEnd();
        } // 타이머 종료
    }, 1000);
}

function initTime() {
    let min = 5;
    let sec = 0;
    let duration = min * 60 + sec;

    element = document.querySelector('.time-text');
    element.textContent = `제한 시간 ${isUnits(min)}:${isUnits(sec)}`;

    startCountDown(--duration, element);
}

window.onload = function () {
    document.querySelector('.player1').classList.add('now-player');
};

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
                "location": 'null',
                "set": 'null'
            })
        }
    }
}
// 조커
initTile.push({
    "id": `5500`,
    "path": `500`,
    "number": `0`,
    "color": `0`,
    "location": 'null',
    "set": 'null'
})
initTile.push({
    "id": `5501`,
    "path": `501`,
    "number": `0`,
    "color": `0`,
    "location": 'null',
    "set": 'null'
})

// 타일 섞기
function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}
inputTile();
shuffle(initTile);
shuffle(initTile);
shuffle(initTile);

//타일 나누기
const playerTile = [];
const robotTile = [];
const remainTile = [];

function splitTile() {
    for (let i = 0, p = 0, a = 0, r = 0; i < 106;) {
        if (i < 28) {
            playerTile[p] = initTile[i++];
            playerTile[p++].location = "player";
            
            robotTile[a] = initTile[i++];
            robotTile[a++].location = "robot";
        } else {
            remainTile[r++] = initTile[i++];
        }
    }
}
function ahkahk(){
    for(let i = 0; i < 14; i++){
        if(robotTile[i].id == '5500' || robotTile[i].id == '5501') {
            playerTile.length = 0;
            robotTile.length = 0;
            shuffle(initTile);
            splitTile();
        }
        else 1;
    }
    
}
function ahk(){
    while(true){
        const hasJoker = robotTile.some((e) => {
            return e.id == '5500' || e.id == '5501';
        });
        console.log(hasJoker);
        if(!hasJoker) return;
        else {
            robotTile.length = 0;
            playerTile.length = 0;
            shuffle(initTile);
            splitTile();
        }
    }
}
splitTile();

ahk();


const playerBoard = document.querySelector('.player-board');
const mainBoard = document.querySelector('.main-board');

// plyaer 타일 띄우기
function show_player_tile() {
    const set_tile = document.querySelector('.set-player-board');
    for (let i = 0; i < playerTile.length; i++) {
        let id = playerTile[i].id;
        let path = playerTile[i].path;
        let div = document.createElement("div");
        div.id = id;
        div.innerHTML += '<img onclick="player_tile_click(' + id + ')" id= "img' + id + '" src="image/' + path + '.svg" class="tile player-tile no-drag">';
        playerBoard.insertBefore(div, set_tile);
    }
}
// function show_player_tile() {
//     const set_tile = document.querySelector('.set-player-board');
//     for (let i = 0; i < robotTile.length; i++) {
//         let id = robotTile[i].id;
//         let path = robotTile[i].path;
//         let div = document.createElement("div");
//         div.id = id;
//         div.innerHTML += '<img onclick="player_tile_click(' + id + ')" id= "img' + id + '" src="image/' + path + '.svg" class="tile player-tile no-drag">';
//         playerBoard.insertBefore(div, set_tile);
//     }
// }
show_player_tile();

//턴 변경
function turnEnd() {
    console.log("turn End");
    playerTurn = !playerTurn; // 플레이어 변경
    isPlayerTime(); // class toggle
    clearInterval(countInterval); // 타이머 종료
    if (whoseWin() != 1) initTime();
}

// 남은 타일 수 변경
function remainingTile() {
    //console.log(tile);
    const remainTile = remainTile.length;
    element = document.querySelector('.remaining-tile-text');
    element.textContent = `남은 타일 개수 ${isUnits(remainTile)}`;
}

// 턴이 바뀔 때마다 paleyrBoard pointer event none toggle
let nowTurn = playerTile;
function isPlayerTime() {
    if (playerTurn) nowTurn = playerTile;
    else nowTurn = robotTile;
    playerBoard.classList.toggle('pointer-event'); // 플레이어 보드 막기
    beforeBtn.classList.toggle('pointer-event'); // skipTurn 버튼 막기
    document.getElementById('tile-set').style.cursor = "default";
    document.querySelector('.set-main-board').classList.toggle('pointer-event'); // 타일 등록 버튼 막기
    nowTurnPlayer();
}

// 게임 종료
function whoseWin() {
    if (playerTile.length == 0 || robotTile.length == 0) return 1;
    else return 0;
}

//time out
function timeOut() {
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

// 플레이어 보드 비우고 다시 띄우기 
function player_tile_refresh() {
    clickTileReset(); // 클릭 타일 배열 비우기
    player1_tile.textContent = `${playerTile.length}`; 
    playerBoard.innerHTML = '<div class="set-player-board" onclick="set_player_board_click()"><img src="image/set.svg" class="tile-set" id="tile-set"></div>'; // 추가 버튼 먼저 띄우기
    show_player_tile(); // 플레이어 타일 띄우기
}

//정렬 버튼
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

function mainBoardBundleSave() {
    mainBoardBundle.length = 0;
    for (let i = 0; i < tileBundle; i++) {
        const bundle = document.getElementById('bundle' + i);
        if (bundle == null) continue;
        const bundleList = bundle.childNodes;
        for (let j = 0; j < bundleList.length; j++) {
            mainBoardBundle.push({
                "pId": 'bundle' + i,
                "path": bundleList[j]
            })
        }
    }
}

const player1_tile = document.querySelector('.player1-tile');
const player2_tile = document.querySelector('.player2-tile');
// 메인 보드 타일 추가
function set_board_click(tile) {
    console.log(tile);
    const setIsPass = isPass(tile);
    const mainBoard = document.querySelector('.main-board');
    let div = document.createElement("div");
    let divId = 'bundle' + tileBundle;
    div.id = divId;
    let divClick = "main_board_set_click(" + divId + ")";
    div.setAttribute("onClick", divClick);
    tileBundle++;
    // console.log(div);

    if (setIsPass) {
        div.className = 'main-board-set-pass';
        div.className += ' add-tile';
    } else {
        div.className = 'main-board-set-fail';
        div.className += ' add-tile';
    }
    const set_tile = document.querySelector('.set-main-board');
    for (let i = 0; i < tile.length; i++) {
        mainBoardDivAddTile(i, div, divId, tile);
        mainBoard.insertBefore(div, set_tile);
    }
    if(tile[0].location == 'player'){
        player1_tile.textContent = `${playerTile.length}`;
        clickTile.length = 0;
    }
    else {
        player2_tile.textContent = `${robotTile.length}`;
        robotAddTile.length = 0;
    }
    
    hasChildMainBoard();
}

function mainBoardDivAddTile(i, div, divId, tile) {
    console.log(tile);
    let id = tile[i].id;
    let path = tile[i].path;
    let location = tile[i].location;

    //플레이어 보드에 이미지 노드 삭제
    if (location == 'mainBoard') {
        tileInfo = mainBoardTile.findIndex((e) => {
            return e.id == id;
        });
        if (tile[i].set == divId) {
            return -1;
        }
        mainBoardTile[tileInfo].set = divId;
        document.getElementById(id).remove();
        for (let i = 0; i < tileBundle - 1; i++) {
            const completeBundle = [];
            const success = completeBundeFun(i, completeBundle);
            if (success == -1) continue;
            //console.log(completeBundle);
        }
    } 
    else {
        let loc = [];
        let turnTile = [];
        if(location =='player') {
            loc = playerTile;
            const nodeImg = document.getElementById(id);
            playerBoard.removeChild(nodeImg);
            // turnTile = nowTurnTile;
        }
        else if(location == 'robot') {
            loc = robotTile;
            // turnTile = robotAddTile;
        }
        // plyaerTile에서 id에 해당하는 index 찾음
        const tileInfo = loc.findIndex((e) => {
            return e.id == id;
        });
        // 판에 타일 등록 시 nowTurnTile에 추가, 플레이어 타일에서 제거
        nowTurnTile.push(loc[tileInfo]);
        mainBoardTile.push(nowTurnTile[nowTurnTile.length - 1]);
        mainBoardTile[mainBoardTile.length - 1].location = 'mainBoard';
        mainBoardTile[mainBoardTile.length - 1].set = divId;
        loc.splice(tileInfo, 1);
        

        
        // console.log(nowBoardTile);
    }
    //메인 보드에 이미지 노드 추가

    div.innerHTML += '<img onclick="main_board_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="tile board-tile no-drag">';
}

function completeBundeFun(i, arr) {
    bundle_div = document.getElementById('bundle' + i);
    if (bundle_div == null) return -1;
    if (!bundle_div.hasChildNodes()) {
        bundle_div.remove();
        return -1;
    }
    count = bundle_div.childElementCount;
    //console.log("타일 개수 : ", count);
    //console.log(bundleDiv.childNodes);
    for (let j = 0; j < count; j++) {
        const reId = bundle_div.childNodes[j].id;
        const tileInfo = mainBoardTile.findIndex((e) => {
            return e.id == reId;
        });
        let setName = 'bundle' + i;
        mainBoardTile[tileInfo].set = setName;
        arr.push(mainBoardTile[tileInfo]);
    }
    //console.log(arr);
    const isComplete = isPass(arr);
    //console.log(isComplete);
    if (isComplete) {
        tile_a_to_z(arr);
        bundle_div.innerHTML = '';
        const isSetTile = false;
        for (let j = 0; j < count; j++) {
            const id = arr[j].id;
            const path = id.substring(1);
            //console.log(arr);
            bundle_div.innerHTML += '<img onclick="main_board_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="tile board-tile no-drag">';
        }
        bundle_div.className = 'main-board-set-pass';
        bundle_div.className += ' add-tile';
    } else {
        bundle_div.className = 'main-board-set-fail';
        bundle_div.className += ' add-tile';
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

    //조커 유무
    const hasJoker = tile.some((e) => {
        return e.id == '5500' || e.id == '5501';
    });
    //조커가 있다면
    if (hasJoker) {
        //조커 인덱스 찾기
        const joker = tile.findIndex((e) => {
            return e.id == '5500' || e.id == '5501';
        });
        //조커 인덱스가 0이라면 숫자 변경
        if (joker == 0) {
            firstNum = tile[1].number;
        } else {
            tile[joker].number = firstNum;
        }
    }
    //console.log(tile)
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
    let nums = [];
    //조커 유무
    const hasJoker = tile.some((e) => {
        return e.id == '5500' || e.id == '5501';
    });
    //조커가 있다면
    //console.log("조커 여부 : ", hasJoker);
    if (hasJoker) {
        //조커 인덱스 찾기
        let joker = tile.findIndex((e) => {
            return e.id == '5500' || e.id == '5501';
        });
        //console.log("조커의 번호 : ", joker);
        tile[joker].number = 0;
        tile_a_to_z(tile);
        // 조커 인덱스 : 0 
        //console.log("조커의 번호 : ", joker);

        isColor.push(tile[1].color);
        //console.log("세트의 색깔은 ", isColor);

        for (let i of tile) {
            nums.push(i.number);
        }
        nums.push(nums[nums.length - 1] + 2);
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] == ((Number)(nums[i + 1]) - 1)) continue;
            tile[0].number = (Number)(nums[i]) + 1;
            tile[0].color = tile[1].color;
            break;
        }
        tile_a_to_z(tile);
    }else{
        isColor.push(tile[0].color);
    }
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
    tile_a_to_z(tile);
    return true;
}

// 버튼
const beforeBtn = document.querySelector(".main-body-before-btn");
const afterBtn = document.querySelector(".main-body-after-btn");

// 메인 보드에 등록 시 버튼 변경 (skip turn -> 초기화/등록)
function hasChildMainBoard() {
    beforeBtn.style.display = 'none';
    afterBtn.style.display = 'block';
}

function skip_turn_click() {
    //로봇 적용 전
    // 타일 푸쉬
    //console.log("남은 타일의 마지막 인덱스 ", remainTile[remainTile.length - 1]);
    playerTile.push(remainTile.pop())
    playerTile[playerTile.length - 1].location = "player";
    //console.log("추가된 타일 ", playerTile[playerTile.length - 1]);
    player_tile_refresh();
    remainingTile();
    clickTileReset();
    turnEnd();
}

function refresh_click() {
    clickTileReset();
    if (mainBoardBundle.length != 0) {
        mainBoard.innerHTML = '<div class="set-main-board" onclick="set_board_click(clickTile)"><img src="image/set.svg" class="tile-set" id="tile-set"></div>';
        const set_tile = document.querySelector('.set-main-board');
        for (let i = 0; i < mainBoardBundle.length; i++) {
            let div;
            let divId = mainBoardBundle[i].pId;
            if (document.getElementById(divId) == null) {
                div = document.createElement("div");
                div.id = divId;
                div.className = 'main-board-set-pass';
                let divClick = "main_board_set_click(" + divId + ")";
                div.setAttribute("onClick", divClick);

            } else {
                div = document.getElementById(divId);
            }
            const id = mainBoardBundle[i].path.id;
            const path = id.substring(1);
            //console.log(div);
            div.innerHTML += '<img onclick="main_board_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="tile board-tile no-drag">';
            mainBoard.insertBefore(div, set_tile);
        }
    }
    for (let i of nowTurnTile) {
        i.set = "null";
        i.location = "player";
        //console.log(i);
        playerTile.push(i);
        //console.log("플레이어 타일에 다시 추가 ", playerTile[playerTile.length - 1]);
        const tileInfo = nowTurnTile.findIndex((e) => {
            return e.id == i.id;
        });
        mainBoardTile.splice(tileInfo, 1);
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
function nowTurnPlayer() {
    let player1 = document.querySelector('.player1');
    let player2 = document.querySelector('.player2');
    let player2_tile = document.querySelector('.player2-tile');

    player1.classList.toggle('now-player');
    player2.classList.toggle('now-player');
    player1_tile.textContent = `${playerTile.length}`;
    player2_tile.textContent = `${robotTile.length}`;
}

//메인 보드 타일 onclick
function main_board_tile_click(id) {
    console.log("main_board_tile_click");
    event.stopPropagation();
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
//플레이어보드 버튼 클릭
function set_player_board_click() {
    const set_tile = document.querySelector('.set-player-board');
    for (let i = 0; i < clickTile.length; i++) {
        let id = clickTile[i].id;
        let path = clickTile[i].path;
        let location = clickTile[i].location;
        if (location == 'mainBoard') {
            const tileInfo = mainBoardTile.findIndex((e) => {
                return e.id == id;
            });
            const nowBoardTile = nowTurnTile.some((e) => {
                return e.id == id;
            });
            if (nowBoardTile) {
                const nowTurnLoc = nowTurnTile.findIndex((e) => {
                    return e.id == id;
                });
                nowTurnTile.splice(nowTurnLoc, 1);
                playerTile.push(mainBoardTile[tileInfo]);
                playerTile[playerTile.length - 1].location = "player";
                playerTile[playerTile.length - 1].set = "null";
                mainBoardTile.splice(tileInfo, 1);
                const tile = document.getElementById(id);
                tile.remove();
                for (let i = 0; i < tileBundle; i++) {
                    const completeBundle = [];
                    const success = completeBundeFun(i, completeBundle);
                    if (success == -1) continue;
                }
            } else {
                tile_click_shadow(id);
                continue;
            }
            let div = document.createElement("div");
            div.id = id;
            div.innerHTML += '<img onclick="player_tile_click(' + id + ')" id= "img' + id + '" src="image/' + path + '.svg" class="tile no-drag">';
            playerBoard.insertBefore(div, set_tile);
        } else {
            tile_click_shadow('img' + id);
        }
    }
    clickTile.length = 0;
    if (clickTile.length == 0) {
        beforeBtn.style.display = 'block';
        afterBtn.style.display = 'none';
    }
}

function main_board_set_click(div) {
    console.log("click")
    if (clickTile.length == 0) {
        return;
    }
    hasChildMainBoard();
    //console.log("div", div.id);
    for (let i = 0; i < clickTile.length; i++) {
        let nowDIv = mainBoardDivAddTile(i, div, div.id);
        if (nowDIv == -1) tile_click_shadow(clickTile[i].id);
    }
    for (let i = 0; i < tileBundle; i++) {
        const completeBundle = [];
        const success = completeBundeFun(i, completeBundle);
        if (success == -1) continue;
        //console.log(completeBundle);
    }
    player1_tile.textContent = `${playerTile.length}`;
    clickTileReset();
}

//정렬 / reset 등의 버튼 눌렀을 때 clickTile 배열 초기화
function clickTileReset(){
    clickTile.length = 0;
}