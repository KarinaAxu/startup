const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ===== Middleware =====
app.use(express.json());
app.use(cors());

// ===== Пример API =====
app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend работает корректно 🚀' });
});

// ===== Отдача фронтенда =====
// В продакшене React билд кладём сюда
const frontendPath = path.join(__dirname, 'build');
app.use(express.static(frontendPath));

// Все не-API маршруты направляем на index.html
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ===== Запуск =====
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});