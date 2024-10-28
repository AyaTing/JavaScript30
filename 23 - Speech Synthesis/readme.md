# Day 23 - Speech Synthesis

## [DEMO](https://ayating.github.io/JavaScript30/23%20-%20Speech%20Synthesis/index-done.html)

## 目標

使用 Web Speech API 的語音合成功能來實現能選擇不同的聲音、調整語速和音調，並播放指定的文字的功能。

## 步驟要點

1. 取得元素並初始化語音合成功能
2. 獲取可用聲音並渲染選單
3. 設置能調整語速和音調的功能
4. 實現播放和停止功能

## 學習筆記

1. 語音合成功能

- 使用`SpeechSynthesisUtterance`創建語音對象 msg

```js
const msg = new SpeechSynthesisUtterance();
```

- 使用`speechSynthesis`來控制語音的播放、暫停和停止

```js
speechSynthesis.getVoices(); // 獲取可用的聲音
speechSynthesis.cancel(); // 停止任何正在進行的語音
speechSynthesis.speak(msg); // 開始新的語音
```

2. 設置能調整語速和音調的功能

   作者的寫法很精妙，將兩個參數寫在一個函數中，透過監聽使用者操控 input 的選項，去改變不同選項的參數設定。

```html
<label for="rate">Rate:</label>
<input name="rate" type="range" min="0" max="3" value="1" step="0.1" />
<label for="pitch">Pitch:</label>
<input name="pitch" type="range" min="0" max="2" step="0.1" />
```

```js
function setOption() {
  msg[this.name] = this.value;
}
options.forEach((option) => option.addEventListener("change", setOption));
```

3. 實現播放和停止功能

   透過設定函數的預設值，來操控語音的暫停與播放。

```js
function toggle(startOver = true) {
  // 提供預設值 toggle(startOver = true)
  speechSynthesis.cancel(); // 停止任何正在進行的語音
  if (startOver) {
    speechSynthesis.speak(msg); // 開始新的語音
  }
}
speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", () => toggle(false));
```
