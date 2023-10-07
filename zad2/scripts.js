"use strict";

let todoList = [];
const BASE_URL = "https://api.jsonbin.io/v3/b/6521673c12a5d37659888771";
const SECRET_KEY = "$2a$10$LnI/PWHTHeLvdeSZKB4JOuulFrF4ppPOQnYBl63ouzV22PcVgCIjC";

const initList = function() {
    $.ajax({
        url: BASE_URL,
        type: 'GET',
        headers: {
            'X-Master-Key': SECRET_KEY
        },
        success: handleInitListSuccess,
        error: handleAjaxError
    });
};

const handleInitListSuccess = function(data) {
    if (data !== undefined) {
        todoList = data.record;
    } else {
        console.log("Data is undefined. Check the server response.");
    }
};

const handleAjaxError = function(err) {
    console.log("Error in AJAX request:", err.responseJSON);
};

const updateTodoList = function() {
    const todoListDiv = document.getElementById("todoListView");
    const filterInput = document.getElementById("inputSearch");
    const listOfSearch = document.getElementById("listOfSearch");

    // Remove all elements
    clearElementChildren(todoListDiv);
    clearElementChildren(listOfSearch);

    // Add all elements
    for (let index in todoList) {
        const todo = todoList[index];
        const newElement = document.createElement("div");
        const newContent = document.createTextNode(
            `${todo.title} ${todo.description} ${todo.place} ${todo.dueDate}`
        );

        newElement.appendChild(newContent);
        todoListDiv.appendChild(newElement);

        // Delete button
        const newDeleteButton = document.createElement("input");
        newDeleteButton.type = "button";
        newDeleteButton.value = "x";

        // Use a closure to capture the current index
        newDeleteButton.addEventListener("click", function() {
            deleteTodo(index);
            updateTodoList(); // Call updateTodoList after modification
        });

        newElement.appendChild(newDeleteButton);
        todoListDiv.appendChild(newElement);

        // Filter the data
        if (todo.title.includes(filterInput.value) && filterInput.value !== "") {
            const searchResult = document.createElement("div");
            const resultContent = document.createTextNode(
                `${todo.title} ${todo.description} ${todo.place} ${todo.dueDate}`
            );

            searchResult.appendChild(resultContent);
            listOfSearch.appendChild(searchResult);
        }
    }

    updateJSONbin();
};

const clearElementChildren = function(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

const deleteTodo = function(index) {
    todoList.splice(index, 1);
};

const addTodo = function() {
    // Get the elements in the form
    const inputTitle = document.getElementById("inputTitle");
    const inputDescription = document.getElementById("inputDescription");
    const inputPlace = document.getElementById("inputPlace");
    const inputDate = document.getElementById("inputDate");

    // Get the values from the form
    const newTitle = inputTitle.value;
    const newDescription = inputDescription.value;
    const newPlace = inputPlace.value;
    const newDate = new Date(inputDate.value);

    // Create new item
    const newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };

    // Add item to the list
    todoList.push(newTodo);
};

const updateJSONbin = function() {
    $.ajax({
        url: BASE_URL,
        type: 'PUT',
        headers: {
            'X-Master-Key': SECRET_KEY
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: handleUpdateJsonSuccess,
        error: handleAjaxError
    });
};

const handleUpdateJsonSuccess = function(data) {
    console.log(data);
};

// Initialize the list
initList();

// Periodically update the todo list
setInterval(updateTodoList, 1000);
