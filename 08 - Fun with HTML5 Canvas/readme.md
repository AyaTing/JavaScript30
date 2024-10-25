# Day 8 - Fun with HTML5 Canvas

## [DEMO](https://ayating.github.io/JavaScript30/08%20-%20Fun%20with%20HTML5%20Canvas/index-done.html)

## 目標

使用 HTML5 的 Canvas 製作一個能用滑鼠繪圖的畫布，線條顏色會依據 HSL 色環變化，並且線條粗細會在 1 到 100 像素之間變化。

## 步驟要點

1. 畫布設定（canvas 設定）
2. 取得滑鼠事件控制
3. 加入繪圖效果
4. 加入線條變化效果

## 學習筆記

1. 設定滑鼠事件

   我們需要用滑鼠來控制何時開始繪圖，使用`mousedown`偵測滑鼠控制開始繪圖，並利用`mouseup`或`mouseleave`來結束繪圖：

```js
let canvas = document.querySelector("#draw");
let drawing = false;
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
});
canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  //繪圖邏輯
});
canvas.addEventListener("mouseup", (e) => {
  drawing = false;
});
canvas.addEventListener("mouseleave", (e) => {
  drawing = false;
});
```

2. 畫布基本設定

   使用 canvas 的方法`getContext`來取得渲染環境及其繪圖函數，這次我們要製作 2D 繪圖的畫布，故在參數輸入`"2d"`。

```js
let canvas = document.querySelector("#draw");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

3. 如何產生繪圖效果？

   利用兩點連成一線的方式，將滑鼠移動的路徑繪製成線條。

- 線條初始設定

```js
let x = 0,
y = 0;
ctx.lineCap = "round"; // 設定端點圓滑
ctx.lineJoin = "round"; // 設定轉折點圓滑
ctx.strokeStyle = hsl(100%, 100%, 50%); // HSL色環（色相,飽和度,亮度）
ctx.lineWidth = 50; // 設定線條初始粗細

```

- 監聽 mousedown 事件來設定初始點

```js
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  [x, y] = [e.offsetX, e.offsetY]; // 設定初始座標
});
```

- 監聽 mousemove 事件來繪製線條

```js
canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  ctx.beginPath(); // 開始新的路徑
  ctx.moveTo(x, y); // 將畫筆移動到滑鼠位置 (x, y)
  ctx.lineTo(e.offsetX, e.offsetY); // 從畫筆位置 (x, y) 畫一條直線到滑鼠當前的位置（e.offsetX, e.offsetY）。
  ctx.stroke(); // 繪製
  [x, y] = [e.offsetX, e.offsetY]; // 更新起點
});
```

4. 如何加入線條變化效果？

- 顏色變化

  使用 HSL 色彩模型來讓線條顏色隨著繪製過程逐漸改變，每次繪製時增加色相，達到 360 後重置為 0。

```js
let hue = 0;

canvas.addEventListener("mousemove", (e) => {
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  hue = hue < 360 ? hue + 1 : 0;
});
```

- 其他寫法：求餘數的運算，可以使值保持在 0 到 359 的範圍內。
  例如：
  當 hue 是 359 時，加 1 變成 360，360 % 360 = 0，所以 hue 變成 0。
  當 hue 是 120 時，加 1 變成 121，121 % 360 = 121，所以 hue 還是 121。

```js
hue = (hue + 1) % 360;
```

- 線條粗細變化

  設定一個變數來控制遞增遞減的方向，當達到最大或最小值時，反轉變化方向。

```js
let lineWidth = 50;
let lineWidthChange = -1;

canvas.addEventListener("mousemove", (e) => {
  ctx.lineWidth = lineWidth;
  lineWidth = lineWidth + lineWidthChange;
  if (lineWidth >= 100 || lineWidth <= 1) {
    lineWidthChange *= -1;
  }
});
```
