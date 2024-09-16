# Day 06 - Type Ahead

## [DEMO](https://ayating.github.io/JavaScript30/06%20-%20Type%20Ahead/index-done.html)

## 目標

在輸入框輸入文字能即時顯示關聯城市資料。

## 步驟要點

1. 取得城市資料
2. 取得元素控制權、監聽變化
3. 改變畫面顯示內容

## 學習筆記

1. 如何取得城市資料？

使用 fetch API 來獲取數據，`fetch`會返回一個`Promise`，並將資料轉為 JSON 格式，最後將數據存儲在 cities 變數中。

```
fetch(endpoint)
  .then((response) => response.json()
  .then((data) => (cities = data))
);
```

2. 如何實現搜尋功能？

使用正則表達式和`filter`過濾資料。正規表達式是被用來匹配字串中字元組合的模式，配合`.match(regex)`檢查字串是否包含與正則表達式匹配的部分。如果匹配的話，會返回陣列資料，否則會返回`null`。

- new RegExp(wordToMatch, 'gi'):

  1. wordToMatch: 用戶輸入的搜索詞。
  2. `gi`: 正則表達式的 flags。`g`表示全域搜尋，不會在找到第一個匹配後就停止、`i`表示不區分大小寫。

```
function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}
```

- 在 JavaScript 中，有兩種方式可以建立正則表達式：

```
const regex = /pattern/flags;
```

或

```
const regex = new RegExp('pattern', 'flags');
```

3. 如何改變畫面顯示內容？

先使用正則表達式和`replace`讓使用者輸入的文字加上顏色標記，再使用`.join('')`將`map`的結果轉換為單一字串，這樣它可以直接插入 HTML 中。

```
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map((place) => {
    const regex = new RegExp(this.value, "gi");
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
     `;
  }).join("");
  suggestions.innerHTML = html;
}
```

4. 如何修改人口數顯示方式？

資料提供的人口數據是字串，先將其轉為數字，再用`toLocaleString`將數字轉化爲用千分位分隔的字串。
`toLocaleString`除了數字之外，還可以用於日期和時間等的格式化。

```
function numberWithCommas(x) {
  return (x * 1).toLocaleString();
}
```

5. 追加功能

參考範例做法後發現，當輸入清空時，頁面並不會回到初始狀態，因此追加檢查功能，若輸入框為空白時，顯示默認提示。

- trim()：用於移除字符串兩端的空白。

```
if (this.value.trim() === "") {
// 如果輸入框是空的，則恢復到初始狀態
  suggestions.innerHTML = `
  <li>Filter for a city</li>
  <li>or a state</li>
  `;
  return;
}
```
