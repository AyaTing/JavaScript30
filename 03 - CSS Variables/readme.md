# Day 3 - CSS Variables

## 目標

藉由橫桿調整圖片清晰度及邊框的粗細度、選取色彩改變邊框和標題 JS 文字的顏色。

## 步驟要點

1. 設定 CSS 變數
2. 取得所有控制元素、監聽變化
3. 控制元素、改變 CSS 樣式

## 學習筆記

1. CSS 變數的寫法

```
:root {
    --base: #ffc600;
    --spacing: 10px;
    --blur: 10px;
}

img {
    padding: var(--spacing);
    background-color: var(--base);
    filter: blur(var(--blur));
}

.hl {
    color: var(--base);
}
```

2. 如何監聽變化？

若只設定監聽`change`事件，在滑桿位移途中畫面並不會跟著改變，因此需追加設定監聽`mousemove`事件。

- change：確定數值改變時會被偵測到
- mousemove：在鼠標位移時會被偵測到

```
// 取得所有元素
const inputs = document.querySelectorAll('.controls input');

// 設定監聽
inputs.forEach((input) => {
    input.addEventListener("change", changeHandler);
});
inputs.forEach((input) =>{
    input.addEventListener("mousemove", changeHandler)
});
```

3.  改變屬性時須留意單位問題

部分屬性只單純改變數值、沒有輸入單位，會無法使用，為了確保在調整屬性值時能正確應用像素（px）等單位，需要根據情況動態添加單位。

```
// 有單位
<label for="blur">Blur:</label>
<input
    id="blur"
    type="range"
    name="blur"
    min="0"
    max="25"
    value="10"
    data-sizing="px"
/>

// 沒有單位
<label for="base">Base Color</label>
<input id="base" type="color" name="base" value="#ffc600" />

```

- 使用 dataset 取出樣式對象的`data-*`屬性。

```
const unit = this.dataset.sizing || "";
```

- 其他寫法（三元運算子）

```
const unit = this.name === "base" ? "" : "px"
```

4.  如何改變樣式？

取得根元素

- document.documentElement
- document.querySelector("html")
- document.querySelector(":root")

利用`setProperty()`可以賦值給相對應的 CSS 變數，進而達到畫面改變樣式的效果。

```
setProperty(propertyName, value)
```

```
document.documentElement.style.setProperty(
`--${this.name}`,
this.value + unit
)
```
