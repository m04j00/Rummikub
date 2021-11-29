// 게임 종료
function whoseWin() {
    if(playerTile.length == 0) {
        return 1;
    }
    else if(robotTile.length == 0) {
        return 2;
    }
    else {
        return 0;
    }
}

function popup(whose){
    comment_game_end();
    const popup = document.querySelector('.modal');
    const title = document.querySelector('.popup-title');
    const player_score = document.getElementById('me_score');
    const robot_score = document.getElementById('robot_score');
    const player_win = document.getElementById('me_win');
    const robot_win = document.getElementById('robot_win');

    popup.classList.add('show-modal');
    let failSum = 0;
    if(whose == 'player'){
        failSum = funFailSum(robotTile);
        player_score.textContent = '0';
        robot_score.textContent = `-${failSum}`;
        player_win.textContent = '승';
        robot_win.textContent = '패';
        player_win.classList.add('paleyr-win');
        robot_win.classList.add('player-fail');        
    }
    else{
        title.textContent = '패배';
        failSum = funFailSum(playerTile);
        player_score.textContent = `-${failSum}`;
        robot_score.textContent = '0';
        player_win.textContent = '패';
        robot_win.textContent = '승';
        robot_win.classList.add('paleyr-win');
        player_win.classList.add('player-fail');       
    }
}
function funFailSum(tile){
    let failSum = 0;
    for(let i = 0; i < tile.length; i++){
        failSum += (Number)(tile[i].number);
    }
    return failSum;
}