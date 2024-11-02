const groups = document.querySelectorAll(".carousel-group");
const cards = document.querySelectorAll(".carousel-item");
const container = document.querySelector(".carousel-container");
const buttons = document.querySelectorAll(".carousel-buttons > button");

// 切換卡片顯示組別
const showGroup = function (groupNum) {
  groups.forEach((group) => (group.style.display = "none"));
  buttons.forEach((button) => {
    button.classList.remove("active");
    button.style.color = "";
  });
  // container.scrollLeft = 0;
  const selectedGroup = document.querySelector(`#group${groupNum}`);
  selectedGroup.style.display = "flex";
  buttons[groupNum - 1].classList.add("active");
  initCarousel();
};

// 卡片輪播功能
function rotateCards() {
  const maxRotation = 45; // 最大旋轉角度
  const maxScale = 0.5; // 最大縮放比例（縮小到0.5倍）
  const maxTranslateX = 50; // 最大位移比例
  const containerRect = container.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;

  cards.forEach((card) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;

    const ratio =
      ((cardCenter - containerCenter) / (containerRect.width / 2)) * 0.5;

    const rotation = maxRotation * ratio;
    const scale = 1 - Math.abs(ratio) * maxScale;
    const translateX = maxTranslateX * ratio;
    const opacity = 1 - Math.abs(ratio) * 0.75;
    const zIndex = Math.round(100 * (1 - Math.abs(ratio)));

    card.style.transform = `
    translate3d(${translateX}%, 0, 0)
    rotate3d(0, 1, 0, ${rotation}deg)
    scale(${scale})
  `;
    card.style.opacity = opacity;
    card.style.zIndex = zIndex;
  });
}

//卡片輪播功能初始化
function initCarousel() {
  container.style.perspective = "1000px";
  container.style.overflowX = "scroll";
  container.style.scrollBehavior = "smooth";
  cards.forEach((card) => {
    card.style.transformOrigin = "center";
    card.style.position = "relative";
    card.style.willChange = "transform, opacity";
  });
  rotateCards();
}

container.addEventListener("scroll", rotateCards);
initCarousel();
