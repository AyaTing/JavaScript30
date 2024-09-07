# Day 1 - JavaScript Drum Kit

## 目標

透過鍵盤按鍵觸發相對應音效的播放及畫面按鈕的樣式改變。

## 步驟要點

1. 監聽鍵盤動作
2. 取得對應鍵盤元素，播放音效、改變畫面樣式
3. 移除樣式、還原畫面

## 學習筆記

1. 如何連結畫面及按鈕？

   `<div>`及`<audio>`標籤皆有利用`data-key`去儲存對應的`KeyCode`，當我們觸發`KeyboardEvent`時，便能藉由事件的監聽獲取鍵盤按鍵的`KeyCode`，藉此操作相對應的畫面按鈕。

   ```
   const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
   const dom = document.querySelector(`div[data-key="${e.keyCode}"]`)
   ```

2. 按未有連結音效及畫面按鈕的按鍵會產生錯誤，因此需要新增判斷語句，以避免跳錯問題。以下兩種表述方式：

   - 正面表述

   ```
   if (audio) {
       audio.play();
   }
   ```

   - 反面表述

   ```
   if (!audio) return;
   ```

3. 當音效在播放時，再重複按下按鍵可能會遇到不會觸發任何動作的情況，因此需要在每次觸發音效播放時將當前的播放時間`currentTime`設置為 0。

   ```
   audio.currentTime = 0
   ```

4. 如何移除樣式？

   CSS 轉場結束時會觸發`transitionend`事件，我們可以利用監聽此事件，找到樣式變化結束的按鈕、移除樣式。

   ```
   keys.forEach((key) => key.addEventListener("transitionend", removeTransition))
   ```

   然而因為觸發畫面按鈕變化時，會同時改變多個樣式屬性，造成`transitionend`事件被重複觸發，所以必須加上判斷語句，讓事件只會被觸發一次。

   ```
    if (e.propertyName === "transform") {
        this.classList.remove("playing");
    }
   ```

5. 其他補充

   HTML 中的 `<kbd>` 標籤用來表示鍵盤輸入。
