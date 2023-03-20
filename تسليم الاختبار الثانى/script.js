let btn=document.getElementById('btn')
let input=document.getElementById('inp')
let boxes=document.querySelectorAll('.box')
let drag=null
let tasksLists = Array.from(document.querySelectorAll('.box'));
let text
//localStorage.clear()
//rendrHtml()
if (window.localStorage.getItem("list-1") != null) {
  getListsFromLocalStorage();
  controlsHandler()
  dragItem();
}
btn.onclick=function () {
  if(input.value!=''){
    text=input.value
    boxes[0].innerHTML+=`<div class="item" draggable="true">
    <p  style="width:50%" maxlength="20">${text}</p>
    <div>
    <button class="edit-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
</button>
    <button class="trash-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>
    </button>
</div>
  </div>`
  input.value=''
  }
  dragItem()
  controlsHandler()
}

function dragItem(){
let items=document.querySelectorAll('.item')
items.forEach(item=>{
item.addEventListener('dragstart',function () {
  drag=item
  item.style.opacity='0.5'
})
item.addEventListener('dragend',function () {
  // to enaple us drag another item
drag=null
//to return normal opacity
item.style.opacity='1'
setListsToLocalStorage();
})
boxes.forEach(box=>{
  box.addEventListener('dragover',function (e) {
    e.preventDefault()
    this.style.background='#090'
    this.style.color='#fff'
    setListsToLocalStorage();

  })
  box.addEventListener('dragleave',function () {
    this.style.background='#fff'
    this.style.color='#000'
  
    setListsToLocalStorage();
  })
  box.addEventListener('drop',function () {
   box.append(drag);
   this.style.background='#fff'
    this.style.color='#000'
  
    setListsToLocalStorage();
  })
})
})
}

function editAction() {

  console.log("you are clicked edit button");
  let currentTask = this.parentElement.parentElement.children[0];
  currentTask.contentEditable = true;
  text=currentTask.textContent
  currentTask.classList.toggle('edit')
  makeAllTasksDisable(currentTask)

}
function trashAction() {
  let currentTaskContainer = this.parentElement.parentElement;
  currentTaskContainer.remove()
  setListsToLocalStorage()
  console.log("you are clicked trash button");

}
function makeAllTasksDisable(currentTask) {
  window.onclick = (e) => {
    if (!currentTask.contains(e.target)) {
      let editBtns = Array.from(document.querySelectorAll('.edit-button'));
      editBtns.forEach(btn => {
        let allTasksInput = btn.parentElement.parentElement.children[0];
        console.log(allTasksInput);
        allTasksInput.setAttribute('value', `${allTasksInput.textContent}`);
        allTasksInput.setAttribute('disabled', 'true');
        btn.classList.remove('hide');
        // set Lists To Local Storage
        setListsToLocalStorage();
      })
    }
  }
}
function controlsHandler() {
  let editButtons=document.querySelectorAll('.edit-button')
  let deleteButtons=document.querySelectorAll('.trash-button')

  editButtons.forEach(editButton=>{
    editButton.addEventListener('click',editAction)
    setListsToLocalStorage();

  })
  deleteButtons.forEach(deleteButton=>{
    deleteButton.addEventListener('click',trashAction)
    setListsToLocalStorage();

  })

}
function setListsToLocalStorage() {
  let tasksLists = Array.from(document.querySelectorAll('.box'));
  let tasksFromList0 = tasksLists[0].innerHTML;
  let tasksFromList1 = tasksLists[1].innerHTML;
  let tasksFromList2 = tasksLists[2].innerHTML;
  window.localStorage.setItem("list-0", tasksFromList0);
  window.localStorage.setItem("list-1", tasksFromList1);
  window.localStorage.setItem("list-2", tasksFromList2);
}


function getListsFromLocalStorage() {
  tasksLists[0].innerHTML = window.localStorage.getItem("list-0");
  tasksLists[1].innerHTML = window.localStorage.getItem("list-1");
  tasksLists[2].innerHTML = window.localStorage.getItem("list-2");
}
