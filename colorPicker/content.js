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

// Создаем canvas для отображения цвета
const canvas = document.createElement("canvas");
canvas.id = "mouse-coord-canvas";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "10000"; // Canvas ниже coordDiv
canvas.style.pointerEvents = "none"; // Canvas не мешает кликам
document.body.appendChild(canvas);

// Функция для обновления координат
function updateCoordinates(event) {
  const x = event.clientX;
  const y = event.clientY;

  coordDiv.textContent = `X: ${x}, Y: ${y}`;
  coordDiv.style.left = `${x + 10}px`;
  coordDiv.style.top = `${y + 10}px`;
  coordDiv.style.display = "block";
}

// Функция для захвата экрана и масштабирования изображения
function captureScreen() {
  html2canvas(document.body).then((screenshotCanvas) => {
    const ctx = canvas.getContext("2d");

    // Получаем размеры окна и canvas
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Получаем размеры скриншота
    const screenshotWidth = screenshotCanvas.width;
    const screenshotHeight = screenshotCanvas.height;

    // Вычисляем коэффициенты масштабирования
    const widthRatio = windowWidth / screenshotWidth;
    const heightRatio = windowHeight / screenshotHeight;
    const scale = Math.min(widthRatio, heightRatio);

    // Устанавливаем размеры canvas
    canvas.width = screenshotWidth * scale;
    canvas.height = screenshotHeight * scale;

    // Масштабируем и рисуем изображение на canvas
    ctx.drawImage(screenshotCanvas, 0, 0, canvas.width, canvas.height);
  });
}

// Добавляем обработчик события мыши
document.addEventListener("mousemove", updateCoordinates);
document.addEventListener("click", captureScreen);
