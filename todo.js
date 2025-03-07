// // handling files in Node.js

// const fs=require("fs");
// const filepath="./tasks.json";

// const listTask=()=>{
//     const tasks=loadTasks();
//     tasks.forEach((task,index)=>console.log(`${index+1} - ${task.task}`));
// }

// const command=process.argv[2];
// const argument=process.argv[3];

// const loadTasks=()=> {
//     try {
//         const dataBuffer=fs.readFileSync(filepath)
//         const dataJSON=dataBuffer.toString()
//         return JSON.parse(dataJSON)
//     } catch (error) {

//         return []
//     }
// }

// const saveTasks=(tasks)=>{
//     const dataJSON=JSON.stringify(tasks);
//     fs.writeFileSync(filepath,dataJSON);
// }

// const addTask=(task) => {
//     const tasks=loadTasks();
//     tasks.push({task});
//     saveTasks(tasks);
//     console.log("Task added",task)
// }

// if(command==="add"){
//     addTask(argument);
// }else if(command==="list"){
//     listTask();
// }else if(command==="remove"){
//     removeTask(parseInt(argument));
// }else{
//     console.log("command not found !");
// }



const fs = require("fs");
const filepath = "./tasks.json";

const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filepath);
        return JSON.parse(dataBuffer.toString());
    } catch (error) {
        return [];
    }
};

const saveTasks = (tasks) => {
    fs.writeFileSync(filepath, JSON.stringify(tasks, null, 2)); // Pretty-print for readability
};

const listTask = () => {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("No tasks found.");
    } else {
        tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));
    }
};

const addTask = (task) => {
    if (!task) {
        console.log("Please provide a task description.");
        return;
    }
    const tasks = loadTasks();
    tasks.push({ task });
    saveTasks(tasks);
    console.log("Task added:", task);
};

const removeTask = (index) => {
    const tasks = loadTasks();
    if (isNaN(index) || index < 1 || index > tasks.length) {
        console.log("Invalid task number.");
        return;
    }
    const removedTask = tasks.splice(index - 1, 1);
    saveTasks(tasks);
    console.log("Task removed:", removedTask[0].task);
};

// Handle commands
const command = process.argv[2];
const argument = process.argv[3];

switch (command) {
    case "add":
        addTask(argument);
        break;
    case "list":
        listTask();
        break;
    case "remove":
        removeTask(parseInt(argument, 10));
        break;
    default:
        console.log("Command not found! Available commands: add, list, remove.");
}

