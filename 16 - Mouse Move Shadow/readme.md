# Day 16 - Mouse Move Shadow

## [DEMO](https://ayating.github.io/JavaScript30/16%20-%20Mouse%20Move%20Shadow/index-done.html)

## 目標

透過滑鼠移動，動態改變文字的陰影效果。

## 步驟要點

1. 取得元素並設置滑鼠移動事件監聽器
2. 計算滑鼠在元素中的相對位置
3. 動態調整文字陰影並將相對位置轉換成陰影效果

## 學習筆記

- offsetWidth：表示元素的**完整寬度**，包含內邊距（padding）與邊框（border），不包括外邊距（margin）。
- offsetHeight：表示元素的**完整高度**，同樣包括內邊距與邊框。

- offsetX 與 offsetY：是滑鼠指標相對於**當前事件觸發目標**（即 `e.target`）的座標值。

- offsetLeft：元素**相對於其父元素**（容器）的**左側偏移量**，即該元素的左邊界相對於其最近的定位父元素的水平位移。
- offsetTop：元素**相對於其父元素**的**上方偏移量**，即該元素的上邊界相對於其最近的定位父元素的垂直位移。

在範例中，當事件觸發目標（`e.target`）不是當前元素（`this`）時，將當前的 `x` 和 `y` 加上目標元素（`e.target`）的 `offsetLeft` 和 `offsetTop`，這樣可以確保滑鼠位置是相對於 `hero` 元素（而不是 `e.target`）進行計算。

```js
if (this !== e.target) {
  x = x + e.target.offsetLeft;
  y = y + e.target.offsetTop;
}
```
