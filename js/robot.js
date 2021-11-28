function robotTurn() {
    
    const doAddTile = addTileSet();
    console.log("로봇 턴", doAddTile);
    if(doAddTile){
        nowTurnTile.length = 0;
        mainBoardBundleSave();
        show_robot_tile();
        turnEnd();
    }
    else{
        let tile = remainTile.pop();
        let tile2;
        if(tile.number == '0') {
            console.log("로봇이 먹을 타일이 조커임!!!")
            tile2 = remainTile.pop();
            remainTile.push(tile);
            tile = tile2;
        }
        robotTile.push(tile);
        robotTile[robotTile.length - 1].location = "robot";
        remainingTile();
        show_robot_tile();
        turnEnd();
    }
}
let robotENR = false;
//추가 가능한 타일 묶음이 있는지 
function addTileSet() {
    const is789 = addTileSet789();
    if (is789) {
        mainBoardaddTile();
        return true;
    } else {
        const is777 = addTileSet777();
        if (is777) {
            mainBoardaddTile();
            return true;
        } else if(robotENR){
            const doApppend = appendTile();
            if(doApppend) return true;
            else return false;
        }
    }
}
const robotAddTile = [];
// 123 등록 가능한지
function addTileSet789() {
    const tile = robotTile.slice();
    //fake tile
    tile.push({
        "id": `5500`,
        "path": `500`,
        "number": `0`,
        "color": `5`,
        "location": 'null',
        "set": 'null'
    })
    tile_r_to_b(tile);
    // console.log(robotTile);
    let color = 1;
    // 색깔 정렬 후 색깔 안에서 또 정렬하기
    const colorTile = [];
    for (let i = 0; i < tile.length; i++) {
        console.log("color ", color);
        if (color == 5) break;
        if (tile[i].color == color) {
            colorTile.push(tile[i]);
        } else {
            tile_a_to_z(colorTile);
            //console.log(colorTile)
            if (colorTile.length < 2) {
                colorTile.length = 0;
                robotAddTile.length = 0;
                color++;
                i--;
                continue;
            }
            for (let j = 0; j < colorTile.length - 2; j++) {
                robotAddTile.push(colorTile[j]);
                let k = 1;
                for (let z = j + 1; z < colorTile.length; z++) {
                    if ((Number)(colorTile[j].number) + k == colorTile[z].number) {
                        robotAddTile.push(colorTile[z]);
                        k++;
                    } else {
                        break;
                    }
                }
                if (robotAddTile.length >= 3) break;
                else {
                    robotAddTile.length = 0;
                    continue;
                }
            }
            if (robotAddTile.length == 0) {
                colorTile.length = 0;
                robotAddTile.length = 0;
                color++;
                i--;
                continue;
            }else if(!robotENR && robotAddTile.length >= 3){
                let sum = 0;
                for(let i = 0; i < robotAddTile.length; i++){
                    sum += (Number)(robotAddTile[i].number);
                }
                console.log("sum : ", sum);
                if(sum >= 30) {
                    robotENR = true;
                    break;
                }
                else {
                    console.log("robot : 타일의 합이 30 미만이라 등록할 수 없습니다");
                    colorTile.length = 0;
                    robotAddTile.length = 0;
                    color++;
                    i--;
                    continue;
                }
            } else if (robotAddTile.length >= 3) break;
            
            colorTile.length = 0;
            robotAddTile.length = 0;
            color++;
            i--;
        }
    }
    if (robotAddTile.length >= 3) return true;
    else return false;
}
//연속된 숫자의 타일 묶음이 있는지
function addTileSet777() {
    const tile = robotTile.slice();
    tile_a_to_z(tile);
    console.log(tile);
    const numTile = [];
    let number = 1;
    for (let i = 0; i < tile.length; i++) {
        console.log("number : ", number);
        if (tile[i].number == number) {
            numTile.push(tile[i]);
        } else if (numTile.length >= 3 && number < 14) {
            let colors = [];
            robotAddTile.push(numTile[0]);
            colors.push(numTile[0].color);
            for (let j = 1; j < numTile.length; j++) {
                if (colors.includes(numTile[j].color)) {
                    continue;
                } else {
                    colors.push(numTile[j].color);
                    robotAddTile.push(numTile[j]);
                }
            }
            if (robotAddTile.length < 3) {
                robotAddTile.length = 0;
                numTile.length = 0;
                number++;
            } else if(!robotENR){
                let sum = 0;
                for(let i = 0; i < robotAddTile.length; i++){
                    sum += (Number)(robotAddTile[i].number);
                }
                console.log("sum : ", sum);
                if(sum >= 30) {
                    robotENR = true;
                    return true;
                }
                else {
                    robotAddTile.length = 0;
                    numTile.length = 0;
                    number++;
                    console.log("robot : 타일의 합이 30 미만이라 등록할 수 없습니다");
                }
            }
            else {
                console.log(robotAddTile);
                return true;
            }

        } else {
            numTile.length = 0;
            i--;
            if(number == 13) return false;
            number++;
        }
    }
}
    
//메인 보드 타일 탐색 후 붙일 타일 있는지 확인
function appendTile() {
    if (mainBoardTile.length == 0) return;
    const tile = mainBoardTile.slice();
    console.log(tile);
    console.log(tile.length);
    tile.sort((a, b) => a.set - b.set);
    console.log("정렬 타일 ", tile);
    //faker tile
    tile.push({
        "id": `5500`,
        "path": `500`,
        "number": `0`,
        "color": `5`,
        "location": 'null',
        "set": 'null'
    })
    //console.log(tile);
    const setTile = [];
    //const bundle = 'bundle';
    const lastbundleNum = (Number)(tile[tile.length - 2].set) + 1;
    console.log(lastbundleNum);
    let cnt = 0;
    const isColor = [];
    for (let i = 0; i < tile.length; i++) {
        console.log(cnt);
        if (tile[i].set == cnt) {
            setTile.push(tile[i]);
            isColor.push(tile[i].color);
        } else {
            if (cnt < lastbundleNum) {
                console.log("비교 시작");
                setTile.sort((a, b) => a.number - b.number);
                // 777인 경우
                if (setTile.length == 0) {
                    console.log("타일 수 부족");
                    setTile.length = 0;
                    isColor.length = 0;
                    cnt++;
                    i--;
                    continue;
                }
                if (setTile[0].number == setTile[1].number) {
                    console.log("같은 타일 색 묶음");
                    const hasTileNum = robotTile.some((e) => {
                        return e.number == setTile[0].number;
                    });
                    if (hasTileNum) {
                        console.log("777 가능");
                        let thisColor;
                        let whatColor;
                        for (let c = 1; c <= 4; c++) {
                            console.log(isColor);
                            whatColor = isColor.some((e) => {
                                return e == c;
                            });
                            console.log(whatColor);
                            if (!whatColor) {
                                thisColor = c;
                                console.log("필요한 타일의 색깔은 ", thisColor);
                                break;
                            }
                        }
                        const hasTileColor = robotTile.findIndex((e) => {
                            return e.color == thisColor && e.number == setTile[0].number;
                        });
                        console.log("hasTileColor", hasTileColor);
                        if (hasTileColor != -1) {
                            const divId =  cnt;
                            // const div = document.getElementById(divId);
                            robotAddTile.push(robotTile[hasTileColor]);
                            main_board_set_click(divId, robotAddTile);
                            console.log("붙일 타일 있어 함수 종료");
                            return true;
                        }

                    }
                }
                // 789인 경우
                else if (setTile[0].color == setTile[1].color) {
                    console.log("연속된 숫자 묶음");
                    let minNum = (Number)(setTile[0].number) - 1;
                    let maxNum = (Number)(setTile[setTile.length - 1].number) + 1;
                    let hasMinNum = robotTile.findIndex((e) => {
                        return e.color == setTile[0].color && e.number == minNum;
                    });
                    let hasMaxNum = robotTile.findIndex((e) => {
                        return e.color == setTile[0].color && e.number == maxNum;
                    });
                    console.log("hasMaxNum", hasMaxNum);
                    console.log("hasMinNum", hasMinNum);
                    if (hasMaxNum != -1) {
                        console.log("세트의 붙일 값 존재 - hasMaxNum");
                        const divId = cnt;
                        // const div = document.getElementById(divId);
                        robotAddTile.push(robotTile[hasMaxNum]);
                        main_board_set_click(divId, robotAddTile);
                        return true;
                    } else if (hasMinNum != -1) {
                        console.log("세트의 붙일 값 존재 - hasMinNum");
                        const divId = cnt;
                        // const div = document.getElementById(divId);
                        robotAddTile.push(robotTile[hasMinNum]);
                        main_board_set_click(divId, robotAddTile);
                        return true;
                    }
                }
                setTile.length = 0;
                isColor.length = 0;
                cnt++;
                i--;
            }
        }
    }
    console.log("robotAddTile", robotAddTile);
    console.log("붙일 타일 없어 함수 종료");
    return false;
}
//메인 보드에 타일 붙이기
function mainBoardaddTile() {
    set_board_click(robotAddTile);
}
function show_robot_tile() {
    document.querySelector('.robot-board').innerHTML = '';
    for (let i = 0; i < robotTile.length; i++) {
        let div = document.createElement("div");
        div.innerHTML += '<img src="image/back.svg" class="tile player-tile no-drag">';
        document.querySelector('.robot-board').appendChild(div);
    }
}