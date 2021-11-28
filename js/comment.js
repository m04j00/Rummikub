const div = document.getElementById('comment');

function comment_player_turn(){
    div.textContent = `당신의 차례입니다. 타일을 옮겨주세요.`;
    div.className = 'player-turn';
}

function comment_robot_turn(){
    div.textContent = `로봇의 차례입니다.`;
    div.className = 'robot-turn';
}

function comment_false_ENR(){
    div.textContent = `[등록 불가] 타일의 합이 30 이상이어야 합니다.`;
    div.className = 'error';
}
function comment_false_add(){
    div.textContent = `[조건 불일치] 조건과 일치하지 않는 타일묶음이 있습니다.`;
    div.className = 'error';
}
function comment_time_out(){
    div.textContent = `주어진 시간을 모두 소비하였습니다.`;
    div.className = 'error';
}