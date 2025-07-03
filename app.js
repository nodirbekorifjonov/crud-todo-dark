const formCreate = document.getElementById("form-create");
const todoList = document.querySelector(".tasks__list");
const emptySection = document.querySelector(".empty__section");
const editModal = document.querySelector(".edit-modal");
const closeEditBtn = document.querySelector(".close-edit");
const formEdit = document.getElementById("form-edit");

let editId;

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) {
  showTodos();
  emptySection.classList.add("hidden");
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
  todos.length
    ? emptySection.classList.add("hidden")
    : emptySection.classList.remove("hidden");

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
                <button onclick="editTodo(${i})" class="edit-btn">
                  <i class="fa-solid fa-pencil"></i>
                </button>
                <button onclick="deleteTodo(${i})" class="delete-btn">
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

// delete todo
function deleteTodo(id) {
  const deletedTodos = todos.filter((item, i) => {
    return i !== id;
  });

  todos = deletedTodos;
  setTodos();
  showTodos();
}

// edit
function editTodo(id) {
  editId = id;
  formEdit["input-edit"].value = todos[id].text;
  editModal.classList.remove("hidden");
}

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  let todoText = formEdit["input-edit"].value.trim();
  formEdit.reset();
  editModal.classList.add("hidden");

  if (todoText.length && editId !== null) {
    todos[editId].text = todoText;
    setTodos();
    showTodos();
    editId = null;
  }
});

closeEditBtn.addEventListener("click", () => {
  editModal.classList.add("hidden");
});
