function robotTurn() {

}

//추가 가능한 타일 묶음이 있는지 
function addTileSet() {
    const is789 = addTileSet789();
    if(is789){
        mainBoardaddTile();
    }else{
        const is777 = addTileSet777();
        if(is777) mainBoardaddTile();
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
    for(let i = 0; i < tile.length; i++){
        console.log("color ", color);
        if(color == 5) break;
        if(tile[i].color == color) {
            colorTile.push(tile[i]);
        }
        else {
            tile_a_to_z(colorTile);
            //console.log(colorTile)
            if(colorTile.length < 2) {
                colorTile.length = 0;
                robotAddTile.length = 0;
                color++; 
                i--;
                continue;
            }
            for(let j = 0; j < colorTile.length - 2; j++){
                robotAddTile.push(colorTile[j]);
                let k = 1;
                for(let z = j + 1; z < colorTile.length; z++){
                    if((Number)(colorTile[j].number) + k == colorTile[z].number){
                        robotAddTile.push(colorTile[z]);
                        k++;
                    } else {
                        break;
                    }
                }
                if(robotAddTile.length >= 3) break;
                else {
                    robotAddTile.length = 0;
                    continue;
                }
            }
            if(robotAddTile.length == 0) {
                colorTile.length = 0;
                robotAddTile.length = 0;
                color++; 
                i--;
                continue;
            }
            else if(robotAddTile.length >= 3) break;
            
            colorTile.length = 0;
            robotAddTile.length = 0;
            color++; 
            i--;
        }
    }
    if(robotAddTile.length >= 3) return true;
    else return false;
}
//연속된 숫자의 타일 묶음이 있는지
function addTileSet777(){
    const tile = robotTile.slice();
    tile_a_to_z(tile);
    console.log(tile);
    const numTile = [];
    let number = 1;
    for(let i = 0; i < tile.length; i++){
        console.log("number : ", number);
        if(tile[i].number == number) {
            numTile.push(tile[i]);
        }
        else if(numTile.length >= 3){
            let colors = [];
            robotAddTile.push(numTile[0]);
            colors.push(numTile[0].color);
            for(let j = 1; j < numTile.length; j++){
                if (colors.includes(numTile[j].color)) {
                    continue;
                }
                else {
                    colors.push(numTile[j].color);
                    robotAddTile.push(numTile[j]);
                }
            }
            if(robotAddTile.length < 3){
                robotAddTile.length = 0;
                numTile.length = 0;
                number++;
            }
            else{
                console.log(robotAddTile);
                return true;
            }

        }
        else{
            numTile.length = 0;
            i--;
            number++;
        }
    }
}

//메인 보드에 타일 붙이기
function mainBoardaddTile(){
    set_board_click(robotAddTile);
}