// 타일 선언 및 셔플
const initTile = [];
const nowTurnTile = [];
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
const clickTile = [];

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
splitTile();
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
show_player_tile();

function tile_click_shadow(id) {
    const tile = document.getElementById(id);
    //console.log(tile);
    tile.classList.toggle('tile-click');
}

function player_tile_click(id) {
    const tileInfo = playerTile.findIndex((e) => {
        return e.id == id;
    });
    const tile = document.getElementById('img' + id);
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

    const hasClass = mainBoard.classList.contains('tile-click-poiner');
    if(clickTile.length > 0){
        if(!hasClass) mainBoard.classList.add('tile-click-poiner');
    }
    else{
        if(hasClass) mainBoard.classList.remove('tile-click-poiner');
    }
}
let tileBundle = 0;
let mainBoardTile = [];
const mainBoardBundle = [];

function mainBoardBundleSave() {
    mainBoardBundle.length = 0;
    for (let i = 0; i < tileBundle; i++) {
        const bundle = document.getElementById(i);
        if (bundle == null) continue;
        const bundleList = bundle.childNodes;
        for (let j = 0; j < bundleList.length; j++) {
            mainBoardBundle.push({
                "pId": i,
                "path": bundleList[j]
            })
        }
    }
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
}

function main_board_set_click(divId, tile) {
    console.log("click")
    if (tile.length == 0) {
        return;
    }
    //console.log("div", div.id);
    const div = document.getElementById(divId);
    console.log("div", div);
    console.log("divId", divId);
    for (let i = 0; i < tile.length; i++) {
        let nowDiv = mainBoardDivAddTile(i, div, divId, tile);
        if (nowDiv == -1 && clickTile.length > 0) tile_click_shadow(tile[i].id);
    }
    for (let i = 0; i < tileBundle; i++) {
        const completeBundle = [];
        const success = completeBundeFun(i, completeBundle);
        if (success == -1) continue;
        //console.log(completeBundle);
    }
    
    if(clickTile.length > 0) {
        clickTile.length = 0;
    }

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
function set_board_click(tile) {
    let loc;
    if(clickTile.length == 0) return;
    loc = 'player';

    if(tile.length == 0) return;
    const setIsPass = isPass(tile);

    if (setIsPass) {
        const div = createDiv();
        div.className = 'main-board-set-pass';
        div.className += ' add-tile';
        for (let i = 0; i < tile.length; i++) {
            mainBoardDivAddTile(i, div, div.id, tile);
            mainBoard.appendChild(div);
        }
    } else {
        tile_a_to_z(tile);
        let k = 0;
        const div = createDiv();
        div.className = 'main-board-set-fail';
        div.className += ' add-tile';
        mainBoardDivAddTile(k, div, div.id, tile);
        mainBoard.appendChild(div);
        k++;
        
        const tile777 = is777(tile);
        const tile789 = is789(tile);
        if(tile777 || tile789){
            for(let j = k; j < tile.length; j++){
                mainBoardDivAddTile(j, div, div.id, tile);
            }
        }
        else{
            for (let i = k; i < tile.length; i++) {
                const div = createDiv();
                div.className = 'main-board-set-fail';
                div.className += ' add-tile';
                mainBoardDivAddTile(i, div, div.id, tile);
                mainBoard.appendChild(div);
            }
        }
    }

    console.log(tile[0]);
    console.log("loc : ", loc );
    if(loc == 'player'){
        console.log("clickTile delete");
        clickTile.length = 0;
    }
    mainBoard.classList.remove('tile-click-poiner');
}

function createDiv(){
    let div = document.createElement("div");
    let divId = tileBundle;
    div.id = divId;
    let divClick = "main_board_set_click(" + divId + ", clickTile)";
    div.setAttribute("onClick", divClick);
    tileBundle++;
    return div;
}
function mainBoardDivAddTile(i, div, divId, tile) {
    console.log(tile);
    let id = tile[i].id;
    let path = tile[i].path;
    let location = tile[i].location;

    if(location == 'robot' || location == 'player') {
        let loc = [];
        let turnTile = [];
        if(location =='player') {
            loc = playerTile;
            const nodeImg = document.getElementById(id);
            playerBoard.removeChild(nodeImg);
            // turnTile = nowTurnTile;
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
        console.log("타일 인덱스 : ", mainBoardTile.length);
    }
    else{
        tileInfo = mainBoardTile.findIndex((e) => {
            return e.id == id;
        });
        if (tile[i].set == divId) {
            return -1;
        }
        
        mainBoardTile.push(mainBoardTile[tileInfo]);
        mainBoardTile[mainBoardTile.length - 1].set = divId;
        mainBoardTile.splice(tileInfo, 1);
        console.log("타일 인덱스 : ", mainBoardTile.length);
        document.getElementById(id).remove();
        for (let i = 0; i < tileBundle - 1; i++) {
            const completeBundle = [];
            const success = completeBundeFun(i, completeBundle);
            if (success == -1) continue;
            //console.log(completeBundle);
        }
    }
    //메인 보드에 이미지 노드 추가

    div.innerHTML += '<img onclick="main_board_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="main-board-tile board-tile no-drag">';
}

function completeBundeFun(i, arr) {
    bundle_div = document.getElementById(i);
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
        let setName = i;
        mainBoardTile.push(mainBoardTile[tileInfo]);
        mainBoardTile[mainBoardTile.length - 1].set = setName;
        arr.push(mainBoardTile[tileInfo]);
        mainBoardTile.splice(tileInfo, 1);
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
            bundle_div.innerHTML += '<img onclick="main_board_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="main-board-tile board-tile no-drag">';
        }
        bundle_div.className = 'main-board-set-pass';
        bundle_div.className += ' add-tile';
    } else {
        let k = 0;
        bundle_div.innerHTML = '';
        const id = arr[k++].id;
        const path = id.substring(1);
        //console.log(arr);
        bundle_div.innerHTML += '<img onclick="main_board_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="main-board-tile board-tile no-drag">';

        bundle_div.className = 'main-board-set-fail';
        bundle_div.className += ' add-tile';
        const tile777 = is777(arr);
        const tile789 = is789(arr);
        if(tile777 || tile789){
            for(let j = k; j < count; j++){
                const id = arr[j].id;
                const path = id.substring(1);
                bundle_div.innerHTML += '<img onclick="main_board_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="main-board-tile board-tile no-drag">';
            }
        }
        else{
            for(let j = k; j < count; j++){
                const div = createDiv();
                console.log("div : ", div);
                div.className = 'main-board-set-fail';
                div.className += ' add-tile';
                const id = arr[j].id;
                const path = id.substring(1);
                //console.log(arr);
                div.innerHTML = '<img onclick="main_board_tile_click(' + id + ')" id="' + id + '" src="image/' + path + '.svg" class="main-board-tile board-tile no-drag">';
                mainBoard.appendChild(div);
            }
        }

    }
}
let bundle_div;
let count;

// 등록 시 조건 일치 확인
let PorF = [];
//타일의 숫자가 모두 똑같은지 비교
function is777(tile) {
    console.log("똑같은 숫자 타일");
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
        tile[joker].number = 0;
        tile[joker].color = 0;
        console.log(tile[joker]);
        tile_a_to_z(tile);
        
        //조커 인덱스가 0이라면 숫자 변경
        firstNum = tile[1].number;
        tile[0].number = firstNum;
        isColor.pop();
        isColor.push(tile[0].color);
    }
    const colors = ['1','2','3','4'];
    for (let i = 1; i < tile.length; i++) {
        const color = tile[i].color;
        if (isColor.includes(color)) return false;
        isColor.push(color);
        const hasColor = colors.indexOf(color); 
        if (hasColor > -1) {
            colors.splice(hasColor, 1);
        }
        if (firstNum != tile[i].number) return false;
    }
    if (hasJoker) {
        tile[0].color = colors[0];
    }
    return true;
}
//타일의 숫자가 연속인지 비교
function is789(tile) {
    console.log("연속된 숫자 타일");
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
function player_click(){
    console.log("click");
    for(let i = 0; i < clickTile.length; i++){
        const tileInfo = nowTurnTile.findIndex((e) => {
            return e.id == clickTile[i].id;
        });
        const mainTile = mainBoardTile.findIndex((e) => {
            return e.id == clickTile[i].id;
        });
        if(tileInfo == -1) continue;
        document.getElementById(clickTile[i].id).remove();
        playerTile.push(clickTile[i]);
        playerTile[playerTile.length - 1].location = 'player';
        playerTile[playerTile.length - 1].set = 'null';
        nowTurnTile.splice(tileInfo, 1);
        mainBoardTile.splice(mainTile, 1);
    }
    player_tile_refresh();
    clickTile.length = 0;
}
// 플레이어 보드 비우고 다시 띄우기 
function player_tile_refresh() {
    playerBoard.innerHTML = '<div class="set-player-board" onclick="set_player_board_click()"><img src="image/set.svg" class="tile-set" id="tile-set"></div>'; // 추가 버튼 먼저 띄우기
    show_player_tile(); // 플레이어 타일 띄우기
}

function goPlay(){
    location.href ='game.html';
}