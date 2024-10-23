# 28 - Video Speed Controller

## [DEMO](https://ayating.github.io/JavaScript30/28%20-%20Video%20Speed%20Controller/index-done.html)

## 目標

製作一個可以控制影片播放速度的垂直滑桿。

## 步驟要點

1. 取得影片及滑桿控制元素
2. 設定監聽
3. 計算滑鼠的 Y 座標位置及百分比
4. 設定影片速度、渲染畫面

## 學習筆記

- `video.playbackRate`可以設定影片的播放速度。

- 如何將數值限縮在某個數值範圍內？

```js
const playbackRate = percent * (max - min) + min;
```

- 利用`offsetHeight`取得目標 DOM 元素高度，進而用於計算滑鼠相對於元素的百分比位置。
