# Day 17 - Sort Without Articles

## [DEMO](https://ayating.github.io/JavaScript30/17%20-%20Sort%20Without%20Articles/index-done.html)

## 目標

將陣列中的文字去除冠詞後，按字母排序。

## 步驟要點

1. 利用正則表達式建立一個去除文字冠詞的 function
2. 將陣列文字去除冠詞後進行排序
3. 將排序後的資料渲染到畫面

## 學習筆記

- 正則表達式

`^`：代表字串的開頭，確保只匹配字串的開始部分。

`(a |the |an )`：這是一個捕捉群組，`|`表示「或」的意思，匹配 "a "、"the " 或 "an "其中一個即可。

`i`：表示「不區分大小寫」修飾符，確保無論是 "The" 還是 "the" 都會被匹配。

- trim()：用來移除名稱前後可能存在的空格。

- replace()：不會改變陣列中的原始名稱，它只是對每個項目應用正則表達式後返回修改過的結果。

```
function strip(bandName) {
  return bandName.replace(/^(a |the |an )/i, "").trim();
}
```
