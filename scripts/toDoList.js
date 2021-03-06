var tasksListArr = new Object();
var taskId = 1;
var tasksListArr = [];

function _$(className, parentNode) {
	if (parentNode) {
		return parentNode.getElementsByClassName(className);
	} else {
		return document.getElementsByClassName(className);
	}
}

_$("todolist-footer")[0].addEventListener("click", setIsAllowedToDisplay, false);
_$("complete-btn")[0].setAttribute("isAllowedToDisplay", true);
function setIsAllowedToDisplay() {
	switch (event.target) {
		case _$("complete-btn")[0]:
			_$("complete-btn")[0].setAttribute("isAllowedToDisplay", false);
			break;
		case _$("add-btn")[0]:
			_$("complete-btn")[0].setAttribute("isAllowedToDisplay", true);
			break;
		case _$("active-btn")[0]:
			_$("complete-btn")[0].setAttribute("isAllowedToDisplay", true);
			break;
		default:
			break;
	}
}

function checkIsAllowedToDisplay() {
	var isAllowedToDisplay = _$("complete-btn")[0].getAttribute("isAllowedToDisplay");
	if (!isAllowedToDisplay) {
		return false;
	} else {
		return true;
	}
}

function addNewTask() {
	var addBtn = _$("add-btn")[0];
	var newTaskInputBox = _$("new-task")[0];
	var isEmpty = checkIsEmpty(newTaskInputBox);
	if (13 === event.keyCode || event.target === addBtn) {
		if (!isEmpty) {
			putNewTaskIntoStorage();
			if (checkIsAllowedToDisplay()) {
				displayNewTask();
			}
			setListNumber();
			addDeleteTaskButton();
			clearInputBox();
		}
	}
}

function checkIsEmpty(inputBox) {
	return "" === inputBox.value;
}

function putNewTaskIntoStorage() {
	var newTaskInputBox = _$("new-task")[0];
	var isDone = false;
	var isDeleted = false;
	var taskObj = new TaskObj(taskId, newTaskInputBox.value, isDone, isDeleted);
	tasksListArr.push(taskObj);
	localStorage.setItem("tasksListArr", JSON.stringify(tasksListArr));
	taskId++;
}

function TaskObj(id, content, isDone, isDeleted) {
	this.id = id;
	this.content = content;
	this.isDone = isDone;
	this.isDeleted = isDeleted;
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
			if (eachListLine.firstChild.checked) {
				listNumber.style.textDecoration = "line-through";
			}
			eachListLine.prepend(listNumber);
		}
	});
}

function clearInputBox() {
	_$("new-task")[0].value = "";
}

_$("todolist-body")[0].addEventListener("click", finishTask, false);
function finishTask(event) {
	if (event.target.className === "task-status-box") {
		var statusBox = event.target;
		var taskContent = _$("task-content", statusBox.parentNode)[0].innerHTML;
		var isFinished = statusBox.checked;
		var currentTaskLine = statusBox.parentNode;

		if (isFinished) {
			changeStylesToFinished(currentTaskLine);
		} else if (!isFinished) {
			changeStylesToUnfinished(currentTaskLine);
		}
		toggleTaskStorageStatus(taskContent);
	}
}

function changeStylesToFinished(taskLine) {
	taskLine.style.color = "gray";
	taskLine.firstChild.style.textDecoration = "line-through";
	taskLine.style.textDecoration = "line-through";
}

function changeStylesToUnfinished(taskLine) {
	taskLine.style.color = "black";
	taskLine.firstChild.style.textDecoration = "none";
	taskLine.style.textDecoration = "none";
}

function toggleTaskStorageStatus(taskContentLiteral) {
	tasksListArr = JSON.parse(localStorage.getItem("tasksListArr"));
	for (let i = 0; i < tasksListArr.length; i++) {
		if (tasksListArr[i].content === taskContentLiteral) {
			tasksListArr[i].isDone = tasksListArr[i].isDone ? false : true;
		}
	}
	localStorage.setItem("tasksListArr", JSON.stringify(tasksListArr));
}

function showAllTasks() {
	var listOfTodo = _$("list-of-todo")[0];
	tasksListArr = JSON.parse(localStorage.getItem("tasksListArr"));
	removeAllDisplayedTasksFromList();
	for (let key in tasksListArr) {
		var taskContentLiteral = tasksListArr[key].content;
		var isDone = tasksListArr[key].isDone;
		var isDeleted = tasksListArr[key].isDeleted;
		var targetListLine = document.createElement("li");
		targetListLine.innerHTML = `<input type="checkbox" class="task-status-box">
		<span class="task-content">${taskContentLiteral}</span>`;
		if (!isDeleted) {
			if (isDone) {
				_$("task-status-box", targetListLine)[0].setAttribute("checked", true);
				changeStylesToFinished(targetListLine);
			} else {
				changeStylesToUnfinished(targetListLine);
			}
			listOfTodo.appendChild(targetListLine);
		}
	}
	setListNumber();
	addDeleteTaskButton();
}

function showActiveTasks() {
	var listOfTodo = _$("list-of-todo")[0];
	tasksListArr = JSON.parse(localStorage.getItem("tasksListArr"));
	removeAllDisplayedTasksFromList();
	for (let key in tasksListArr) {
		var taskContentLiteral = tasksListArr[key].content;
		var isDone = tasksListArr[key].isDone;
		var isDeleted = tasksListArr[key].isDeleted;
		var targetListLine = document.createElement("li");
		if (!isDeleted) {
			if (!isDone) {
				targetListLine.innerHTML = `<input type="checkbox" class="task-status-box">
      <span class="task-content">${taskContentLiteral}</span>`;
				listOfTodo.appendChild(targetListLine);
			}
		}
	}
	setListNumber();
	addDeleteTaskButton();
}

function showCompletedTasks() {
	var listOfTodo = _$("list-of-todo")[0];
	tasksListArr = JSON.parse(localStorage.getItem("tasksListArr"));
	removeAllDisplayedTasksFromList();
	for (let key in tasksListArr) {
		var taskContentLiteral = tasksListArr[key].content;
		var isDone = tasksListArr[key].isDone;
		var isDeleted = tasksListArr[key].isDeleted;
		var targetListLine = document.createElement("li");
		if (!isDeleted) {
			if (isDone) {
				targetListLine.innerHTML = `<input type="checkbox" class="task-status-box">
			<span class="task-content">${taskContentLiteral}</span>`;
				_$("task-status-box", targetListLine)[0].setAttribute("checked", true);
				changeStylesToFinished(targetListLine);
				listOfTodo.appendChild(targetListLine);
			}
		}
	}
	setListNumber();
	addDeleteTaskButton();
}

function removeAllDisplayedTasksFromList() {
	var listToBeOperated = _$("list-of-todo")[0];
	while (listToBeOperated.firstChild) {
		listToBeOperated.removeChild(listToBeOperated.firstChild);
	}
}

function addDeleteTaskButton() {
	var todoLines = _$("list-of-todo")[0].children;
	Array.prototype.forEach.call(todoLines, eachListLine => {
		var deleteIcon = document.createElement("i");
		deleteIcon.setAttribute("class", "iconfont icon-guanbi");
		deleteIcon.addEventListener("click", removeSingleDisplayedTaskFromList, false);
		if ("task-content" === eachListLine.lastChild.className) {
			eachListLine.appendChild(deleteIcon);
		}
	});
}

function removeSingleDisplayedTaskFromList(event) {
	var confirmResult = confirm("Are you sure to delete this task?");
	if (confirmResult) {
		var currentTaskLine = event.target.parentNode;
		var taskContentLiteral = _$("task-content", currentTaskLine)[0].innerHTML;
		var currentTaskList = currentTaskLine.parentNode;
		removeSingleTaskFromStorage(taskContentLiteral);
		currentTaskList.removeChild(currentTaskLine);
	}
}

function removeSingleTaskFromStorage(taskToBeDeleted) {
	tasksListArr = JSON.parse(localStorage.getItem("tasksListArr"));
	for (const key in tasksListArr) {
		if (tasksListArr[key].content === taskToBeDeleted) {
			tasksListArr[key].isDeleted = true;
		}
	}
	localStorage.setItem("tasksListArr", JSON.stringify(tasksListArr));
}
