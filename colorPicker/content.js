// Создаем элемент для отображения координат
const coordDiv = document.createElement("div");
coordDiv.id = "mouse-coord-display";
coordDiv.style.position = "fixed";
coordDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
coordDiv.style.color = "white";
coordDiv.style.padding = "5px";
coordDiv.style.borderRadius = "5px";
coordDiv.style.pointerEvents = "none"; // Не мешает кликам
coordDiv.style.zIndex = "10001";
coordDiv.style.display = "none"; // Начинаем скрытым
document.body.appendChild(coordDiv);
document.body.style.cursor = "crosshair";

// Проверяем наличие canvas элемента или создаем новый
let canvas = document.getElementById("mouse-coord-canvas");

if (!canvas) {
  canvas = document.createElement("canvas");
  canvas.id = "mouse-coord-canvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "10000"; // Canvas ниже coordDiv
  canvas.style.pointerEvents = "none"; // Canvas не мешает кликам
  document.body.appendChild(canvas);
}

// Функция для обновления координат
function updateCoordinates(event) {
  const x = event.clientX;
  const y = event.clientY;

  coordDiv.style.left = `${x + 10}px`;
  coordDiv.style.top = `${y + 10}px`;
  coordDiv.style.display = "block";
  var getCanvas = document.getElementById("mouse-coord-canvas");
  var geeks = getCanvas.getContext("2d");
  var ImageData = geeks.getImageData(x, y, 1, 1);

  /* Stores the red color information of 
				the first pixel */
  red = ImageData.data[0];

  /* Stores the green color information of 
				the first pixel */
  green = ImageData.data[1];

  /* Stores the blue color information of 
				the first pixel */
  blue = ImageData.data[2];

  function rgbToHex(r, g, b) {
    // Преобразует отдельный компонент цвета в шестнадцатеричное значение
    const componentToHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
  
    // Объединяет все компоненты в один HEX-код
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  let hexColor = rgbToHex(red, green, blue);
  coordDiv.textContent = `X: ${x}, Y: ${y},RGB:(${red},${green},${blue}), HEX:${hexColor}`;
  coordDiv.innerHTML = `X: ${x}, Y: ${y}<br>RGB:(${red},${green},${blue}),<br>HEX:${hexColor}`;
}

// Функция для захвата видимой области и отображения на canvas
function captureVisibleArea() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  html2canvas(document.body, {
    x: window.scrollX,
    y: window.scrollY,
    width: viewportWidth,
    height: viewportHeight,
    scale: window.devicePixelRatio,
    ignoreElements: (element) => element.id === "mouse-coord-display", // Игнорируем элемент с координатами
  }).then((screenshotCanvas) => {
    const ctx = canvas.getContext("2d");
    canvas.width = viewportWidth;
    canvas.height = viewportHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas
    ctx.drawImage(screenshotCanvas, 0, 0, canvas.width, canvas.height);
  });
}

// Добавляем обработчик события мыши
document.addEventListener("mousemove", updateCoordinates);
document.addEventListener("click", captureVisibleArea);
