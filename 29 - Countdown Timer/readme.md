# Day 29 - Countdown Timer

## [DEMO](https://ayating.github.io/JavaScript30/29%20-%20Countdown%20Timer/index.html)

## 目標

製作一個倒數計時器。

## 步驟要點

1. 取得元素
2. 設置計時器及監聽事件
3. 實作倒數計時功能
4. 處理自定義時間輸入
5. 顯示結束時間

## 學習筆記

1. 計時器基本設置

   範例的 HTML 中已設置好各按鈕的時間，透過`dataset`來取出資料（string），再將資料轉成數字，最後再利用 `Date.now()`來取得當下的時間，並搭配`setInterval()`來建立計時器。

```html
<button data-time="20" class="timer__button">20 Secs</button>
<button data-time="300" class="timer__button">Work 5</button>
<button data-time="900" class="timer__button">Quick 15</button>
<button data-time="1200" class="timer__button">Snack 20</button>
<button data-time="3600" class="timer__button">Lunch Break</button>
```

```js
let timer;

const setTimer = function () {
  const sec = parseInt(this.dataset.time);
  startTimer(sec);
};
```

2. 如何實現倒數功能？

   先取得當下時間以及結束時間後，計算出剩餘的秒數，剩餘時間小於 0 時會停止計時器。

```js
const startTimer = function (sec) {
  clearInterval(timer); // 清除舊計時器
  const now = Date.now();
  const end = now + sec * 1000;
  setCountDown(end);
};

const setCountDown = function (end) {
  timer = setInterval(function () {
    const secLeft = Math.floor((end - Date.now()) / 1000);
    if (secLeft >= 0) {
      // 時間顯示的邏輯（略）
    } else {
      clearInterval(timer);
    }
  }, 16);
};
```

3. 如何處理自定義時間？

   取得控制元素之後，設定監聽`submit`事件，並設置`e.preventDefault()`來防止頁面刷新，取得使用者輸入的資料後，透過判斷式來過濾不合格的資訊，例如：使用者輸入 aaa，value 會得到 NaN，放入判斷式之後就會被過濾掉，無法啟動計時器。

```js
document.querySelector("#custom").addEventListener("submit", function (e) {
  e.preventDefault();
  const value = this.minutes.value * 60;
  // 避免使用者亂輸入
  if (value) {
    startTimer(value);
    this.reset();
  }
});
```
