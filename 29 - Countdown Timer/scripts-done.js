let timer;
const buttons = document.querySelectorAll(".timer__button");
const timeLeft = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");

const setTimer = function () {
  const sec = parseInt(this.dataset.time); // dataset直接取出的資料類型是string
  startTimer(sec);
};

const startTimer = function (sec) {
  clearInterval(timer);
  const now = Date.now();
  const end = now + sec * 1000; // now單位為毫秒
  // 倒數計時
  setCountDown(end);
  // 顯示最後時間
  showEndTime(end);
};
const setCountDown = function (end) {
  timer = setInterval(function () {
    const secLeft = Math.floor((end - Date.now()) / 1000);
    if (secLeft >= 0) {
      const displayMin = Math.floor(secLeft / 60);
      const displaySec = secLeft % 60;
      const display = `${displayMin < 10 ? "0" + displayMin : displayMin}:${
        displaySec < 10 ? "0" + displaySec : displaySec
      }`;
      document.title = display;
      timeLeft.textContent = display;
    } else {
      clearInterval(timer);
    }
  }, 16);
};

const showEndTime = function (end) {
  const endDate = new Date(end);
  let hour = endDate.getHours();
  let min = endDate.getMinutes();
  endTime.textContent = `Be Back At ${hour < 10 ? "0" + hour : hour}:${
    min < 10 ? "0" + min : min
  }`;
};

buttons.forEach((button) => button.addEventListener("click", setTimer));

document.querySelector("#custom").addEventListener("submit", function (e) {
  e.preventDefault();
  const value = this.minutes.value * 60;
  // 避免使用者亂輸入
  if (value) {
    startTimer(value);
    this.reset();
  }
});
