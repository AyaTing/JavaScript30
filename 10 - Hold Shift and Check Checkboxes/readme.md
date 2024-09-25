# Day 10 - Hold Shift and Check Checkboxes

## [DEMO](https://ayating.github.io/JavaScript30/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/index-done.html)

## 目標

實現按 shift 可以多重選取的功能。

## 步驟要點

1. 取得所有 Checkbox 元素
2. 判斷當前 Checkbox 是否已經勾選
3. 切出選取前一次勾選和目前勾選之間的區間
4. 加入監聽器來實現按住 Shift 進行多重選取的功能

## 學習筆記

1. 取得所有 Checkbox 元素

取得 Checkbox 元素後，將其轉為陣列，以利後續用陣列的方法進行操作。

```
const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
```

2. 實現按住 Shift 多重選取的功能

```
function handleCheck(e) {
  // 如果目前的 checkbox 被勾選
  if (this.checked) {
    // 取得目前勾選的 checkbox 在陣列中的索引
    const currentIdx = checkboxes.indexOf(this);

    // 如果按住了 Shift 並且有上一個勾選的 checkbox
    if (e.shiftKey && lastCheckedIdx !== null) {
      // 計算當前和上次選取之間的範圍，並將範圍內的 checkbox 全部勾選
      checkboxes
        .slice(
          Math.min(currentIdx, lastCheckedIdx),
          Math.max(currentIdx, lastCheckedIdx) + 1
        )
        .forEach((input) => (input.checked = true));
    }

    // 更新最後勾選的 checkbox 索引
    lastCheckedIdx = currentIdx;

  } else {
    // 如果 checkbox 被取消勾選，重置 lastCheckedIdx
    lastCheckedIdx = null;
  }
}
```
