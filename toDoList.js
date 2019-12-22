function addNewTask(event) {
	var addBtn = document.getElementsByClassName("add-btn")[0];
	var newTaskInputBox = document.getElementsByClassName("new-task")[0];
	var isEmpty = checkIsEmpty(newTaskInputBox);
	if (13 === event.keyCode || event.target === addBtn) {
		if (!isEmpty) {
			putNewTaskIntoList();
			clearInputBox();
		}
	}
}

function checkIsEmpty(inputBox) {
	if ("" === inputBox.value) {
		return true;
	} else {
		return false;
	}
}

function putNewTaskIntoList() {
  var newTaskInputBox = document.getElementsByClassName("new-task")[0];
	var listOfTodo = document.getElementsByClassName("list-of-todo")[0];
	var targetListLine = document.createElement("li");
	targetListLine.innerHTML = `<input type="checkbox" class="task-status-box">${newTaskInputBox.value}`;
	listOfTodo.appendChild(targetListLine);
}

function clearInputBox() {
  var newTaskInputBox = document.getElementsByClassName("new-task")[0];
  newTaskInputBox.innerHTML = "";
}
