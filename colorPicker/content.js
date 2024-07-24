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
//canvas для отображения цвета
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

// Добавляем обработчик события мыши
document.addEventListener("mousemove", updateCoordinates);
