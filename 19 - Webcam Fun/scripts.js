const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false }) // 取得使用者的攝影機，會回傳一個promise
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      alert("無法正常運作：請檢查是否已允許攝影機取用權限");
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width; // 設定canvas畫布大小
  canvas.height = height;
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height); // 繪製影片（參數：來源、位置（x,y）、長寬）
    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    pixels = greenScreen(pixels);
    // ctx.globalAlpha = 0.5;
    ctx.putImageData(pixels, 0, 0);
  }, 16); // 約 60fps
}

function takePhoto() {
  // 拍照聲
  snap.currentTime = 0;
  snap.play();
  // 取得影像資料、插入下載連結
  const dataURL = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = dataURL;
  link.setAttribute("download", "Nice!");
  // link.textContent = "Download Photo";
  link.innerHTML = `<img src="${dataURL}" alt="Nice Photo!" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    // rgba（4 pixels 一輪）
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 100] = pixels.data[i + 0]; // RED
    pixels.data[i + 150] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 250] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // 取出限定範圍內的pixel，然後把它們變透明
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

getVideo();
video.addEventListener("canplay", paintToCanvas);
