# Day 19 - Webcam Fun

## [DEMO](https://ayating.github.io/JavaScript30/19%20-%20Webcam%20Fun/index.html)

## 目標

取得使用者影像並加以處理，來達成拍照、照片濾鏡、分色、綠幕效果等功能。

## 步驟要點

1. 取得使用者攝影機影像
2. 將影像畫面渲染至 canvas
3. 製作拍照下載功能
4. 利用影像資料的像素處理來達成影像效果（綠幕、濾鏡等）

## 學習筆記

1. 如何取得使用者攝影機影像？

   `navigator.mediaDevices.getUserMedia({ video: true, audio: false })`是一個非同步的方法，用來取得使用者的攝影機，當使用者授權後，會回傳`Promise`及串流資料（MediaStream 物件），將串流資料設定為 video 的 srcObject，影像畫面就能顯示於頁面上。也可以進一步接收錯誤、進行處理，例如：如果使用者拒絕授權，可以設置無法使用的警告。

```js
function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      alert("無法正常運作：請檢查是否已允許攝影機取用權限");
    });
}
```

2. 如何將影像畫面渲染至 canvas？

   首先取得影像大小及 canvas 畫布大小的設定，並利用`drawImage()`來指定繪製的來源、繪製的起始位置及大小，如果需要進一步對影像做處理，可以利用`getImageData()`取得指定 canvas 範圍的像素數據，最後再利用`putImageData()`更新像素數據，取得處理過後的影像

```js
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width; // 設定canvas畫布大小
  canvas.height = height;
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height); // 繪製影片（參數：來源、位置（x,y）、長寬）
    let pixels = ctx.getImageData(0, 0, width, height);

    //處理方法（略）

    ctx.putImageData(pixels, 0, 0);
  }, 16); // 約 60fps
}
```

3. 如何實現拍照及下載功能？

   將 canvas 畫布內容轉為`dataURL（Base64 編碼格式）`，再生成一個 `<a>`標籤，將 dataURL 作為下載圖片的來源，最後再插入 HTML 當中，讓使用者可點擊下載照片。

```js
function takePhoto() {
  // 拍照聲
  snap.currentTime = 0;
  snap.play();
  // 取得影像資料、插入下載連結
  const dataURL = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = dataURL;
  link.setAttribute("download", "Nice!");
  // link.textContent = "Download Photo";
  link.innerHTML = `<img src="${dataURL}" alt="Nice Photo!" />`;
  strip.insertBefore(link, strip.firstChild);
}
```

4. 如何製作不同的影像效果？

   承第 2 點，可以利用`getImageData()`取得指定 canvas 範圍的像素數據，接著可以進一步將不同顏色（R、G、B）分量輕微移位來產生的視覺上的錯位效果、更改不同顏色的份量來製作不同顏色的濾鏡、或是將指定範圍的顏色取出並設定透明度為零來達成綠幕效果，利用像素處理來設計不同的效果，最後再透過`putImageData()`將處理後的影像渲染到 canvas 上。
