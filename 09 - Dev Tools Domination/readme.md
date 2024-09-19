# Day 09 - Dev Tools Domination

## [DEMO](https://ayating.github.io/JavaScript30/Day%2009%20-%20Dev%20Tools%20Domination/index-done.html)

## 目標

學習如何使用開發者工具中的 console 來進行除錯和檢查 DOM 元素。

## 學習筆記

1. 自定義 console 物件

通過 isDev 來控制是否在開發模式下輸出 console 訊息：
當`isDev: true`時，console.log 會輸出訊息。
當`isDev: false`時，console.log 會被跳過，不輸出訊息。
在測試時可以不用再另外註解或是手動刪除 console.log。

```
let console = {
  isDev: true,
  log(...args) {
    if (!this.isDev) return;
    window.console.log(...args);
  },
  // 其他 console 方法同樣通過 isDev 判斷是否輸出
};

console.log("hello");
```

2. 常見 console 方法

```
console.log("hello"); // 用於普通的訊息輸出。
console.log(
    "%c Hello!",
    "font-size:40px; color:#BADA55; text-shadow: 10px 10px 0 grey"
); // 可以自定義輸出的樣式：
console.warn("住手！"); // 用於輸出警告訊息。
console.error("糟了"); // 用於輸出錯誤訊息。
console.info("這是一個廣告"); // 用於輸出訊息提示。
console.clear(); // 可清除console或使用快捷鍵command + K
console.table(dogs, "name"); // 除了能將資料以表格呈現之外，還能限定顯示欄位
```

3. 字串插值

使用不同的插值符號來格式化輸出訊息：

```
console.log("My name is %s", "Aya"); // %s 是字串
console.log("I have %f dollors", 3.45); // %f 是浮點數
console.log("I have %d dollors", 3.45); //  %d 是整數
```

現在通常用`template string`取代：

```
let name = "Aya";
console.log(`My name is ${name}`);
```

4. 測試訊息

`console.assert(判斷式,"錯誤訊息")`，當條件為 false 時，會輸出錯誤訊息。

```
console.assert(false, "That is wrong!-1");
console.assert(null, "That is wrong!-2");
console.assert(0, "That is wrong!-3");
console.assert("", "That is wrong!-4");
console.assert(undefined, "That is wrong!-5");
console.assert(true, "That is wrong!-6"); // 只有這項不會跳出訊息
console.assert(NaN, "That is wrong!-7");
```

5. 計時

使用`console.time()`和`console.timeEnd()`來測量程式執行時間：

```
console.time("test 1");
let i;
let j;
for (i = 0; i < 10000000; i++) {
    j = i;
}
console.timeEnd("test 1");

console.time("test 2");
for (let i = 0; i < 10000000; i++) {
    let j = i;
}
console.timeEnd("test 2");
```

6. 其他方法

- DOM 檢視

```
let p = document.querySelector("p");
console.dir(p); // 顯示p的屬性結構
```

- 訊息分組

```
const dogs = [
  { name: "Snickers", age: 2 },
  { name: "Hugo", age: 8 },
];

dogs.forEach((dog) => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});
```

- 計數

```
console.count("Wes");
console.count("Steve");
console.count("Steve");
```
