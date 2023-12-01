//first im putting all my main elements of my html into global variables 
let form = document.getElementById('form');
let input = document.getElementById('input');
let tasks = document.getElementById('inputs');
let savedData = []

//now im going to add an eventlistener and function that will add tasks in the form of htmlContent
form.addEventListener('submit', addTask);

function addTask(e){
    e.preventDefault();
//this if statement will prevent the function from adding no value to the list
    if (input.value == ''){
        return;
    }

    let task = document.createElement('li');
    task.innerHTML = `
    <input type="checkbox">
    <p>${input.value}</p>
    <button type="button">Delete</button>
    `;
    savedData.push(input.value)
    // console.log(savedData);

//this eventlistener will allow us to check off our tasks
    task.querySelector('input[type="checkbox"]').addEventListener('change', tickDone);

//this eventlistener will allow us to remove tasks
    task.querySelector('button').addEventListener('click', delTask);

    tasks.appendChild(task);

    input.value = '';
}

//lets add our functions that will support our eventlisteners
function tickDone(e){
    let task = e.target.parentNode;
    task.querySelector('p').classList.toggle('Done');
}

function delTask(e){
    let task = e.target.parentNode;
    tasks.removeChild(task);
} 

//this function will allow us to  allsort our checked tasks to the bottom of our list
document.querySelector('[data-sort1]').addEventListener('click',moveCheckedTasksToBottom)
function moveCheckedTasksToBottom() {
    let inputs = document.getElementById('inputs');
    let checkedTasks = Array.from(inputs.getElementsByTagName('li')).filter(li => li.querySelector('input[type="checkbox"]').checked);
    checkedTasks.forEach(li => {
        inputs.removeChild(li);
        inputs.appendChild(li);
    });
}

localStorage.setItem(savedData,'TaskList')
