function _$(className, parentNode) {
	if (parentNode) {
		return parentNode.getElementsByClassName(className);
	} else {
		return document.getElementsByClassName(className);
	}
}

function addNewTask(event) {
	var addBtn = _$("add-btn")[0];
	var newTaskInputBox = _$("new-task")[0];
	var isEmpty = checkIsEmpty(newTaskInputBox);
	if (13 === event.keyCode || event.target === addBtn) {
		if (!isEmpty) {
			putNewTaskIntoStorage();
			displayNewTask();
			setListNumber();
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
	localStorage.setItem(newTaskInputBox.value, "notDone");
}
function displayNewTask() {
	var newTaskInputBox = _$("new-task")[0];
	var listOfTodo = _$("list-of-todo")[0];
	var targetListLine = document.createElement("li");
	targetListLine.innerHTML = `<input type="checkbox" class="task-status-box">
   <span class="task-content">${newTaskInputBox.value.trim()}</span>`;
	listOfTodo.appendChild(targetListLine);
}
function setListNumber() {
	var todoLines = _$("list-of-todo")[0].children;
	Array.prototype.forEach.call(todoLines, (eachListLine, index) => {
		var listNumber = document.createElement("span");
		listNumber.setAttribute("class", "task-number");
		listNumber.innerHTML = `${index + 1}.`;
		if ("task-status-box" === eachListLine.firstChild.className) {
			eachListLine.prepend(listNumber);
		}
	});
}

function clearInputBox() {
	var newTaskInputBox = _$("new-task")[0];
	newTaskInputBox.innerHTML = "";
}

_$("active-btn")[0].addEventListener("click", getDisplayNewTaskPermission, false);
_$("complete-btn")[0].addEventListener("click", getDisplayNewTaskPermission, false);

function getDisplayNewTaskPermission() {
	if (window.event.target === _$("active-btn")[0]) {
		return true;
	} else if (window.event.target === _$("complete-btn")[0]) {
		return false;
	}
}


