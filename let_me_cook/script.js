const items = localStorage.getItem("items");
let editMode = false;
if (items === null || items === "") {
    localStorage.setItem("items", "");
} else {
    let itemsArray = items.split(",");
    itemsArray.forEach((item) => {
        addItem(item);
    });
}

function addItem(newItemTitle) {
    const ol = document.getElementById("todo-list");
    const newLi = document.createElement("li");
    newLi.setAttribute("index", ol.children.length);
    const newLiTitle = document.createElement("p");
    newLiTitle.innerText = newItemTitle;
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

const addBtn = document.getElementById("new-todo-item-add");

addBtn.addEventListener("click", function () {
    const newItemTitle = document.getElementById("new-todo-item-title");
    addItem(newItemTitle.value);
    localStorage.setItem(
        "items",
        localStorage
            .getItem("items")
            .split(",")
            .concat(newItemTitle.value)
            .join(",")
    );
    newItemTitle.value = "";
});

function deleteItem(e) {
    const index = e.target.parentNode.getAttribute("index");
    e.target.parentNode.remove();
    let itemsArray = localStorage.getItem("items").split(",");
    itemsArray.splice(index, 1);
    localStorage.setItem("items", itemsArray.join(","));
}

function editItem(e) {
    const title = e.target.parentNode.querySelector("p");
    title.setAttribute("id", "editable-item");
    document.getElementById("new-item").style.display = "none";
    document.getElementById("edit-item").style.display = "block";
    document.getElementById("edit-todo-item-title").value = title.innerText;
    editMode = true;
}

document
    .getElementById("edit-todo-item-confirm")
    .addEventListener("click", function () {
        document.getElementById("editable-item").innerText =
            document.getElementById("edit-todo-item-title").value;

        let itemsArray = localStorage.getItem("items").split(",");
        itemsArray[
            document
                .getElementById("editable-item")
                .parentNode.getAttribute("index")
        ] = document.getElementById("edit-todo-item-title").value;
        localStorage.setItem("items", itemsArray.join(","));

        document.getElementById("new-item").style.display = "block";
        document.getElementById("edit-item").style.display = "none";
        document.getElementById("editable-item").removeAttribute("id");
        editMode = false;
    });

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document
            .getElementById(
                editMode ? "edit-todo-item-confirm" : "new-todo-item-add"
            )
            .click();
    }
});
