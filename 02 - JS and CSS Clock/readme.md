# Day 2 - JS and CSS Clock

## 目標

製作能照著實時運轉的時鐘。

## 步驟要點

1. 製作指針樣式
2. 取得指針元素及時間
3. 計算指針轉動角度、控制指針轉動
4. 設定計時器，使時鐘能照實時運行

## 學習筆記

1. 重設起始位置

原範例指針的起始點為 9 點鐘方向，為了後續計算方便將起始點更改為 12 點鐘方向。

2. 如何取得時間？

使用函數`Date()`來取得時間物件，並用此物件提供的方法取得所需要的時間數。

```
// 必須搭配 new 來使用
const now = new Date()
```

- date.getSeconds()：取得指定日期的秒數
- date.getMinutes()：取得指定日期的分鐘數
- date.getHours()：取得指定日期的小時數

3. 控制指針轉動

計算指針轉動的角度，以分針為例：<br>
每分鐘會轉 360 度/60 分鐘＝ 6 度<br>
再加上每秒鐘分針會在前進 6 度/60 秒<br>

透過賦予`transform`屬性轉動角度的值，達到指針轉動的效果。

```
const minsDegrees = mins * 6 + (seconds / 60) * 6;
minHand.style.transform = `rotate(${minsDegrees}deg)`
```

4. 設定計時器

為使時鐘能按照實時去運轉，必須設定計時器使畫面持續更新。<br>
以下三種方式計時器用法：

- setInterval：設定間隔，持續執行

```
setClock(); // 初始化畫面
setInterval(setClock,1000);
```

- setTimeout：設定延遲，執行一次

```
function timeoutHandler() {
    setClock();
    setTimeout(timeoutHandler,1000);
}
setClock(); // 初始化畫面
setTimeout(timeoutHandler,1000);
```

- requestAnimationFrame：處理畫面的 setTimeout，更新頻率會和硬體同步

```
function animationHandler() {
    setClock();
    window.requestAnimationFrame(animationHandler);
}
setClock(); // 初始化畫面
window.requestAnimationFrame(animationHandler);
```
