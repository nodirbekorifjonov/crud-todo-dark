const formCreate = document.getElementById("form-create");
const todoList = document.querySelector(".tasks__list");
const emptySection = document.querySelector(".empty__section");

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) {
  showTodos();
} else if (todos.length == 0) {
  emptySection.classList.remove("hidden");
}

// set todos
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

// create todo
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  let todoText = formCreate["input-create"].value.trim();
  if (todoText.length) {
    todos.push({ text: todoText, completed: "false" });

    setTodos();
    showTodos();
  }

  formCreate.reset();
});

// show todos
function showTodos() {
  let todos = JSON.parse(localStorage.getItem("list")) || [];
  emptySection.classList.add("hidden");

  todoList.innerHTML = "";
  todos.forEach((item, i) => {
    todoList.innerHTML += `
    <li class="tasks__item ${
      item.completed === "true" ? "task__completed" : ""
    }" data-id="${i}">
              <div class="checkbox-wrapper-18">
                <div class="round">
                  <label>
                    <input type="checkbox" ${
                      item.completed === "true" ? "checked" : ""
                    } />
                    <span class="custom-check"></span>
                  </label>
                </div>
              </div>
              <span>
                ${item.text}
              </span>
              <div class="tasks__actions">
                <button class="edit-btn">
                  <i class="fa-solid fa-pencil"></i>
                </button>
                <button class="delete-btn">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </li>
    `;
  });
}

// set complete
todoList.addEventListener("click", (e) => {
  if (e.target.type === "checkbox") {
    const li = e.target.closest("li");
    const id = li.getAttribute("data-id");
    todos[id].completed = e.target.checked.toString();
    setTodos();
    showTodos();
  }
});
