# Day 5 - Flex Panel Gallery

## [DEMO](https://ayating.github.io/JavaScript30/05%20-%20Flex%20Panel%20Gallery/index-done.html)

## 目標

完成點擊畫面觸動文字位移及畫面大小變化的效果。

## 步驟要點

1. 調整畫面配置
2. 加上動畫效果設定
3. 取得所有控制元素、監聽變化
4. 控制元素、改變 CSS 樣式

## 學習筆記

1. flex 屬性設定

- flex-grow：如果容器有多餘空間時，子元素如何延展，預設值為 0。
- flex-shrink：如果容器空間不足時，子元素如何壓縮，預設值為 1。
- flex-basis：定義子元素的初始大小，預設值為 auto（使用元素本身的大小）。

```css
/* 寫法：flex: flex-grow flex-shrink flex-basis */
flex: 1 0 auto;
```

2. 如何設定位移效果？

   使用`transform: translateY()`來實現垂直方向的位移效果，這些設置使得第一個和最後一個子元素在初始狀態下會在畫面外面，當 class 添加`open-active`時，它們會移動到可見位置。

```css
.panel > *:first-child {
  transform: translateY(-100%);
}
/* 選擇 class 為 'panel' 的元素的第一個直接子元素，無論這個子元素是什麼類型。 */
.panel.open-active > *:first-child {
  transform: translateY(0%);
}
.panel > *:last-child {
  transform: translateY(100%);
}
.panel.open-active > *:last-child {
  transform: translateY(0);
}
```

3. 如何加上第二段動畫？

   我們可以藉由監聽第一段動畫結束的`transitionend`事件來觸發第二段動畫，但由於第一段動畫涉及多項屬性改變，如果沒有鎖定單一屬性的話可能會監聽到多次`transitionend`事件，可能導致第二段動畫失效，因此需要加上判斷式。

   作者有提示關於瀏覽器對於 flex 屬性處理名稱可能不同，因此判斷式用的是`includes`方法，判斷是否有包含`flex`。

```js
function transitionedHandler(e) {
  if (e.propertyName.includes("flex")) {
    this.classList.toggle("open-active");
  }
}

panels.forEach((panel) =>
  panel.addEventListener("transitionend", transitionedHandler)
);
```
