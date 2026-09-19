const STORAGE_KEY = "todo-list-items";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const THEME_STORAGE_KEY = "todo-list-theme";
const FILTER_STORAGE_KEY = "todo-list-filter";
const filterOptions = ["all", "active", "completed"];
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

// 讀取並驗證上次使用的篩選條件，無效值安全回退為全部。
function loadFilter() {
  const savedFilter = localStorage.getItem(FILTER_STORAGE_KEY);
  return filterOptions.includes(savedFilter) ? savedFilter : "all";
}

let currentFilter = loadFilter();

// 從瀏覽器儲存空間讀取先前的待辦事項。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch (error) {
    return [];
  }
}

let todos = loadTodos();

// 將目前清單保存到瀏覽器儲存空間。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 根據使用者設定或作業系統偏好套用顏色主題。
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☀️ 淺色模式" : "🌙 深色模式";
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "切換至淺色模式" : "切換至深色模式"
  );
}

function getInitialTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) || (systemThemeQuery.matches ? "dark" : "light");
}

applyTheme(getInitialTheme());

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
});

// 未手動設定主題時，讓頁面跟隨作業系統的主題變更。
systemThemeQuery.addEventListener("change", (event) => {
  if (!localStorage.getItem(THEME_STORAGE_KEY)) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

// 優先使用標準 ID 產生器，並支援不具備該 API 的離線瀏覽器。
function createTodoId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// 依照目前資料重新繪製清單與未完成數量。
function renderTodos() {
  todoList.replaceChildren();

  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === "active") {
      return !todo.completed;
    }
    if (currentFilter === "completed") {
      return todo.completed;
    }
    return true;
  });

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    if (todo.completed) {
      item.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為完成`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((itemTodo) => itemTodo.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    item.append(checkbox, text, deleteButton);
    todoList.append(item);
  });

  const unfinishedTodos = todos.filter((todo) => !todo.completed).length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  remainingCount.textContent = `未完成:${unfinishedTodos} 項`;
  clearCompletedButton.disabled = completedTodos === 0;
  emptyMessage.textContent = getEmptyMessage(visibleTodos.length);
  emptyMessage.hidden = visibleTodos.length > 0;
}

function getEmptyMessage(visibleTodoCount) {
  if (visibleTodoCount > 0) {
    return "";
  }
  if (todos.length === 0) {
    return "還沒有任何待辦事項,新增一個吧!";
  }
  if (currentFilter === "active") {
    return "太好了,目前沒有未完成事項!";
  }
  if (currentFilter === "completed") {
    return "目前還沒有已完成事項。";
  }
  return "還沒有任何待辦事項,新增一個吧!";
}

// 更新篩選按鈕的選中狀態。
function updateFilterButtons() {
  filterButtons.forEach((filterButton) => {
    const isActive = filterButton.dataset.filter === currentFilter;
    filterButton.classList.toggle("active", isActive);
    filterButton.setAttribute("aria-pressed", String(isActive));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    localStorage.setItem(FILTER_STORAGE_KEY, currentFilter);
    updateFilterButtons();
    renderTodos();
  });
});

clearCompletedButton.addEventListener("click", () => {
  if (!confirm("確定要清除所有已完成事項嗎？")) {
    return;
  }

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    return;
  }

  todos.push({
    id: createTodoId(),
    text,
    completed: false
  });
  saveTodos();
  renderTodos();
  todoInput.value = "";
  todoInput.focus();
});

updateFilterButtons();
renderTodos();