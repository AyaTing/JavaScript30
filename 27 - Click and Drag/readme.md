# Day 27 - Click and Drag

## [DEMO](https://ayating.github.io/JavaScript30/27%20-%20Click%20and%20Drag/index-done.html)

## 目標

完成拖曳卷軸的功能。

## 步驟要點

1. 取得元素、設定監聽
2. 設定拖曳控制
3. 取得初始位置
4. 計算移動距離、渲染畫面

## 學習筆記

1. 思考方向

從拖曳功能如何操作去思考實現功能的方向，一開始需要`mousedown`、拖曳過程需要`mousemove`、結束會觸發`mouseup`或`mouseleave`，接著設定監聽、思考各事件所觸及的功能，進一步加以實現。

2. 初始位置計算

`pageX`雖然能取得滑鼠點在畫面的水平位置，但卷軸移動時會涉及卷軸外左邊空間的壓縮，卷軸實際移動 50px 時，因為卷軸外左邊空間的壓縮，`pageX`實際上的移動卻小於 50px，進而造成誤差，因此需要先扣除卷軸外左邊空間（即 slider.offsetLeft），才能準確定位初始點及下一個移動點。

```js
startX = e.pageX - slider.offsetLeft;
```

3. 移動距離的計算

拖曳功能可以用兩種方法去實現，第一種是用接力的方式將每次的移動終點設為每次的初始點，第二種方式是紀錄每次移動的距離，以下以第二種做法去實現：

```js
let scrollLeft;

function startDrag(e) {
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
}

function handleDrag(e) {
  const move = (e.pageX - slider.offsetLeft - startX) * 4; // 調整移動速率，提升流暢感
  slider.scrollLeft = scrollLeft - move;
}
```

4. CSS 屬性

- `white-space: nowrap`：能夠讓水平佈局的元素不會自動換行，適合用在水平滾動效果上，像是圖片輪播或拖曳效果。

- `user-select: none`：用來防止使用者在拖曳時不小心選取到頁面上的文字或元素，可以讓操作更加順暢。

- `will-change: transform`：提前告知瀏覽器某個元素即將進行的改變，可以讓動畫或變換更加流暢。

- `perspective: 500px`：這個屬性能給元素創造出 3D 深度的效果，特別是在使用 3D 變形屬性（如 rotateY）時搭配使用，可以讓畫面看起來更具空間感。

5. 其他補充

- 觸控滑動：在手機和平板上，應加入觸控事件（如 touchstart、touchmove 和 touchend）以支持觸控操作。

- 如果卷軸上有連結時，會影響拖曳，除了設置`e.preventDefault()`之外，可以藉由監控卷軸是否移動來判斷連結是否可以點擊。
