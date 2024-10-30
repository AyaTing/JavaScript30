# Day 25 - Event Capture, Propagation, Bubbling and Once

## [DEMO](https://ayating.github.io/JavaScript30/25%20-%20Event%20Capture,%20Propagation,%20Bubbling%20and%20Once/index-done.html)

## 目標

了解 JavaScript 中的事件機制，事件的捕獲、傳遞和冒泡的過程以及如何實現事件的單次執行。

## 學習筆記

1. addEventListener 的用法

- addEventListener(type, listener, useCapture)：可以設置事件的監聽，它共有三個參數。

  - 第一個參數是事件對象的事件種類。
  - 第二個參數是當指定事件被觸發時會接收通知的物件，可以是 null、handleEvent() 方法或 function。
  - 第三個參數可以設定事件的特性（可省略），可以是一個布林值或一個包含多個屬性的物件，例如：{ capture: false, once: true, passive: true }。

- DOM 事件有兩種傳播方法，可以由設定 addEventListener 的第三個參數 capture 來控制。

  - 當 capture: true 時，為事件捕獲模式 (Capture) 表示事件從最外層元素依序傳遞至目標元素的過程 。
  - 當 capture: false 時，為事件冒泡模式 (Bubbling)表示事件從目標元素依序向外層傳遞，這是事件傳遞的預設模式 。

- once：同樣為 addEventListener 的第三個參數，預設為 false，當設定為 true 時，可以確保事件只被觸發一次，就不會再觸發了。

```js
function logoText(e) {
  console.log(this.classList.value);
  e.stopPropagation();
}

divs.forEach((div) =>
  div.addEventListener("click", logoText, { capture: false, once: true })
);

button.addEventListener(
  "click",
  () => {
    console.log("Click!!!");
  },
  { once: true }
);
```

2. 其他補充

- e.stopPropagation：可以阻止事件從當前目標往外層傳遞，因此可以阻止事件向上冒泡，防止事件在多層巢狀結構中傳遞。

```js
function logoText(e) {
  console.log(this.classList.value);
  e.stopPropagation();
}
```

- e.composedPath()：獲取事件從目標元素傳遞至根元素的所有 DOM 節點的陣列

- href="#"：用來防止`<a>`跳轉的方式，但會觸發頁面跳回至頂部。

- 事件綁定：將事件直接綁定到特定的 DOM 元素上，適合單一元素的事件管理。

- 事件委派：透過父元素管理多個相同類型的子元素事件。適合鍵盤或滑鼠的常見事件，但不適用於需要頻繁監測的 mousemove 或無氣泡事件（如 focus、blur）。

- 滑鼠事件：

  - mouseover：滑鼠移至元素或其子元素上時觸發，會冒泡。
  - mouseout：滑鼠離開元素或其子元素時觸發，會冒泡。
  - mouseenter：滑鼠進入元素時觸發，不會冒泡。
  - mouseleave：滑鼠離開元素時觸發，不會冒泡。

  mouseenter 和 mouseleave 更適合用於偵測滑鼠進入或離開特定區域的事件處理。

- target：實際觸發事件的最深層元素。

- currenttarget：綁定事件的元素，在事件委派中則是實際綁定事件的父元素。
