// Tüm Elementleri Seçme..
// Card 1 
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
// Card 2 
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

EventListeners();

function EventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    if(confirm("Tüm Todo'ları Silmek İstediğinize Emin Misiniz ?")){
        // arayüzden todoları silme.
        while(todoList.firstElementChild!=null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("warning", "Başarıyla Silindi...");

    }
}
function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display : none !important"); // bulunamadı
        }
        else {
            listItem.setAttribute("style", "display : block");
        }
    })

}
function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1);     // Arrayden değeri silme..
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}
function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if (newTodo === "") {
        showAlert("danger", "Lütfen Bir Todo Giriniz...");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo Başarıyla Eklendi...")
    }


    e.preventDefault();
}
function getTodosFromStorage() { // storageden todoları alma
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));


}

function showAlert(type, message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // setTimeOut
    setTimeout(function () {
        alert.remove();
    }, 5000);
}


function addTodoToUI(newTodo) {


    // Link Item Oluşturma 
    const listItem = document.createElement("li");
    // Link Oluşturma 
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";


    listItem.className = "list-group-item d-flex justify-content-between"
    // Text Node Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo List'e List Item'i ekleme.
    todoList.appendChild(listItem);

    // Input'u Temizleme. 

    todoInput.value = "";

    console.log(listItem);


}
