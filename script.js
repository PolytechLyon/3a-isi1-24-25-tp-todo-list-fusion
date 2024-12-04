const addButton = document.getElementById("new-todo-item-add");
const confirmButton = document.getElementById("edit-todo-item-confirm");
const cancelButton = document.getElementById("edit-todo-item-cancel");

const inputTextCreate = document.getElementById("new-todo-item-title");
const inputTextEdit = document.getElementById("edit-todo-item-title");

const createBox = document.getElementById("new-item");
const editBox = document.getElementById("edit-item");

let currentItem = null;

registerListeners();

function registerListeners() {
	addButton.addEventListener('click', addCreateButtonClicked);
	confirmButton.addEventListener("click", function (e) {
		confirmButtonClicked(e);
	});
	cancelButton.addEventListener("click", function (e) {
		switchToCreateMode();
	});
	inputTextCreate.addEventListener("keypress", function (e) {
		if (e.key == 'Enter') {
			e.stopPropagation();
			addCreateButtonClicked(e);
		}
	});
	inputTextEdit.addEventListener("keypress", function (e) {
		if (e.key == 'Enter')
			confirmButtonClicked(e);
	});
}

function addCreateButtonClicked(event) {
	addTodo(inputTextCreate.value);
	inputTextCreate.value = "";
}

function confirmButtonClicked(event) {
	editTodo(currentItem);
	switchToCreateMode();
}

function createEditButton(liItem) {
	const editButton = document.createElement("button");
	editButton.innerText = "Edit";
	editButton.addEventListener("click", function (e) {
		switchToEditMode();
		inputTextEdit.value = liItem.firstChild.innerText;
		currentItem = liItem;
	});
	liItem.append(editButton);
}

function createDeleteButton(liItem) {
	const removeButton = document.createElement("button");
	removeButton.innerText = "Delete";
	removeButton.addEventListener("click", function (e) {
		liItem.remove();
	});
	liItem.append(removeButton);
}

function createTextItem(liItem, texte) {
	const newItemText = document.createElement("span");
	newItemText.innerText = texte;
	newItemText.style.display = "inline-block";
	newItemText.style.width = "15em";
	liItem.append(newItemText);
}

function addTodo(nom) {
	const orderedList = document.getElementById("todo-list");
	const newItem = document.createElement("li");
	createTextItem(newItem, nom);
	createEditButton(newItem);
	createDeleteButton(newItem);
	orderedList.append(newItem);
}

function switchToEditMode() {
	createBox.hidden = true;
	editBox.hidden = false;
}

function switchToCreateMode() {
	createBox.hidden = false;
	editBox.hidden = true;
}

function editTodo(liItem) {
	liItem.firstChild.innerText = inputTextEdit.value;
}
