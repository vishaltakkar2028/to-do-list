let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const todayList = document.getElementById("todayList");
const upcomingList = document.getElementById("upcomingList");
const completedList = document.getElementById("completedList");

const todayDate = new Date().toISOString().split("T")[0];

document.getElementById("todayDate").innerText =
"Today: " + new Date().toDateString();

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

todayList.innerHTML="";
upcomingList.innerHTML="";
completedList.innerHTML="";

tasks.forEach((task,index)=>{

let li=document.createElement("li");

let left=document.createElement("div");
left.className="task-left";

let checkbox=document.createElement("input");
checkbox.type="checkbox";
checkbox.checked=task.completed;

checkbox.onchange=()=>{

task.completed=checkbox.checked;

saveTasks();
renderTasks();

};

let text=document.createElement("span");
text.innerText=task.text;

if(task.completed){
text.classList.add("completed");
}

left.appendChild(checkbox);
left.appendChild(text);

let del=document.createElement("button");
del.innerText="Delete";
del.className="delete";

del.onclick=()=>{

tasks.splice(index,1);
saveTasks();
renderTasks();

};

li.appendChild(left);
li.appendChild(del);

if(task.completed){
completedList.appendChild(li);
}
else if(task.date===todayDate){
todayList.appendChild(li);
}
else{
upcomingList.appendChild(li);
}

});

}

function addTask(){

let input=document.getElementById("taskInput");

let text=input.value.trim();

if(text==="") return;

tasks.push({

text:text,
date:todayDate,
completed:false

});

input.value="";

saveTasks();

renderTasks();

}

function endOfDayReminder(){

let unfinished=tasks.filter(t=>!t.completed && t.date===todayDate);

if(unfinished.length>0){

alert("Reminder: You still have unfinished tasks for today!");

}

}

function scheduleReminder(){

let now=new Date();

let reminder=new Date();

reminder.setHours(21,0,0);

let diff=reminder-now;

if(diff<0){
diff+=86400000;
}

setTimeout(()=>{

endOfDayReminder();

setInterval(endOfDayReminder,86400000);

},diff);

}

scheduleReminder();

renderTasks();