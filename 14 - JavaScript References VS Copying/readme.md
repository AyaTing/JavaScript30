# Day 14 - JavaScript References VS Copying

## [DEMO](https://ayating.github.io/JavaScript30/14%20-%20JavaScript%20References%20VS%20Copying/index-done.html)

## 目標

認識 JavaScript 中陣列與物件的引用(Refrence)及複製(Copying)

## 學習筆記

1. 值傳遞（Call By Value）

指複製一個變數的值，並將該值傳遞給另一個變數。兩個變數之間完全獨立，其中一個變數的變更不會影響另一個。適用於基本型別 (Primitive Types)，如字串、數字、布林值等。

2. 引用傳遞（Call By Reference）

傳遞的是變數的引用（記憶體位置），而非副本，任何在函式內部對變數的操作都會影響到外部的原始變數。
適用於：物件型別（Reference Types），如陣列和物件。

3. 陣列的拷貝

- 使用 slice()

```
const team2 = players.slice(); // 複製陣列
team2[0] = "Aya";
console.log(players, team2); // players 不受影響
```

- 使用 concat()

```
const team3 = players.concat(); // 複製陣列
team3[0] = "Henry";
console.log(players, team3); // players 不受影響
```

- 使用 ES6 的展開運算符 ...

```
const team4 = [...players]; // 複製陣列
team4[0] = "Mary";
console.log(players, team4); // players 不受影響
```

- 使用 Array.from()

```
const team5 = Array.from(players); // 複製陣列
team5[0] = "Becky";
console.log(players, team5); // players 不受影響
```

4. 物件的拷貝

- 使用 Object.assign()

```
const person3 = Object.assign({}, person); // 複製物件
person3.name = "Aya";
console.log(person, person3); // person 不受影響
```

- 使用 ES6 的展開運算符 ...

```
const person4 = { ...person }; // 複製物件
person4.name = "Becky";
console.log(person, person4); // person 不受影響
```

- 使用 JSON.parse(JSON.stringify())

```
const dev2 = JSON.parse(JSON.stringify(wes)); // 深拷貝
dev2.social.twitter = null;
console.log(wes, dev2); // wes 的 social 不受影響
```

5. 其他補充

Object.assign() 和展開運算符進行的淺拷貝只會複製物件的第一層屬性，深層屬性仍是引用。如需完整複製多層結構的物件，可以使用 JSON.parse(JSON.stringify()) （仍有限制，如無法複製 function）或是專門的函式庫如 lodash 的 cloneDeep()。
