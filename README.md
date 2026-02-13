# 🎮 Minesweeper (React UI)

A modern implementation of the classic Minesweeper game built with React and clean architecture principles.

🔗 **Live Demo:**  
https://react-minesweeper-ui.netlify.app

---

## 🇺🇦 Українська версія

### 📌 Про проєкт

Це сучасна реалізація класичної гри "Сапер", створена з використанням:

- React (hooks)
- Чистої архітектури (розділення логіки, оркестрації та UI)
- SCSS modules
- Vite
- Framer Motion (анімації)
- 3D UI-стилізації

Проєкт був повністю рефакторений з нуля для демонстрації:

- правильної структури хуків
- ізольованої ігрової логіки
- чистого UI-рівня
- масштабованої архітектури

---

### 🧠 Архітектура

Проєкт розділений на 3 рівні:

1. **Game Logic Layer (`src/game`)**
   - Генерація мін
   - Flood fill алгоритм
   - Підрахунок сусідів

2. **State Orchestration Layer (`useGameField`, `useMinesweeper`, `useGameTimer`)**
   - Керування станом гри
   - Статус (idle / playing / victory / defeat)
   - Таймер
   - Обмеження прапорців

3. **UI Layer (`src/components`)**
   - StatusBar
   - Field
   - Cell
   - AnimatedTitle
   - GameOver / Win
   - Анімації

---

### ✨ Основні можливості

- Безпечний перший клік
- Обмеження кількості прапорців
- Flood-fill для порожніх клітинок
- Відображення різниці між:
  - bombed (натиснута міна)
  - bomb (інші міни)
- 3D панель у стилі класичного UI
- Анімований заголовок
- Ефекти перемоги / поразки
- Повний рестарт гри

---

### 🛠️ Технології

- React
- Vite
- SCSS Modules
- Framer Motion
- Clean Architecture

---

## 🇬🇧 English Version

### 📌 About the Project

This is a modern implementation of the classic Minesweeper game built with:

- React (hooks)
- Clean architecture principles
- SCSS modules
- Vite
- Framer Motion animations
- Custom 3D UI styling

The project was fully refactored to demonstrate:

- proper hook structure
- isolated game logic
- clean UI layer
- scalable architecture

---

### 🧠 Architecture

The project is structured into 3 layers:

1. **Game Logic Layer (`src/game`)**
   - Mine generation
   - Flood fill algorithm
   - Neighbor calculations

2. **State Orchestration Layer**
   - Game status management
   - Timer control
   - Flag limitations
   - First click safety

3. **UI Layer**
   - StatusBar
   - Field
   - Cell
   - AnimatedTitle
   - Win / GameOver screens
   - Animations

---

### ✨ Features

- Safe first click
- Flag count limitation
- Flood-fill for empty cells
- Distinction between:
  - triggered mine (bombed)
  - other revealed mines (bomb)
- 3D panel styling
- Animated title
- Win / defeat effects
- Full game restart

---

### 🚀 Live Demo

https://react-minesweeper-ui.netlify.app

---

