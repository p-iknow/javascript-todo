const todos = require("./data")

const readline=require("readline");
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
    prompt: "명령하세요: "
});

const getRandomInt = ()=> {
    const max = 10000;
    return Math.floor(Math.random() * Math.floor(max));
}

const isIdExistInTodos = (randomInt) => {
    const idCheck = (obj) => obj.id === randomInt;
    return todos.some(idCheck);
} 

const getID = () => {
    let ID = getRandomInt();
    while(isIdExistInTodos(ID)) {
        ID = getRandomInt();
    }
    return ID;
}

function getTodosSortedByStatus(todos){
    const todosSortedByStatus = {};
    for( obj of todos) {
       if(todosSortedByStatus[obj.status] === undefined) {
           todosSortedByStatus[obj.status] = [];
           todosSortedByStatus[obj.status].push(obj);
           continue;
       } 
        todosSortedByStatus[obj.status].push(obj);      
    } 
    return todosSortedByStatus;
}

const isTodosEmpty = ()=>{
    if(todos.length === 0) return true;
    return false  
}


function show(status){
    const todosSortedByStatus = getTodosSortedByStatus(todos);
    let res = "현재상태는"; 
    if (status === "all") {
        if(isTodosEmpty()) console.log("현재 todolist 가 비어있습니다");
        else {
            for (let key in todosSortedByStatus ) {
                res += " " + key + ": " + todosSortedByStatus[key].length;
            }
            console.log(res);
        }
    } else if (!(todosSortedByStatus[status]===undefined)) {
        res = todosSortedByStatus[status].map(v => v.name);
        console.log(res.join(", "));
    } else {
        console.log(`${status}가 목록에 없습니다`);
    }
    rl.prompt()
}

const add = (inputName, inputTag) => {
    const todo = {};
    todo.name = inputName;
    if(!(inputTag === undefined)) todo.tag = inputTag.match(/[a-z0-9]+/g);
    todo.status = "todo";
    todo.id = getID();
    todos.push(todo);
    console.log(`${todo.name} 이 1개가 추가되었습니다`)
    setTimeout(() => {
        show("all"); 
    } ,1000)
}

const deleteTodo = (id) => {
    let todo2delete;
    todos.forEach((todo) => {
        if(todo.id === Number(id)) todo2delete = todos.splice(todos.indexOf(todo),1)[0];
    }); 
    if(todo2delete === undefined) { 
        console.log("ID가 목록에 없습니다."); 
    }else{
        console.log(`${todo2delete.name}가 ${todo2delete.status} 목록에서 삭제됐습니다.`)
    }
    setTimeout(() => {
        show("all");
    },1000)
}

const update = (id, inputStatus) => {
    if(!/todo|doing|done/.test(inputStatus)){
        setTimeout(() => {
            console.log("변경가능한 status는 todo, doing, done 입니다");
            setTimeout(()=> {
                show("all")
            }, 1000)
        },3000)
        return;
    }    
    let todo2update;
    todos.forEach((todo) => {
        if(todo.id === Number(id)) {
            todo.status = inputStatus; 
            todo2update = todo;
        }
    });
    if(!todo2update === undefined) {
        setTimeout(() => {
            console.log(`${todo2update.name} 가 ${todo2update.status}(으)로 변경되었습니다.`);
            setTimeout(()=> {
                show("all")
            }, 1000)

        },3000)
    } else {
        setTimeout(() => {
            console.log("ID가 목록에 없습니다.");
            setTimeout(()=> {
                show("all")
            }, 1000)
        },3000)
    }
}
const parseInput = input => input.split("$");


const listenUserInput =  (data) => {
    const input = parseInput(data);
    switch (input[0]) {
        case "add" : add(input[1], input[2]);
        break;
        case "update" : update(input[1], input[2]);
        break;
        case "delete": deleteTodo(input[1]);
        break;
        case "show": show(input[1]);
        break;
        default: console.log("입력가능한 명령어는 add, updtade, delete show 입니다"); rl.prompt();
    }
}
// listenUserInput('add$sleep$["favorite", "nodoad"]')



rl.prompt();
rl.on("line", listenUserInput);