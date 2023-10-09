"use strict";

let todoList = [];
const BASE_URL = "https://api.jsonbin.io/v3/b/65240ee054105e766fbfe40d";
const SECRET_KEY = "$2a$10$RoPadWb/CJdzVHS3sO3ki.s3gaWiABZ6sY5KoRW4Ml38Q1qLcnyOK";

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
    const tableBody = $("#todoListView")[0];
    const filterInput = $("#inputSearch")[0];
    const listOfSearch = $("#listOfSearch")[0];
    if (tableBody.childElementCount === 0) {
        // Hide the tableDiv
        $("#tableDiv")[0].style.display = 'none';
      } else {
        // Show the tableDiv
        $("#tableDiv")[0].style.display = 'block'; // or your desired display style
      }

    // Remove all elements
    clearElementChildren(tableBody);
    clearElementChildren(listOfSearch);

    // Add all elements
    for (let index in todoList) {
        const todo = todoList[index];
         let row =  createTodoRow(todo,index)
        //add to table
        tableBody.appendChild(row)

        // Filter the data
        if (todo.title.includes(filterInput.value) && filterInput.value !== "") {
                row = createTodoRow(todo);
            listOfSearch.appendChild(row);
        }
    }
    updateJSONbin();
};

const clearElementChildren = function(element) {
    element.innerHTML='';
};

const deleteTodo = function(index) {
    todoList.splice(index, 1); 
};

const addTodo = function() {
    // Get the elements in the form
    const inputTitle = $("#inputTitle")[0];
    const inputDescription = $("#inputDescription")[0];
    const inputPlace = $("#inputPlace")[0];
    const inputDate = $("#inputDate")[0];

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
function createTodoRow(todo,index) {
    // const row = document.createElement('tr');
    // row.innerHTML = `
    //   <td>${todo.title}</td>
    //   <td>${todo.description}</td>
    //   <td>${todo.place}</td>
    //   <td>${todo.dueDate}</td>
    //   <td><input class="btn btn-light" type="button" value="x" onclick="deleteTodo(${index}); updateTodoList();"></td>
    // `;
    var row = $("<tr>");

// Tworzenie komórek td i przypisanie im zawartości
    row.append(`<td>${todo.title}</td>`);
    row.append(`<td>${todo.description}</td>`);
    row.append(`<td>${todo.place}</td>`);
    row.append(`<td>${todo.dueDate}</td>`);

// Tworzenie przycisku i przypisanie obsługi kliknięcia
    var deleteButton = $("<input>").addClass("btn btn-light").attr("type", "button").val("x");
    deleteButton.on("click", function() {
        deleteTodo(index);
        updateTodoList();
    });
    row.append($("<td>").append(deleteButton));
    return row[0];
  }

$(document).ready(function() {
    $("#filterForm").submit(function(event) {
        event.preventDefault();
        let startDate = $("#startDate").val();
        let endDate = $("#endDate").val();




    });
});