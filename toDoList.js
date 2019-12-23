function _$(className, parentNode) {
	if (parentNode) {
		return parentNode.getElementsByClassName(className);
	} else {
		return document.getElementsByClassName(className);
	}
}
//var tasksListObj = new Object();
var todoList = _$("todolist")[0];
todoList.addEventListener("click", addNewTask, false);
todoList.addEventListener("keydown", addNewTask, false);

var isAllowedToDisplay = true;
var todolistFooter = _$("todolist-footer")[0];
todolistFooter.addEventListener("click", checkIsAllowedToDisplay, false);
function checkIsAllowedToDisplay() {
	switch (event.target) {
		case _$("complete-btn")[0]:
			isAllowedToDisplay = false;
			break;
		case _$("add-btn")[0]:
			isAllowedToDisplay = true;
			break;
		case _$("active-btn")[0]:
			isAllowedToDisplay = true;
			break;
	}
}
function addNewTask(event) {
	var addBtn = _$("add-btn")[0];
	var newTaskInputBox = _$("new-task")[0];
	var isEmpty = checkIsEmpty(newTaskInputBox);
	if (13 === event.keyCode || event.target === addBtn) {
		if (!isEmpty) {
			putNewTaskIntoStorage();
			if (isAllowedToDisplay) {
				displayNewTask();
			}
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
	//tasksListObj[newTaskInputBox.value] = "notDone";
	//localStorage.setItem("test",JSON.stringify(tasksListObj));
	localStorage.setItem(`${newTaskInputBox.value}`, "notDone");
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

_$("todolist-body")[0].addEventListener("click", finishTask, false);
function finishTask(event) {
	var statusBox = event.target;
	var taskContent = _$("task-content", statusBox.parentNode)[0];
	if ("task-status-box" === statusBox.className) {
		var isFinished = statusBox.checked;
		var currentTaskLine = statusBox.parentNode;
		if (isFinished) {
			changeStylesToFinished(currentTaskLine);
		}
	}
	toggleTaskStorageStatus(taskContent.innerHTML);
}
function changeStylesToFinished(taskLine) {
	taskLine.style.color = "gray";
	taskLine.style.textDecoration = "line-through";
}
function changeStylesToUnfinished(taskLine) {
	taskLine.style.color = "black";
	taskLine.style.textDecoration = "none";
}
function toggleTaskStorageStatus(taskContentLiteral) {
	var taskStatus = localStorage.getItem(taskContentLiteral);
	"notDone" === taskStatus
		? (localStorage[taskContentLiteral] = "Done")
		: (localStorage[taskContentLiteral] = "notDone");
}

function showAllTasks() {
	var listOfTodo = _$("list-of-todo")[0];
	removeDisplayedTasks();
	for (let i = 0; i < localStorage.length; i++) {
		var taskContentLiteral = localStorage.key(i);
		var taskStatus = localStorage.getItem(taskContentLiteral);
		var targetListLine = document.createElement("li");
		targetListLine.innerHTML = `<input type="checkbox" class="task-status-box">
    <span class="task-content">${taskContentLiteral}</span>`;
		if ("Done" === taskStatus) {
			targetListLine.firstChild.checked = true;
			changeStylesToFinished(targetListLine);
		} else {
			changeStylesToUnfinished(targetListLine);
		}
		listOfTodo.appendChild(targetListLine);
	}
	setListNumber();
}
function showActiveTasks() {
	var listOfTodo = _$("list-of-todo")[0];
	removeDisplayedTasks();
	for (let i = 0; i < localStorage.length; i++) {
		var taskContentLiteral = localStorage.key(i);
		var taskStatus = localStorage.getItem(taskContentLiteral);
		var targetListLine = document.createElement("li");
		if ("notDone" === taskStatus) {
			targetListLine.innerHTML = `<input type="checkbox" class="task-status-box">
      <span class="task-content">${taskContentLiteral}</span>`;
			listOfTodo.appendChild(targetListLine);
		}
	}
	setListNumber();
}
function showCompletedTasks() {
	var listOfTodo = _$("list-of-todo")[0];
	removeDisplayedTasks();
	for (let i = 0; i < localStorage.length; i++) {
		var taskContentLiteral = localStorage.key(i);
		var taskStatus = localStorage.getItem(taskContentLiteral);
		var targetListLine = document.createElement("li");
		if ("Done" === taskStatus) {
			targetListLine.innerHTML = `<input type="checkbox" class="task-status-box">
      <span class="task-content">${taskContentLiteral}</span>`;
			changeStylesToFinished(targetListLine);
			listOfTodo.appendChild(targetListLine);
		}
	}
	setListNumber();
}

function removeDisplayedTasks() {
	var listToBeOperated = _$("list-of-todo")[0];
	while (listToBeOperated.firstChild) {
		listToBeOperated.removeChild(listToBeOperated.firstChild);
	}
}
