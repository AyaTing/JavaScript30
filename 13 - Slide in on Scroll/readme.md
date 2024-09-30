# Day 13 - Slide in on Scroll

## [DEMO](https://ayating.github.io/JavaScript30/13%20-%20Slide%20in%20on%20Scroll/index-done.html)

## 目標

實現滑動視窗圖片滑入滑出畫面的效果。

## 步驟要點

1. 取得元素
2. 設定監聽
3. 加入判斷以觸發效果

## 學習筆記

1. getBoundingClientRect()：可以直接獲取元素相對於視窗的位置，但會頻繁觸發 scroll 事件，較耗效能。

```
function handleScroll() {
  const images = document.querySelectorAll(".slide-in");
  images.forEach((img) => {
    const rect = img.getBoundingClientRect();
    if (window.innerHeight - rect.top > rect.height / 2) // 檢查圖片是否有超過一半進入可視區
    img.classList.add("active");
    if (rect.bottom < 0) img.classList.remove("active"); // 檢查圖片是否已經完全離開可視區（底部不在可視區內）
  });
}
```

2. offsetTop：是元素的靜態屬性，不需要瀏覽器頻繁重新計算布局，因此相對於 getBoundingClientRect()，效能可能更好。

```
function handleScroll() {
  windowTop = window.scrollY;  // 取得視窗頂端的滾動距離
  windowBottom = windowTop + window.innerHeight;  // 計算視窗的底端位置
  images.forEach((img) => {
    const imgMiddle = img.offsetTop + img.height / 2;  // 計算圖片中點的位置（圖片頂端位置加上圖片高度的一半）
    if (imgMiddle > windowTop && imgMiddle < windowBottom) {
      img.classList.add("active");  // 如果圖片中點在視窗範圍內，則加上active屬性
    } else {
      img.classList.remove("active");  // 如果圖片中點不在視窗範圍內，移除active屬性
    }
  });
}
```

3. IntersectionObserver：用來監測元素進出視窗邊界的 API，不會在每次滾動時頻繁觸發，而是僅在監測元素進出可視區域時觸發，因此較省效能。

```
// 建立一個 IntersectionObserver，當圖片進入或離開視窗時觸發回調函式
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // entry.isIntersecting 是一個布林值，表示該元素是否進入可視範圍
    if (entry.isIntersecting) {
      entry.target.classList.add('active'); // 當元素進入可視區域，添加active屬性
    } else {
      entry.target.classList.remove('active'); // 當元素離開可視區域，移除active屬性
    }
  });
}, {
  threshold: 0.5 // 觸發臨界點，當元素至少有 50% 可見時觸發
});

// 取得所有要觀察的圖片，並為每個圖片元素設置 observer 來進行監測
const images = document.querySelectorAll('.slide-in');
images.forEach(image => {
  observer.observe(image); // 將圖片元素傳遞給 observer 開始觀察
});
```
