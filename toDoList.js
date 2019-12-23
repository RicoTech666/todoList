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
	_$("new-task")[0].value = "";
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

_$("todolist-body")[0].addEventListener("click", finishTask, false);
function finishTask(event) {
	var statusBox = event.target;
	var taskContent = _$("task-content", statusBox.parentNode)[0];
	if ("task-status-box" === statusBox.className) {
		var isFinished = statusBox.checked;
		if (isFinished) {
			statusBox.parentNode.style.color = "gray";
			statusBox.parentNode.style.textDecoration = "line-through";
		} else if (!isFinished) {
			statusBox.parentNode.style.color = "black";
			statusBox.parentNode.style.textDecoration = "none";
		}
	}
	toggleTaskStorageStatus(taskContent.innerHTML);
}
function toggleTaskStorageStatus(taskContentLiteral) {
	var taskStatus = localStorage.getItem(taskContentLiteral);
	"notDone" === taskStatus
		? (localStorage[taskContentLiteral] = "Done")
		: (localStorage[taskContentLiteral] = "notDone");
}

function showAllTasks() {
	var listOfTodo = _$("list-of-todo")[0];

	for (let i = 0; i < localStorage.length; i++) {
		var taskContent = localStorage.key(i);
		var targetListLine = document.createElement("li");
		targetListLine.innerHTML = `<input type="checkbox" class="task-status-box">
    <span class="task-content">${taskContent}</span>`;
    listOfTodo.appendChild(targetListLine);
  }
  setListNumber();
}
