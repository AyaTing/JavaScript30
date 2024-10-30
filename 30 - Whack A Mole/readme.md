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
