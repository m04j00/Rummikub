// timer
//1의 자리일 경우 앞에 0 붙이기
function isUnits(num) { return num < 10 ? "0" + num : num; }

function startCountDown(duration, element) {
    let setTime = duration;
    let min = 0, sec = 0;

    let countInterval = setInterval(function () {
        min = parseInt(setTime / 60);
        sec = parseInt(setTime % 60);

        element.textContent = `제한 시간 ${isUnits(min)}:${isUnits(sec)}`;

        setTime--;
        if (setTime < 0) { clearInterval(countInterval);} // 타이머 종료
    }, 1000);
}

function initTime(){
    let min = 1; 
    let sec = 0;
    let duration = min * 60 + sec;

    element = document.querySelector('.time-text');
    element.textContent = `제한 시간 ${isUnits(min)}:${isUnits(sec)}`;

    startCountDown(--duration, element);
}

function remainingTile(tile){ 
    element = document.querySelector('.remaining-tile-text');
    element.textContent = `남은 타일 개수 ${isUnits(tile)}`;
}
window.onload = function () {
    initTime();
};

function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
  
      ctx.fillRect(25, 25, 100, 100);
      ctx.clearRect(45, 45, 60, 60);
      ctx.strokeRect(50, 50, 50, 50);
    }
  }
  