// timer
//1의 자리일 경우 앞에 0 붙이기
function isUnits(num) {
    return num < 10 ? "0" + num : num;
}

function startCountDown(duration, element) {
    let setTime = duration;
    let min = 0,
        sec = 0;

    let countInterval = setInterval(function () {
        min = parseInt(setTime / 60);
        sec = parseInt(setTime % 60);

        element.textContent = `제한 시간 ${isUnits(min)}:${isUnits(sec)}`;

        setTime--;
        if (setTime < 0) {
            clearInterval(countInterval);
        } // 타이머 종료
    }, 1000);
}

function initTime() {
    let min = 1;
    let sec = 0;
    let duration = min * 60 + sec;

    element = document.querySelector('.time-text');
    element.textContent = `제한 시간 ${isUnits(min)}:${isUnits(sec)}`;

    startCountDown(--duration, element);
}

function remainingTile(tile) {
    element = document.querySelector('.remaining-tile-text');
    element.textContent = `남은 타일 개수 ${isUnits(tile)}`;
}
window.onload = function () {
    initTime();
};

// 타일 나눠주기
// playerBoard = document.querySelector('.player-board');
// console.log(playerBoard);
// playerBoard.innerHTML ='<img src="image/1-01.svg" class="tile"><br>';

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
const initTile = [];
const inputTile = () => {
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 13; j++) {
            initTile.push({
                "id": `${i}${tileColor[i]}${j}`,
                "number": `${j}`,
                "color": `${tileColor[i]}`
            })
        }
    }
}
const shuffle = (arr) => {
    arr.sort(() => Math.random() - 0.5);
}
inputTile();
shuffle(initTile);
for(let i = 0; i < 104; i++){console.log(initTile[i])}

playerBoard = document.querySelector('.player-board');
console.log(playerBoard);
playerBoard.innerHTML ='<img src="image/11.png" class="tile"><br>';