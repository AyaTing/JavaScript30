# Day 15 - LocalStorage

## [DEMO](https://ayating.github.io/JavaScript30/15%20-%20LocalStorage/index-done.html)

## 目標

利用 localStorage 來儲存表單新增的項目，並且能夠切換項目的狀態 (已完成／未完成)。

## 步驟要點

1. 取得元素並設置監聽
2. 新增加入項目的功能
3. 使新增的項目能顯示於畫面
4. 加入狀態切換的功能
5. 加入 LocalStorage 儲存功能

## 學習筆記

1. localStorage 的用法

- localStorage.getItem ：讀取`localStorage`儲存的資料，**`localStorage`是以字串形式儲存資料**，因此在此例需用`JSON.parse()`將資料轉為陣列形式。

```js
// 從localStorage中取出已經儲存的項目數據，如果不存在，則設為空陣列。
const items = JSON.parse(localStorage.getItem("items")) || [];
```

- localStorage.setItem：將資料儲存於`localStorage`，資料須以字串形式儲存，因此需使用`JSON.stringify()`轉換資料類型。

```js
localStorage.setItem("items", JSON.stringify(items));
```

2. 其他補充

- submit 事件的預設行為會觸發頁面轉跳，為了避免頁面刷新，必須透過`e.preventDefault()`來防止這個行為。

```js
function addItem(e) {
  e.preventDefault();
  // 略
}

addItems.addEventListener("submit", addItem);
```

- form.reset()：在表單提交後重置表單內容，只對表單元素有效，例如 `input`和`textarea`。
