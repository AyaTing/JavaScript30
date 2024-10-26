# Day 11 - Custom Video Player

## [DEMO](https://ayating.github.io/JavaScript30/11%20-%20Custom%20Video%20Player/)

## 目標

自定義一個影片播放器的面板，面板有調整時間軸、播放速度、控制音量等功能。

## 步驟要點

1. 取得 DOM 元素
2. 加入監聽
3. 放入判斷、根據使用者操作更新播放器狀態

## 學習筆記

- 影片播放及暫停功能：用條件判斷搭配`video[method]`的寫法，來直接操作`video`的屬性。

```js
// 影片切換暫停和播放的功能
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

// 判斷事件狀態切換圖標
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}
```

- 影片快轉及倒轉功能：透過`dataset`取得秒數並利用`parseInt`將字串轉成數字，讓`currentTime`能夠加減秒數。

```html
<button data-skip="-10" class="player__button skip">« 10s</button>
<button data-skip="25" class="player__button skip">25s »</button>
```

```js
function skip(e) {
  video.currentTime += parseInt(this.dataset.skip);
}
```

- 控制影片音量及播放速度：透過監聽`input`標籤的變化，使用`this.name`來取得對應的屬性名稱並更新影片的音量和播放速度。

```html
<input
  type="range"
  name="volume"
  class="player__slider"
  min="0"
  max="1"
  step="0.05"
  value="1"
/>
<input
  type="range"
  name="playbackRate"
  class="player__slider"
  min="0.5"
  max="2"
  step="0.1"
  value="1"
/>
```

```js
function handleRangeUpdate() {
  video[this.name] = this.value;
}
```

- 調整影片時間軸

  計算當下播放時間與影片總長的比例，並更新進度條的寬度。

```js
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
```

根據滑鼠在進度條中的 x 軸位置，計算相應的播放時間並更新 `currentTime`。

```js
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
```

為了避免在未按下滑鼠的情況下誤改變影片時間，將`mousedown`設為控制項，來啟用拖曳以改變時間軸。

```js
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
```

- 其他補充

  HTML 中`<video>`的`controls`屬性，就有基本影片播放控制的功能，實務上不見得需要自定義播放器。
