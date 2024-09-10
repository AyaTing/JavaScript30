# Day 4 - Array Cardio Day 1

## 目標

利用範例資料練習陣列的處理方法。

## 學習筆記

1. filter()

過濾原陣列資料，將篩選結果為`true`的資料組成新陣列回傳。

```
// 篩選出16世紀出生的發明家

const ans1 = inventors.filter(
   (inventor) => inventor.year >= 1500 && inventor.year < 1600
);
```

2. map()

將原陣列內的每一筆資料經過處理後，回傳一個新陣列。

```
// 將發行家的姓名組合成一個陣列資料

const ans2 = inventors.map(
   (inventor) => inventor.first + " " + inventor.last
);
```

3. sort()

將陣列內的所有元素進行排序，並回傳此陣列（會修改原陣列，不會回傳新陣列）。

要注意排序不一定是穩定排序，且預設是按字串去排序。

```
// 依照出生日期，從年紀大到小將發明家排序

const ans3 = inventors.sort((a, b) => a.year - b.year);
```

4. reduce()

逐一遍歷陣列中的每一個元素，並且將合併成一個單一的值。回傳值不限，可以是陣列、字串等。

```
// 計算出每個物品各自的數量
const data = ["car", "car", "truck", "truck", "bike", "walk", "car", "van", "bike", "walk", "car","van", "car" ,"truck"];

const ans8 = data.reduce((object, item) => {
    if (!object[item]) {
        object[item] = 1;  // 如果物件中沒有此項目，初始化為 1
    } else {
        object[item]++;  // 如果已經有此項目，數量加 1
    }
    return object;
}, {});  // 初始值是一個空物件
```

5. 其他補充

- **使用`querySelectorAll`會得到`Ｎodelist`，而非真正的 Array**，因此不能用`map`等方法，如果需要處理 Nodelist 裡面的元素，可以用`Array.from`先將 NodeList 轉為 Array 或是使用`forEach`先處理資料，再建立一個空陣列將資料`push`進去。

  - forEach()

    用法類似`map`，但不會回傳新陣列，Nodelist 有此方法。

  - includes()

    判斷陣列是否包含特定元素，並回傳布林值。

```
// 列出連結中巴黎所有包含'de'的路名
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

const arr = Array.from(
   document.querySelectorAll(".mw-category-group li a")
);
const ans6 = arr
   .map((a) => a.title)
   .filter((title) => title.includes("de"));
```

- console.table  
  可以將資料用表格的形式顯示。
