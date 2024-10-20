# Day 21 - Geolocation

## [DEMO](https://ayating.github.io/JavaScript30/21%20-%20Geolocation/index-done.html)

## 目標

使用 Geolocation API 偵測速度和方向，並在畫面中顯示相關資訊。

## 步驟要點

1. 取得 HTML 中的元素
2. 取得使用者裝置位置資訊並渲染畫面

## 學習筆記

1. 如何取得使用者位置？

利用`navigator.geolocation.watchPosition`，可以持續監測使用者裝置的即時位置資訊。這個方法不僅能讓我們透過成功的 callback 來處理位置數據，同時也能設定錯誤的 callback，來應對授權不足或其他技術性問題。

```JS
navigator.geolocation.watchPosition(
  (data) => {
    let latitude = data.coords.latitude.toFixed(2);
    let longitude = data.coords.longitude.toFixed(2);
    coordinates.textContent = `座標：[${latitude}, ${longitude}]`;
  },
  (err) => {
     alert("尚未取得位置授權，無法使用。");
  }
);
```

2. 其他補充

- 使用者需允許瀏覽器取得位置授權

- 可能因硬體設備限制或裝置在靜止和移動不足的原因，而無法正確偵測到速度與方向（speed 和 heading 返回 null）。
