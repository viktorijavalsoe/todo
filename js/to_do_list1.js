//Set todays date

var dayNames =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
var monthNames = ["January","February","March","April","May","June","July","August","September",
"October","November","December"];

function printDate(){
  var now = new Date();
  document.getElementById("date").innerHTML = (dayNames[now.getDay()] + ", " + 
  monthNames[now.getMonth()] + " " + 
  now.getDate() + ", " + now.getFullYear());
}


//Create todo List


//SVG files
var removeSVG = '<svg class="svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><path d="M31.9,18.1c-0.6,0-1.2,0.5-1.2,1.2v22.1c0,0.6,0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2V19.3C33.1,18.6,32.5,18.1,31.9,18.1z"/><path d="M18.1,18.1c-0.6,0-1.2,0.5-1.2,1.2v22.1c0,0.6,0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2V19.3C19.3,18.6,18.7,18.1,18.1,18.1z"/><path d="M8,14.9v28.8c0,1.7,0.6,3.3,1.7,4.5c1.1,1.2,2.6,1.8,4.2,1.8h22.2c1.6,0,3.1-0.7,4.2-1.8c1.1-1.1,1.7-2.8,1.7-4.5V14.9 c2.2-0.6,3.6-2.7,3.3-4.9c-0.3-2.2-2.2-3.9-4.4-3.9h-6V4.6c0-1.2-0.5-2.4-1.4-3.3C32.6,0.5,31.4,0,30.2,0H19.8 c-1.2,0-2.4,0.5-3.3,1.3c-0.9,0.9-1.4,2.1-1.4,3.3v1.5h-6C6.9,6.1,5,7.8,4.7,10C4.4,12.2,5.8,14.3,8,14.9z M36.1,47.7H13.9 c-2,0-3.6-1.7-3.6-3.9V15h29.3v28.7C39.6,45.9,38.1,47.7,36.1,47.7z M17.5,4.6c0-0.6,0.2-1.2,0.7-1.6c0.4-0.4,1-0.7,1.6-0.7h10.4c0.6,0,1.2,0.2,1.6,0.7c0.4,0.4,0.7,1,0.7,1.6v1.5h-15V4.6zM9.2,8.4h31.7c1.2,0,2.1,0.9,2.1,2.1s-0.9,2.1-2.1,2.1H9.2C8,12.6,7,11.7,7,10.5S8,8.4,9.2,8.4z"/><path d="M25,18.1c-0.6,0-1.2,0.5-1.2,1.2v22.1c0,0.6,0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2V19.3C26.2,18.6,25.6,18.1,25,18.1z"/></svg>'
var completeSVG = '<svg version="1.1" id="complete_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;stroke:#74B1BB;stroke-width:2;stroke-miterlimit:10;}.st1{fill:none;stroke:#74B1BB;stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;}</style><rect x="61" y="6" width="0" height="2"/><circle class="st0" cx="25" cy="25" r="24"/><polyline class="st1" points="16.1,21.9 25.1,36 34.4,15 "/></svg>'


//if there are saved value in local storage return them, if not start en array with one hardcoded value
var data = (localStorage.getItem('todoList'))? JSON.parse(localStorage.getItem('todoList')) : {
  todo: ["create invoice for Looklet"],
  completed: []
};

renderTodoList();

document.getElementById("add").addEventListener("click", function(){
  var value = document.getElementById('item').value;
  if(value){
    addItem(value);
  } 
});


function addItem(value) {

    addItemToDOM(value);
    document.getElementById('item').value = '';
    
    // Add value to the data Array with key todo
    data.todo.push(value); 
    dataObjectUpdated();
}


function renderTodoList(){
  //if both the todo and the complete are empty close function
  if(!data.todo.length && !data.completed.length) return;

  //if either of the array not empty, loop through them
  for (var i = 0; i < data.todo.length; i ++){
    var value = data.todo[i];
    addItemToDOM(value);
  }

  for (var j = 0; j < data.completed.length; j ++){
    var value = data.completed[i];
    addItemToDOM(value, true);
  }
}

// Updates LocalStorage
function dataObjectUpdated(){

  localStorage.setItem("todoList", JSON.stringify(data));
}

// This function REMOVES item from the list
function removeItem(){

  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
     // deletes the item from array with key todo, based on items index
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  } 
  dataObjectUpdated();

  parent.removeChild(item);
}

//COMPLETE Function
function completeItem(){
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  //get parent id to see if its to do or completed ul
  var id = parent.id;
  // item.innerText strips away buttons etc from our item
  var value = item.innerText;

  if (id === 'todo') {
     // deletes the item from array with key todo, based on items index
    data.todo.splice(data.todo.indexOf(value), 1);
    // adds item to the array with key completed
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  } 

  dataObjectUpdated();

  // check if the task is completed or todo
  var target = (id === 'todo') ? target = document.getElementById('completed') : document.getElementById('todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}


// Adds a new item to the todo list
function addItemToDOM(text, completed){
 // if item belongs to completed array use ul with #completed, else use ul with #todo
  var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

  var item = document.createElement('li');
  item.textContent = text;
 
  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  // Add click event for removing items
  remove.addEventListener("click", removeItem);
 
  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;

  //Add click event for completing item
  complete.addEventListener('click', completeItem);
  
  buttons.appendChild(complete);
  buttons.appendChild(remove);
  
  item.appendChild(buttons);
 
  //Insert <li> before the first child of <ul>
  list.insertBefore(item, list.childNodes[0]);
}


/* SORT ALPHABETICALLY

document.getElementById("sort").addEventListener("click", sortList);


// The inserting does not work!!!!
function sortList(){
  var todoContainer = document.getElementById('todo');
  //gather all the LI's from the container
  var todoLis = todoContainer.querySelectorAll('li');
  // convert todoLis to an arrayvar i
  var todoItems = [];
  for (var i = 0; i < todoLis.length; i++){
    todoItems.push(todoLis[i]);
  }
  
  // sort based on innerText
  todoItems.sort(function(a,b){
    var aa = parseInt(a.innerText);
    var bb = parseInt(b.innerText);
    // if integer value is higher sort item higher in the list
    return aa < bb ? -1 : (aa > bb ? 1 : 0);
  });

  // reverse out list to be in aphabetical order
  todoItems.reverse();

  for (var i = 0; i < todoItems.length; i ++){
    console.log(todoItems[i].innerText);
    //Insert <li>  with a letter with lowest integer value before the first child of <ul> todo
    todoContainer.insertBefore(todoItems[i], todoContainer.childNodes[0]);
  }
}

*/

  



 
  







