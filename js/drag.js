// localStorage.clear();
let tasks = JSON.parse(localStorage.getItem('tasks')) || {
    
    todo: [],
    inProgress: [],
    done: [],
    
};
//  tasks = {
//     todo: [
//         { id: 1 ,status :'todo' , name: "Task 1", priority: "high", deadline: "2024-11-40" },
//         { id: 2,status :'todo' , name: "Task 2", priority: "low", deadline: "2024-11-02" },
//         { id: 6,status :'todo' , name: "Task 6", priority: "medium", deadline: "2024-11-06" },
//         { id: 10, status :'todo' ,name: "Task 10", priority: "low", deadline: "2024-11-10" }
//     ],
//     inProgress: [
//         { id: 3, status :'inProgress' , name: "Task 3", priority: "low", deadline: "2024-11-03" },
//         { id: 4,status :'inProgress' , name: "Task 4", priority: "high", deadline: "2024-11-04" },
//         { id: 8, status :'inProgress' , name: "Task 8", priority: "medium", deadline: "2024-11-08" }
//     ],
//     done: [
//         { id: 5, status :'done' , name: "Task 5", priority: "medium", deadline: "2024-11-05" },
//         { id: 7, status :'done' , name: "Task 7", priority: "medium", deadline: "2024-11-07" },
//         { id: 9, status :'done' , name: "Task 9", priority: "high", deadline: "2024-11-09" }
//     ]
// };

// Save tasks to local storage
localStorage.setItem('tasks', JSON.stringify(tasks));

let taskIdCounter = tasks.todo.length +tasks.inProgress.length + tasks.done.length  ;

const openModalButton = document.getElementById('popUPWind');

function show() {
    openModalButton.style.display = 'block';
}

function hide() {
    openModalButton.style.display = 'none';
}
function cardDisplay(objet , stat){
    
    const newOne=document.createElement('div');
    newOne.className='tasks';

    
    newOne.setAttribute('draggable' , 'true'),
    newOne.id=objet.id;
    newOne.role=stat;

    newOne.innerHTML=`
    
      <div class="topContent flex justify-between pt-1" >
                <p class="deadline">
                ${objet.deadline}
                </p>
                <p class="-m-4">P:${objet.priority}</p>
                <img src="img/delete.png" onclick="deleteCard(${objet.id} ,'${objet.status}')" class="w-4 h-4 -mt-2  cursor-pointer">
                 <h6 hidden>${objet.id}</h6>
                               
                </div>
                <h6>Task : <span class="content">${objet.name}</span></h6>
    `
   
    if(stat=='todo'){
          document.getElementById('TodoTaskScontainer').appendChild(newOne);
    }else if(stat=='inProgress'){ 
        document.getElementById('inProgressContainer').appendChild(newOne);
    }else{
        document.getElementById('doneContainer').appendChild(newOne);
    }


}

    




function getData() {
    const taskName = document.getElementById('taskName').value;
    const taskStatus = document.getElementById('status').value;
    const taskPriority = document.getElementById('priority').value;
    const taskDeadline = document.getElementById('deadline').value;
    //console.log(taskDeadline);
    
    


    if (!taskName || !taskDeadline) {
        alert("All fields are required.");
        return;
    }
    
    const newTask = {
        id: ++taskIdCounter,
        status : taskStatus,
        name: taskName,
        priority: taskPriority,
        deadline: taskDeadline,
    };
    
    //console.log(taskIdCounter);

   
    tasks[taskStatus].push(newTask); 

    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    displayAll();

    document.getElementById('taskName').value = '';
    document.getElementById('deadline').value = '';

    //console.log("Tasks in localStorage:", JSON.parse(localStorage.getItem('tasks')));
    
    hide();
}
function deleteCard(idCard ,sat) {
    
    tasks.todo = tasks.todo.filter(task => task.id !== idCard);
    tasks.inProgress = tasks.inProgress.filter(task => task.id !== idCard);
    tasks.done = tasks.done.filter(task => task.id !== idCard);

   console.log(tasks);
   
    localStorage.setItem('tasks', JSON.stringify(tasks));
    //console.log("Tasks in localStorage:", JSON.parse(localStorage.getItem('tasks')));
    
      
    displayAll();
}

function displayAll() {
    // Clear containers
    document.getElementById('TodoTaskScontainer').innerHTML = '';
    document.getElementById('inProgressContainer').innerHTML = '';
    document.getElementById('doneContainer').innerHTML = '';

    // Fetch latest tasks from localStorage
    const Localtasks = JSON.parse(localStorage.getItem('tasks')) || { todo: [], inProgress: [], done: [] };
    
    console.log("Localtasks in displayAll:", Localtasks);

    // Populate each status container
    Localtasks.todo.forEach(task => cardDisplay(task, 'todo'));
    Localtasks.inProgress.forEach(task => cardDisplay(task, 'inProgress'));
    Localtasks.done.forEach(task => cardDisplay(task, 'done'));

    // Reinitialize drag events after display update
    dragSet();
}

function dragSet() {
    let lastHoveredElement = null;
    const placeHolders = document.getElementsByClassName('palceHolderDiv');

    Array.from(placeHolders).forEach(element => {
        element.addEventListener('dragover', (event) => {
            event.preventDefault();
            console.log("Dragging over placeholder with ID:", element.id);
        });
    });

    const htmlTasks = document.getElementsByClassName('tasks');

    for (let i = 0; i < htmlTasks.length; i++) {
        htmlTasks[i].addEventListener("dragstart", () => {
            console.log("Dragging task with ID:", htmlTasks[i].id);
            htmlTasks[i].classList.add("dragging");
        });

        htmlTasks[i].addEventListener("dragend", (event) => {
            htmlTasks[i].classList.remove("dragging");

            // Get the latest hover item and tasks from localStorage
            const x = JSON.parse(localStorage.getItem('hoverItem'));
            const graddingList = JSON.parse(localStorage.getItem('tasks'));

            // Find and remove dragged item from its original list
            const targedObjet = graddingList[event.currentTarget.role].find(item => item.id == event.currentTarget.id);
            graddingList[event.currentTarget.role] = graddingList[event.currentTarget.role].filter(task => task.id !== targedObjet.id);
            
            // Get the index of the hovered element
            let index = -1;
            console.log(x.stat);
            
            for (let j = 0; j < graddingList[x.stat].length; j++) {
                if (graddingList[x.stat][j].id == x.id) {
                    index = j;
                    break;
                }
            }
            console.log("Insert index:", index);

            // Insert dragged item into the target list at the found index
            graddingList[x.stat].splice(index, 0, targedObjet);

            // Update tasks in localStorage and call displayAll to refresh
            localStorage.setItem('tasks', JSON.stringify(graddingList));
            console.log("Updated tasks in localStorage:", graddingList);

            displayAll(); // Refresh UI to reflect updated task order
        });

        htmlTasks[i].addEventListener('dragover', (event) => {
            event.preventDefault();

            // Update last hovered element to the most recent target
            if (lastHoveredElement !== event.currentTarget) {
                console.log("Hovering over task with ID:", event.currentTarget.role);
                const y = { id: event.currentTarget.id, stat: event.currentTarget.role };
                localStorage.setItem('hoverItem', JSON.stringify(y));
                lastHoveredElement = event.currentTarget;
            }
        });

        htmlTasks[i].addEventListener('dragleave', () => {
            lastHoveredElement = null; // Reset on drag leave
        });
    }
}


window.onload = function() {
    displayAll();
    const tasksdisplay   = JSON.parse(localStorage.getItem('tasks'));
    //console.log(tasks);
  
// const placeHolders=document.getElementsByClassName('palceHolderDiv');

// Array.from(placeHolders).forEach(element => {

//     element.addEventListener('dragover', (event) => {
//         event.preventDefault();
//         console.log("Dragging over placeholder with ID:", element.id);
//     });

    
// });

// const placeHolders=document.getElementsByClassName('palceHolderDiv');

// Array.from(placeHolders).forEach(element => {

//     element.addEventListener('dragover', (event) => {
//         event.preventDefault();
//         console.log("Dragging over placeholder with ID:", element.id);
//     });

    
// });

// const htmlTasks=document.getElementsByClassName('tasks');

// console.log(htmlTasks);


// for (let i = 0; i < htmlTasks.length; i++) {
//     htmlTasks[i].addEventListener("dragstart", () => {
//         console.log(htmlTasks[i].id);
        
//         htmlTasks[i].classList.add("dragging");
//     });
    
//     htmlTasks[i].addEventListener("dragend", () => {
//         console.log(htmlTasks[i].id);
//         htmlTasks[i].classList.remove("dragging");
//     });
//     htmlTasks[i].addEventListener('dragover', (event) => {
//         event.preventDefault();
//         console.log(htmlTasks[i].id ,'', htmlTasks[i].dataset.status);
//     });
// }
};

