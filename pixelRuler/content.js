// Создаем элемент для отображения координат и длины линии
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
  canvas.width = window.innerWidth; // Подгоняем размер canvas под окно
  canvas.height = window.innerHeight;
}

let startX = null;
let startY = null;
let endX = null;
let endY = null;

// Функция для обновления координат и отображения длины линии
function updateCoordinates(event) {
  const x = event.clientX;
  const y = event.clientY;

  coordDiv.style.left = `${x + 10}px`;
  coordDiv.style.top = `${y + 10}px`;
  coordDiv.style.display = "block";

  if (startX !== null && startY !== null) {
    // Если стартовая точка задана, показываем длину линии
    const length = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
    coordDiv.textContent = `X: ${x}, Y: ${y}, Length: ${Math.round(length)}px`;
  } else {
    coordDiv.textContent = `X: ${x}, Y: ${y}`;
  }
}

// Функция для обработки кликов и рисования линии
function drawLine(event) {
  if (startX === null && startY === null) {
    // Задаем стартовую точку
    startX = event.clientX;
    startY = event.clientY;
  } else {
    // Задаем конечную точку и рисуем линию
    endX = event.clientX;
    endY = event.clientY;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas перед рисованием новой линии

    // Рисуем линию
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "red"; // Цвет линии
    ctx.lineWidth = 2; // Толщина линии
    ctx.stroke();
    ctx.closePath();

    // Сбрасываем начальную и конечную точку
    startX = null;
    startY = null;
    endX = null;
  }
}

// Добавляем обработчик события мыши
document.addEventListener("mousemove", updateCoordinates);
document.addEventListener("click", drawLine);
