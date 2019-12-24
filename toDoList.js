var tasksListObj = new Object();

function _$(className, parentNode) {
	if (parentNode) {
		return parentNode.getElementsByClassName(className);
	} else {
		return document.getElementsByClassName(className);
	}
}

_$("complete-btn")[0].setAttribute("isAllowedToDisplay", true);
_$("todolist-footer")[0].addEventListener("click", setIsAllowedToDisplay, false);
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
	if ("" === inputBox.value) {
		return true;
	} else {
		return false;
	}
}
function putNewTaskIntoStorage() {
	var newTaskInputBox = _$("new-task")[0];
	tasksListObj[newTaskInputBox.value] = "notDone";
	localStorage.setItem("tasksListObj", JSON.stringify(tasksListObj));
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
	}

	toggleTaskStorageStatus(taskContent);
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
	tasksListObj = JSON.parse(localStorage.getItem("tasksListObj"));
	var taskStatus = tasksListObj[taskContentLiteral];
	"notDone" === taskStatus
		? (tasksListObj[taskContentLiteral] = "Done")
		: (tasksListObj[taskContentLiteral] = "notDone");
	localStorage.setItem("tasksListObj", JSON.stringify(tasksListObj));
}

function showAllTasks() {
	var listOfTodo = _$("list-of-todo")[0];
	tasksListObj = JSON.parse(localStorage.getItem("tasksListObj"));
	removeAllDisplayedTasksFromList();
	for (let key in tasksListObj) {
		var taskContentLiteral = key;
		var taskStatus = tasksListObj[key];
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
	addDeleteTaskButton();
}
function showActiveTasks() {
	var listOfTodo = _$("list-of-todo")[0];
	tasksListObj = JSON.parse(localStorage.getItem("tasksListObj"));
	removeAllDisplayedTasksFromList();
	for (let key in tasksListObj) {
		var taskContentLiteral = key;
		var taskStatus = tasksListObj[key];
		var targetListLine = document.createElement("li");
		if ("notDone" === taskStatus) {
			targetListLine.innerHTML = `<input type="checkbox" class="task-status-box">
      <span class="task-content">${taskContentLiteral}</span>`;
			listOfTodo.appendChild(targetListLine);
		}
	}
	setListNumber();
	addDeleteTaskButton();
}
function showCompletedTasks() {
	var listOfTodo = _$("list-of-todo")[0];
	tasksListObj = JSON.parse(localStorage.getItem("tasksListObj"));
	removeAllDisplayedTasksFromList();
	for (let key in tasksListObj) {
		var taskContentLiteral = key;
		var taskStatus = tasksListObj[key];
		var targetListLine = document.createElement("li");
		if ("Done" === taskStatus) {
			targetListLine.innerHTML = `<input type="checkbox" class="task-status-box">
			<span class="task-content">${taskContentLiteral}</span>`;
			_$("task-status-box",targetListLine)[0].setAttribute("checked",true);
			changeStylesToFinished(targetListLine);
			listOfTodo.appendChild(targetListLine);
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
	var currentTaskLine = event.target.parentNode;
	console.log(currentTaskLine);
	var taskContentLiteral = _$("task-content",currentTaskLine)[0].innerHTML;
	var currentTaskList = currentTaskLine.parentNode;
	removeSingleTaskFromStorage(taskContentLiteral);
	currentTaskList.removeChild(currentTaskLine);
	
}
function removeSingleTaskFromStorage(taskToBeDeleted) {
	tasksListObj = JSON.parse(localStorage.getItem("tasksListObj"));
	console.log("before deletion is:");
	console.log(tasksListObj);
	delete tasksListObj[taskToBeDeleted];
	console.log("after deletion is:")
	console.log(tasksListObj);
	localStorage.setItem("tasksListObj", JSON.stringify(tasksListObj));
	console.log("store it in and take it out again looks like:")
	console.log(tasksListObj);
}
