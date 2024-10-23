# Day 24 - Sticky Nav

## [DEMO](https://ayating.github.io/JavaScript30/24%20-%20Sticky%20Nav/index-done.html)

## 目標

實現當頁面滑動時，導覽列能夠固定在頂部，且當導覽列到達頂部時 Logo 會彈出的效果。

## 步驟要點

1. 調整 CSS 設定
2. 取得元素控制及導覽列相對於視窗頂部的位置
3. 設定滾動事件監聽及條件、並渲染畫面

## 學習筆記

1. 如何實現導覽列固定於頂部的效果？

- 作者範例程式是使用`position: fixed`來實現效果，但當導覽列變為固定時，它會從正常的頁面流中脫離，導致下方的內容瞬間向上跳動。因此必須再設定 body 的 paddingTop，其值等於導覽列的高度，當導覽列固定後，原本的位置會被填充，從而避免頁面跳動，`position: fixed`比較適合在完全固定導覽列的情況下使用。

```js
document.body.style.paddingTop = nav.offsetHeight + "px";
```

- 我的作法是使用`position: sticky`來實現效果，就不需要考慮頁面跳動的問題，只需考慮父容器的高度有超過導覽列的高度，進而觸發黏在頂部的效果，再來處理 Logo 在適當時機彈出即可。

```css
nav {
  position: sticky;
}
```
