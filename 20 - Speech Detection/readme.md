# Day 20 - Speech Detection

## [DEMO](https://ayating.github.io/JavaScript30/20%20-%20Speech%20Detection/index-done.html)

## 目標

使用 SpeechRecognition API 來監聽使用者語音，將語音轉為文字並即時顯示在畫面上。

## 步驟要點

1. 初始化 SpeechRecognition 並設定屬性（語言、是否即時輸出）
2. 處理語音輸入資料
3. 設定更新畫面
4. 設定循環監聽

## 學習筆記

1. SpeechRecognition API 的設定

```js
// 初始化
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
// 設定是否即時辨識結果
recognition.interimResults = true;
// 設定語言
recognition.lang = "zh-TW";
```

2. 如何處理語音輸入的資料？

   使用`recognition.addEventListener('result', callback)`來處理語音輸入結果，將語音轉換成文字，並根據使用者的語音輸入來即時更新畫面。

   `result`事件回傳的是類似陣列的物件`SpeechRecognitionResultList`，需將其轉換為真正的陣列，以便能使用`map`方法進行處理。

```js
recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  p.textContent = transcript;
  // 每當語音辨識輸入完成並生成最終結果，會將內容渲染到畫面
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
});
```

3. 其他補充

- 循環監聽設置：當語音辨識結束後，會自動重新啟動監聽，以便持續捕捉語音輸入。

```js
recognition.addEventListener("end", recognition.start);
```

- 可以使用`replace`和`正則表達式`來替換詞彙。

```js
const changeScript = transcript.replace(/哈囉|嗨|你好|妳好/gi, "👋");
p.textContent = changeScript;
```

- 使用`SpeechRecognition API`時，瀏覽器會向使用者請求麥克風的使用權限。如果使用者拒絕授權，則語音辨識功能無法運作。
