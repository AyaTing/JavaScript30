# Day 12 - Key Sequence Detection

## [DEMO](https://ayating.github.io/JavaScript30/12%20-%20Key%20Sequence%20Detection/index-done.html)

## 目標

實現輸入暗號會出現 Cornify 的效果。

## 步驟要點

1. 設定暗號
2. 加入鍵盤監聽
3. 設定比對條件

## 學習筆記

1. 如何設定比對條件？

- 限制陣列長度

寫法 1：以此例來說，secretCode = ["a", "y", "a"]，所以 secretCode.length 會是 3，因此第一個參數會是-4，也就是會從倒數第四個開始切（即第 0 項）。

```js
input.push(e.key);
input.splice(-secretCode.length - 1, input.length - secretCode.length);
```

寫法 2：當鍵盤輸入陣列內容長度大於暗號的陣列長度時，會將第一個項目推出去。

```js
input.push(e.key);
while (input.length > secretCode.length) {
  input.shift();
}
```

- 鍵入內容比對

  輸入內容及暗號皆為陣列，將陣列轉為字串後進行比對。

寫法 1

```js
if (input.join("").includes(secretCode.join(""))) {
  console.log("Have a good day!");
  cornify_add();
}
```

寫法 2

```js
if (input.join("|") === secretCode.join("|")) {
  console.log("Have a good day!");
  cornify_add();
}
```
