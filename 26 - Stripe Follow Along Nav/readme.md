# Day 26 - Stripe Follow Along Nav

## [DEMO](https://ayating.github.io/JavaScript30/26%20-%20Stripe%20Follow%20Along%20Nav/index-done.html)

## 目標

實現當滑鼠指標移動到導覽列的項目上時，會出現一個對應的展開選單（對話框）及相關文字，並根據導覽列的位置動態調整展開選單的範圍及位置。

## 步驟要點

1. 取得元素
2. 設定監聽事件
3. 計算及設置展開選單的位置與大小
4. 設定顯示效果的時機

## 學習筆記

1. 顯示效果的時機設定

   使用`setTimeout`來管理 class 狀態以控制動畫順序，防止快速移動滑鼠時造成的動畫錯亂。

- 寫法一：

```js
function handleEnter() {
  this.classList.add("trigger-enter");
  setTimeout(() => {
    if (this.classList.contains("trigger-enter")) {
      this.classList.add("trigger-enter-active");
    }
  }, 100);
}
```

- 寫法二

```js
setTimeout(
  () =>
    this.classList.contains("trigger-enter") &&
    this.classList.add("trigger-enter-active"),
  150
);
```

2. 計算及設置展開選單的位置與大小

   透過`getBoundingClientRect()`來取得元素的大小及其相對於視窗的位置，計算相對位置時要減去導航列的位置，以確保展開選單相對於導航列的定位正確。
   也可以使用`transform`替代直接修改`top/left`。

```js
const rect = dropdown.getBoundingClientRect();
const navRect = nav.getBoundingClientRect();
dropdownBackground.style.width = `${rect.width}px`;
dropdownBackground.style.height = `${rect.height}px`;
dropdownBackground.style.top = `${rect.top - navRect.top}px`;
dropdownBackground.style.left = `${rect.left - navRect.left}px`;
```
