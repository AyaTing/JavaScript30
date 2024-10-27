# Day 18 - Adding Up Times with Reduce

## [DEMO](https://ayating.github.io/JavaScript30/18%20-%20Adding%20Up%20Times%20with%20Reduce/index-done.html)

## 目標

計算出影片清單的總時間。

## 步驟要點

1. 取得所有元素所存取的影片時間
2. 轉換資料格式（字串轉為數字）並進行加總
3. 將所取得的總秒數轉換成`HH:MM:SS`的格式

## 學習筆記

1. Nodelist 轉成陣列的方法

- [...li] 展開運算子

```js
const li = document.querySelectorAll("li");
const seconds = [...li];
```

- Array.from

```js
const li = document.querySelectorAll("li");
const seconds = Array.from(li);
```

- [].map.call(li, (item) => item)

```js
const li = document.querySelectorAll("li");
const seconds = [].map.call(li, (item) => item);
```

- [].map.apply(li, [(item) => item])： `apply()`的使用場景跟`call()`類似，但它允許我們以一個陣列的形式傳遞參數，而不是逐一傳遞。

```js
const li = document.querySelectorAll("li");
const seconds = [].map.apply(li, [(item) => item.dataset.time]);
```
