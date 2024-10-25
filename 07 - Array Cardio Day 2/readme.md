# Day 7 - Array Cardio Day 2

## [DEMO](https://ayating.github.io/JavaScript30/07%20-%20Array%20Cardio%20Day%202/index-done.html)

## 目標

利用範例資料練習陣列的處理方法。

## 學習筆記

- some()：檢查陣列中是否有至少一個元素符合特定條件，並返回布林值。

```js
const ans1 = people.some(
  (person) => new Date().getUTCFullYear() - person.year >= 19
);
```

- every()：檢查陣列中是否所有元素都符合特定條件，並返回布林值。

```js
const ans2 = people.every(
  (person) => new Date().getUTCFullYear() - person.year >= 19
);
```

- find()：在陣列中搜尋第一個符合條件的元素，並返回該元素；如果找不到，則返回`undefined`。

```js
const ans3 = comments.find((comment) => comment.id === 823423);
```

- findIndex()：在陣列中搜尋第一個符合條件的元素，並返回該元素的索引位置；如果找不到，則返回`-1`。

```js
const commentIdx = comments.findIndex((comment) => comment.id === 823423);
```

- slice()：從陣列中返回一個淺拷貝，包含指定範圍內的元素，不會修改原始資料。array.slice(起始位置, 結束位置)會回傳起始位置到結束位置（不包括結束位置）之間的元素。

```js
const ans5 = [
  ...comments.slice(0, commentIdx),
  ...comments.slice(commentIdx + 1),
];
```

- splice()：在陣列的特定位置刪除、替換或添加元素，會修改原始資料，並回傳被刪除的元素，若沒有元素被刪除，則會回傳空陣列。array.splice(起始位置, 刪除數量, 添加元素)，刪除數量若為 0 或負數，則不會刪除任何元素，但可以從起始位置插入新元素。如果此值為空值，則從起始位置開始刪除到陣列末尾的所有元素。

```js
comments.splice(commentIdx, 1);
const ans4 = comments;
```
