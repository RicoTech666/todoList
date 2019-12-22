function _$(className) {
  return document.getElementsByClassName(className);
}

function addNewTask(event) {
	var addBtn = _$("add-btn")[0];
	var newTaskInputBox = _$("new-task")[0];
	var isEmpty = checkIsEmpty(newTaskInputBox);
	if (13 === event.keyCode || event.target === addBtn) {
		if (!isEmpty) {
      putNewTaskIntoStorage();
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
function putNewTaskIntoStorage() {
  var newTaskInputBox = _$("new-task")[0];
  localStorage.setItem(newTaskInputBox.value, true);
}
function putNewTaskIntoList() {
	var newTaskInputBox = _$("new-task")[0];
	var listOfTodo = _$("list-of-todo")[0];
	var targetListLine = document.createElement("li");
	targetListLine.innerHTML = `<input type="checkbox" class="task-status-box"> ${newTaskInputBox.value.trim()}`;
	listOfTodo.appendChild(targetListLine);
}

function clearInputBox() {
	var newTaskInputBox = _$("new-task")[0];
	newTaskInputBox.innerHTML = "";
}

function getAddPermission(event) {
  if(event.target === _$("active-btn")[0]) {
   return true;
  } else if (event.target === _$("complete-btn")[0]) {
   return false;
  }
}