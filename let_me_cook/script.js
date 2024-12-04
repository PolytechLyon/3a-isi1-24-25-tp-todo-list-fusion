const items = localStorage.getItem("items");
if (items === null) {
  localStorage.setItem("items", []);
} else {
  items.forEach(e => {
    addItem(e);
  });
}

function addItem(newItemTitle) {
  const ol = document.getElementById("todo-list");
  const newLi = document.createElement("li");
  const newLiTitle = document.createElement("p");
  newLiTitle.innerText = newItemTitle.value;
  newLi.appendChild(newLiTitle);

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("edit-todo-item");
  editButton.addEventListener("click", editItem);
  newLi.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-todo-item");
  deleteButton.addEventListener("click", deleteItem);
  newLi.appendChild(deleteButton);

  ol.appendChild(newLi);
}

const newItemTitle = document.getElementById("new-todo-item-title");
const addBtn = document.getElementById("new-todo-item-add");

addBtn.addEventListener("click", function () {
  addItem(newItemTitle);
  localStorage.setItem(
    "items",
    localStorage.getItem("items").push(newItemTitle.value)
  );
  newItemTitle.value = "";
});

function deleteItem(e) {
  e.target.parentNode.remove();
}

function editItem(e) {
  const title = e.target.parentNode.querySelector("p");
  title.setAttribute("id", "editable-item");
  document.getElementById("new-item").style.display = "none";
  document.getElementById("edit-item").style.display = "block";
  document.getElementById("edit-todo-item-title").value = title.innerText;
}

document
  .getElementById("edit-todo-item-confirm")
  .addEventListener("click", function () {
    document.getElementById("editable-item").innerText =
      document.getElementById("edit-todo-item-title").value;
    document.getElementById("new-item").style.display = "block";
    document.getElementById("edit-item").style.display = "none";
    document.getElementById("editable-item").removeAttribute("id");
  });