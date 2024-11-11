# Day 30 - Whack A Mole

## [DEMO](https://ayating.github.io/JavaScript30/30%20-%20Whack%20A%20Mole/index-done.html)

## 目標

完成打地鼠遊戲。

## 步驟要點

1. 取得元素
2. 設置地鼠隨機出現的計算邏輯
3. 實現畫面渲染
4. 設定遊戲啟動初始化及結束提醒
5. 設置事件監聽及計分系統

## 學習筆記

1. 如何設置隨機邏輯？

   將地鼠出現時間設定在指定範圍內（max ～ min 之間），再搭配`Math.random()`來設定隨機時間及隨機出現的洞穴，為了避免地鼠連續從同一個洞穴裡出來，另外用判斷式處理。

```js
function randTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  // 避免連續隨機出一樣的結果
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}
```

2. 如何設置計分系統？

   透過偵測`e.isTrusted`的值（布林值）來判斷事件是否真正由使用者觸發，若值為 false 會直接跳出函數，以避免非使用者觸發的事件影響遊戲結果（程式自動點擊等）。

```js
function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  scoreBoard.textContent = score;
  this.parentNode.classList.remove("up"); //避免玩家重複點擊同一隻地鼠來得分
}
moles.forEach((mole) => mole.addEventListener("click", bonk));
```

3. 補充作法（運用 Proxy）

   透過 Proxy 來控制地鼠出現的狀態，並在地鼠的狀態改變時能自動控制其顯示和觸發事件監聽。亦能夠透過隔離地鼠的狀態，避免玩家作弊（若需完全防止，仍須設置`isTrusted`的判斷或其他驗證方式）。

   - Proxy 的 get 方法：攔截屬性的讀取操作。
   - Proxy 的 set 方法：攔截屬性的賦值操作。

```js
const status = moles.reduce((prev, current, index) => {
  prev[index] = false;
  return prev;
}, {});

const molesProxy = new Proxy(status, {
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;
    moles[key].removeEventListener("click", bonk);
    if (value) {
      moles[key].addEventListener("click", bonk);
      moles[key].classList.add("up");
    } else {
      moles[key].classList.remove("up");
    }
  },
});

const bonk = function () {
  if (molesProxy[moles.indexOf(this)]) {
    setScore(score + 1);
    molesProxy[moles.indexOf(this)] = false;
  }
};
```
