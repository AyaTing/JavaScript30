# Day 22 - Follow Along Link Highlighter

## [DEMO](https://ayating.github.io/JavaScript30/22%20-%20Follow%20Along%20Link%20Highlighter/index-done.html)

## 目標

當滑鼠移動到連結上時，會觸發連結的位置產生 Highlight 效果。

## 步驟要點

1. 取得元素區塊位置
2. 設置 Highlight 效果區塊的位置與大小
3. 設定事件監聽
4. RWD 對應

## 學習筆記

1. 如何設置 Highlight 效果區塊的位置與大小？

- 使用`getBoundingClientRect()`能夠取得區塊相對於視窗的位置，但因頁面滑動會改變相對位置，因此計算 Highlight 區塊的位置時，須在另外加上`scrollX`和`scrollY`。

- 使用`transform`來動態設定位移，而非直接賦值給`top`和`left`，使用`transform`的位移是相對於元素自身的位置，不會受到父元素定位方式的影響，因此在需要精確定位的情況下特別有用，反之直接設定`top`和`left`會因父元素位置及`margin`、`padding`等數值改變而有影響。

```js
function setPosition(trigger) {
  // 取得連結位置和尺寸
  const rect = trigger.getBoundingClientRect();
  const scrollTop = window.scrollY || window.pageYOffset;
  const scrollLeft = window.scrollX || window.pageXOffset;
  // 設定highlight效果
  highlight.style.width = `${rect.width}px`;
  highlight.style.height = `${rect.height}px`;
  highlight.style.transform = `translate(${rect.left + scrollLeft}px, ${
    rect.top + scrollTop
  }px)`;
  // 顯示highlight效果
  highlight.style.display = "";
}
```

2. 如何解決當視窗大小改變，Highlight 區塊位置會偏移的問題？

   當視窗大小改變時，需要重新計算連結的位置，確保 Highlight 區塊的位置能正確對齊。透過監聽`resize`事件來動態更新區塊位置。

```js
function resizeHandler() {
  if (currentTrigger) {
    setPosition(currentTrigger);
  }
}

window.addEventListener("resize", resizeHandler);
```
