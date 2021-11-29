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
    const score = calculateScore(whose);
    
    const popup = document.querySelector('.modal');
    const title = document.querySelector('.popup-title');
    const player_score = document.getElementById('me_score');
    const robot_score = document.getElementById('robot_score');
    const player_win = document.getElementById('me_win');
    const robot_win = document.getElementById('robot_win');

    popup.classList.add('show-modal');

    if(score[2] == 'player'){
        player_score.textContent = `${score[0]}`;
        robot_score.textContent = `-${score[1]}`;
        player_win.textContent = '승';
        robot_win.textContent = '패';
        player_win.classList.add('paleyr-win');
        robot_win.classList.add('player-fail');        
    }
    else{
        title.textContent = '패배';
        player_score.textContent = `${score[0]}`;
        robot_score.textContent = `-${score[1]}`;
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
function calculateScore(whose){
    let score = [];
    if(whose == 'player'){
        score.push(0);
        score.push(funFailSum(robotTile));
        score.push(whose);
    }else if(whose == 'robot'){
        score.push(funFailSum(playerTile));
        score.push(0);
        score.push(whose);
    }else{
        score.push(funFailSum(playerTile));
        score.push(funFailSum(robotTile));
        let whoseWin = score[0] < score[1] ? 'player' : 'robot';
        if(whoseWin == 'player'){
            score[1] = (Number)(score[1]) - (Number)(score[0]);
        }else{
            score[0] = (Number)(score[0]) - (Number)(score[1]);
        }
        score.push(whoseWin);
    }
    return score;

}
function goMain(){ location.href ='main.html'; }
function restart(){ location.reload(); }