let inp = document.querySelector("#inp")
let btn=document.querySelector("#btn")
let list=document.querySelector("#list")
let del=document.querySelectorAll("#item span")
let taskCount=document.querySelector('#taskCount')
let clear=document.querySelector('#clear')


function showTasks(flag) {
    let tasks=localStorage.getItem('todoList');

    if(tasks==null){
        localStorage.setItem('todoList',JSON.stringify([]));
        return ;
    }

    let items="";

    tasksArr=JSON.parse(tasks);
    let count=tasksArr.length;

    tasksArr.forEach((task,index) => {
        items+=`<li id="item"> <div>${task}</div> <span ><i onclick="edit(${index})" class="fas fa-edit"></i><i onclick="moveUp(${index})" class="fa fa-arrow-up" ></i> <i onclick="moveDown(${index})" class="fas fa-arrow-down"></i> <i onclick="deleteTask(${index})" class="fas fa-trash"></i></span></li>`;   
    });

    list.innerHTML=items;

    let allLi=document.querySelectorAll('#item');
    
    allLi.forEach((li,index) => {
        cls=`color${index%3}`;
        li.classList.add(cls);
    });

    if(count==0){
        count="no";
    }

    if(!flag){
        let i = 0;
        let txt = `You have ${count} tasks pending`;
        
        console.log(txt);

        if(count==1){
            txt=txt.slice(0,15)+txt.slice(16,txt.length);
        }
        let speed = 40;
        taskCount.innerHTML="";

        function typeWriter() {
            if (i < txt.length) {
                taskCount.innerHTML += txt.charAt(i);
                console.log(taskCount.innerHTML);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();

    }
    
}

showTasks(0);

function addTask(e) {
    if(e.type==="keypress" && e.keyCode!==13)
        return ;
    let text=inp.value;
    if(text.trim()===""){
        alert('Tasks can not be empty!!');
        inp.value="";
        return ;
    }
    let tasks=localStorage.getItem('todoList');
    tasksArr=JSON.parse(tasks);
    tasksArr.push(text);
    tasks=JSON.stringify(tasksArr);
    localStorage.setItem('todoList',tasks);
    showTasks(0);
    inp.value="";
}

btn.addEventListener('click',addTask);
inp.addEventListener('keypress',addTask);

function deleteTask(index){
    let tasks=localStorage.getItem('todoList');
    let tasksArr=JSON.parse(tasks);
    tasksArr.splice(index,1);
    tasks=JSON.stringify(tasksArr);
    localStorage.setItem('todoList',tasks);
    showTasks(0);
}

function edit(index) {
    let li=document.querySelectorAll('#list li');
    let editHTML=`<div id="edit-field">
    <input id="editInp${index}" type="text" >
    <button onclick="editAdd(${index})"  id="editBtn" class="color${index%3}">ADD</i></button>
    </div>`  
    let tasks=localStorage.getItem('todoList');
    let tasksArr=JSON.parse(tasks);
    

    li[index].removeAttribute('id');
    cls=`color${index%3}`;
    li[index].classList.remove(cls);
    li[index].innerHTML=editHTML;
    document.querySelector(`#editInp${index}`).value=tasksArr[index];
}

function editAdd(index) {

    let editText=document.querySelector(`#editInp${index}`).value;
    if(editText.trim()==""){
        alert('Tasks can not be empty!!');
        inp.value="";
        return ;
    }
    let tasks=localStorage.getItem('todoList');
    let tasksArr=JSON.parse(tasks);
    tasksArr[index]=editText;


    tasks=JSON.stringify(tasksArr);
    localStorage.setItem('todoList',tasks);


    let li=document.querySelectorAll('#list li');

    items=`<div>${tasksArr[index]}</div> <span ><i onclick="edit(${index})" class="fas fa-edit"></i><i onclick="moveUp(${index})" class="fa fa-arrow-up" ></i> <i onclick="moveDown(${index})" class="fas fa-arrow-down"></i> <i onclick="deleteTask(${index})" class="fas fa-trash"></i></span>`;   
    
    li[index].setAttribute('id','item');
    li[index].innerHTML=items;
    li[index].classList.add(`color${index%3}`);
}

function moveUp(index) {
    let tasks=localStorage.getItem('todoList');
    let tasksArr=JSON.parse(tasks);


    if(index!=0){
        [tasksArr[index], tasksArr[index-1]] = [tasksArr[index-1], tasksArr[index]];
    }
    tasks=JSON.stringify(tasksArr);
    localStorage.setItem('todoList',tasks);
    showTasks(1);
}

function moveDown(index) {
    let tasks=localStorage.getItem('todoList');
    let tasksArr=JSON.parse(tasks);

    if(index!=tasksArr.length-1){
        [tasksArr[index], tasksArr[index+1]] = [tasksArr[index+1], tasksArr[index]];
    }
    tasks=JSON.stringify(tasksArr);
    localStorage.setItem('todoList',tasks);
    showTasks(1);
}

clear.addEventListener('click',clearAll);

function clearAll() {
    let tasks=localStorage.getItem('todoList');
    let tasksArr=JSON.parse(tasks);
    tasksArr.splice(0, tasksArr.length);
    tasks=JSON.stringify(tasksArr);
    localStorage.setItem('todoList',tasks);
    showTasks(0);

} 

function getDate() {
    let today = new Date().toISOString().slice(0, 10)
    let date=document.querySelector('#date');
    date.innerHTML=today;
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[d.getDay()];
    document.querySelector('#day').innerHTML=n;
} 

getDate();