// localStorage.clear();
let tasks = JSON.parse(localStorage.getItem('tasks')) ||[ {
    
    todo: [],
    inProgress: [],
    done: [],
    
}];
tasks = {
    todo: [
        { id: 1, status: 'todo', name: "Task 1", priority: "High", deadline: "2024-11-01", description: "Description for Task 1" },
        { id: 2, status: 'todo', name: "Task 2", priority: "low", deadline: "2024-11-02", description: "Description for Task 2" },
        { id: 6, status: 'todo', name: "Task 6", priority: "Medium", deadline: "2024-11-06", description: "Description for Task 6" },
        { id: 10, status: 'todo', name: "Task 10", priority: "low", deadline: "2024-11-10", description: "Description for Task 10" }
    ],
    inProgress: [
        { id: 3, status: 'inProgress', name: "Task 3", priority: "low", deadline: "2024-11-03", description: "Description for Task 3" },
        { id: 4, status: 'inProgress', name: "Task 4", priority: "High", deadline: "2024-11-04", description: "Description for Task 4" },
        { id: 8, status: 'inProgress', name: "Task 8", priority: "Medium", deadline: "2024-11-08", description: "Description for Task 8" }
    ],
    done: [
        { id: 5, status: 'done', name: "Task 5", priority: "Medium", deadline: "2024-11-05", description: "Description for Task 5" },
        { id: 7, status: 'done', name: "Task 7", priority: "Medium", deadline: "2024-11-07", description: "Description for Task 7" },
        { id: 9, status: 'done', name: "Task 9", priority: "High", deadline: "2024-11-09", description: "Description for Task 9" }
    ]
};
//  tasks = {
//     todo: [
//         { id: 1 ,status :'todo' , name: "Task 1", priority: "High", deadline: "2024-11-40" },
//         { id: 2,status :'todo' , name: "Task 2", priority: "low", deadline: "2024-11-02" },
//         { id: 6,status :'todo' , name: "Task 6", priority: "Medium", deadline: "2024-11-06" },
//         { id: 10, status :'todo' ,name: "Task 10", priority: "low", deadline: "2024-11-10" }
//     ],
//     inProgress: [
//         { id: 3, status :'inProgress' , name: "Task 3", priority: "low", deadline: "2024-11-03" },
//         { id: 4,status :'inProgress' , name: "Task 4", priority: "High", deadline: "2024-11-04" },
//         { id: 8, status :'inProgress' , name: "Task 8", priority: "Medium", deadline: "2024-11-08" }
//     ],
//     done: [
//         { id: 5, status :'done' , name: "Task 5", priority: "Medium", deadline: "2024-11-05" },
//         { id: 7, status :'done' , name: "Task 7", priority: "Medium", deadline: "2024-11-07" },
//         { id: 9, status :'done' , name: "Task 9", priority: "High", deadline: "2024-11-09" }
//     ]
// };


localStorage.setItem('tasks', JSON.stringify(tasks));

let taskIdCounter = tasks.todo.length +tasks.inProgress.length + tasks.done.length  ;

const popUp = document.getElementById('popUPWind');

function show() {
    popUp.style.display = 'block';
}

function hide() {
    popUp.style.display = 'none';
}
function cardDisplay(objet , stat){
    
    const newOne=document.createElement('div');
    newOne.className='tasks';

    
    newOne.setAttribute('draggable' , 'true'),
    newOne.id=objet.id;
    newOne.role=stat;
    // newOne.setAttribute("onclick", "descriptionDsply("+ objet.id +",'"+stat +"')");

    newOne.innerHTML=`
    
      <div class="topContent flex justify-between pt-1">
                <p class="deadline">
                ${objet.deadline}
                </p>
                <p class="-m-4">P:${objet.priority}</p>
                <img src="img/delete.png" onclick="deleteCard(${objet.id} ,'${stat}')" class="w-4 h-4 -mt-2  cursor-pointer">
                 <h6 hidden>${objet.id}</h6>
                               
                </div>
                <h6 onclick="descriptionDsply(${objet.id},'${stat}')">Task : <span class="content" >${objet.name}</span></h6>
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
    console.log(taskDeadline);
    
    
    let AddOnetasks = JSON.parse(localStorage.getItem('tasks')) ;

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
    
    console.log(taskIdCounter);

   
    AddOnetasks[taskStatus].push(newTask); 

    localStorage.setItem('tasks', JSON.stringify(AddOnetasks)); 
    displayAll();

    document.getElementById('taskName').value = '';
    document.getElementById('deadline').value = '';

    console.log("Tasks in localStorage:", JSON.parse(localStorage.getItem('tasks')));
    
    hide();
}

function deleteCard(idCard ,sat) {
    const Localtasks = JSON.parse(localStorage.getItem('tasks'));
    
    Localtasks[sat] = Localtasks[sat].filter(task => task.id !== idCard);

   console.log(Localtasks);
   
    localStorage.setItem('tasks', JSON.stringify(Localtasks));
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
    
    // console.log("Localtasks in displayAll:", Localtasks);

    // Populate each status container
    Localtasks.todo.forEach(task => cardDisplay(task, 'todo'));
    Localtasks.inProgress.forEach(task => cardDisplay(task, 'inProgress'));
    Localtasks.done.forEach(task => cardDisplay(task, 'done'));

    // Reinitialize drag events after display update
    dragSet();
    applyDragAndHoverEffects();
}

// let mainDiv = document.getElementById('main');

function dragSet() {


    let lastHoveredElement = null;

    //main
    let mainDiv = document.getElementById('main');
    mainDiv.addEventListener('dragover', (event) => {
        event.preventDefault();
       
        if (lastHoveredElement !='main') {
            // console.log("Hovering over task with ID:", 'main');
            const y = { id:'main', stat: 'main' };
            localStorage.setItem('hoverItem', JSON.stringify(y));

            lastHoveredElement = event.currentTarget.id;
        }
    });


 // placholders    
const placeHolders=document.getElementsByClassName('palceHolderDiv');

Array.from(placeHolders).forEach(element => {

    element.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.stopPropagation();
       
        if (lastHoveredElement != event.currentTarget.id) {
            // console.log("Hovering over task with ID:", event.currentTarget.role);
            const y = { id: event.currentTarget.id, stat: event.currentTarget.role };
            localStorage.setItem('hoverItem', JSON.stringify(y));
            lastHoveredElement = event.currentTarget.id;
        }
    });

    
});
      // tasks
    const htmlTasks = document.getElementsByClassName('tasks');

    for (let i = 0; i < htmlTasks.length; i++) {
        htmlTasks[i].addEventListener("dragstart", () => {
            // console.log("Dragging task with ID:", htmlTasks[i].id);
            htmlTasks[i].classList.add("dragging");
        });

        htmlTasks[i].addEventListener("dragend", (event) => {

            

            htmlTasks[i].classList.remove("dragging");
            const x = JSON.parse(localStorage.getItem('hoverItem'));
            
           if(x.id=='main'){
            lastHoveredElement = null;
            return;
           }

            const graddingList = JSON.parse(localStorage.getItem('tasks'));

            // Find and remove dragged item from its original list
            const targedObjet = graddingList[event.currentTarget.role].find(item => item.id == event.currentTarget.id);
            
            graddingList[event.currentTarget.role] = graddingList[event.currentTarget.role].filter(task => task.id !== targedObjet.id);
            //   console.log('to check' , x.id);
              
            if (x.id=='todoPlace') {
                graddingList.todo.push(targedObjet);
                localStorage.setItem('tasks', JSON.stringify(graddingList));
                displayAll();
                
                return;
            } else if(x.id=='inProgressPlace') {
                graddingList.inProgress.push(targedObjet);
                 localStorage.setItem('tasks', JSON.stringify(graddingList));
                displayAll();
               
                return;
        }else if(x.id=='donePlace'){
            graddingList.done.push(targedObjet);
            localStorage.setItem('tasks', JSON.stringify(graddingList));
            displayAll();
            
            return;
        }
            // Get the index of the hovered element
            let index = -1;
            // console.log(x.stat);
            
            for (let j = 0; j < graddingList[x.stat].length; j++) {
                if (graddingList[x.stat][j].id == x.id) {
                    index = j;
                    break;
                }
            }
            // console.log("Insert index:", index);

            // Insert dragged item into the target list at the found index
            graddingList[x.stat].splice(index, 0, targedObjet);

            // Update tasks in localStorage and call displayAll to refresh
            localStorage.setItem('tasks', JSON.stringify(graddingList));
            // console.log("Updated tasks in localStorage:", graddingList);

            displayAll(); // Refresh UI to reflect updated task order
        });

        htmlTasks[i].addEventListener('dragover', (event) => {
            event.preventDefault();
            event.stopPropagation();
           
            // Update last hovered element to the most recent target
          
            if (lastHoveredElement !== event.currentTarget) { 
                // htmlTasks[i].classList.add("hoveredTask");
                console.log("Hovering over task with ID:", event.currentTarget.role);
                const y = { id: event.currentTarget.id, stat: event.currentTarget.role };
                localStorage.setItem('hoverItem', JSON.stringify(y));
                lastHoveredElement = event.currentTarget;
            }
        });

        htmlTasks[i].addEventListener('dragleave', () => {
            //  htmlTasks[i].classList.remove("hoveredTask");
            lastHoveredElement = null; // Reset on drag leave
           
        });
    }
}




let addStylr = JSON.parse(localStorage.getItem("tasks")) || {
    todo: [],
    inProgress: [],
    done: []
};

// Function to apply drag and hover effects to tasks
function applyDragAndHoverEffects() {
    // Iterate through each category
    for (const category in addStylr) {
        addStylr[category].forEach(task => {
            const taskElement = document.getElementById(task.id); // Assuming each task has a unique ID in the DOM

            if (taskElement) {
                let isHovered = false; // State variable for hover tracking

                // Add event listeners for drag events
                taskElement.addEventListener('dragenter', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!isHovered) {
                        taskElement.classList.add("hoveredTask");
                        console.log("Entering task with ID:", taskElement.id);
                        const y = { id: taskElement.id, stat: task.role };
                        localStorage.setItem('hoverItem', JSON.stringify(y));
                        isHovered = true; // Mark as hovered
                    }
                });

                taskElement.addEventListener('dragleave', (event) => {
                    const relatedTarget = event.relatedTarget;
                    if (!taskElement.contains(relatedTarget)) {
                        taskElement.classList.remove("hoveredTask");
                        console.log("Leaving task with ID:", taskElement.id);
                        isHovered = false; // Reset hover state
                    }
                });

                taskElement.addEventListener('dragover', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!isHovered) {
                        taskElement.classList.add("hoveredTask");
                        isHovered = true; // Keep hover state
                    }
                });

                taskElement.addEventListener('dragend', () => {
                    isHovered = false; // Reset hover state after drag ends
                });
            }
        });
    }
}




window.onload = function() {
    displayAll();
    const tasksdisplay   = JSON.parse(localStorage.getItem('tasks'));
    console.log(tasks);
};







function sortByDate(stat , container) {
    const taskContainer = document.getElementById(container);
    const SRtasks = JSON.parse(localStorage.getItem('tasks'));

    // Sort tasks by deadline (earliest date first)
    let res = SRtasks[stat].sort((a, b) => {
        const dateA = Date.parse(a.deadline);
        const dateB = Date.parse(b.deadline);

        console.log("Comparing:", dateA, "with", dateB);

        // Check for invalid dates and handle them
        if (isNaN(dateA)) {
            console.warn(`Invalid date in task ID ${a.id}: ${a.deadline}`);
            return 1; // Move tasks with invalid dates to the end
        }
        if (isNaN(dateB)) {
            console.warn(`Invalid date in task ID ${b.id}: ${b.deadline}`);
            return -1; // Move tasks with invalid dates to the end
        }

        // Sort valid dates in ascending order
        return dateA - dateB;
    });

    console.log("Sorted tasks:", res);

    // Clear container and display sorted tasks
    taskContainer.innerHTML = '';
    res.forEach(element => {
        cardDisplay(element, stat);
    });
    dragSet();
}



// Sorting by Priority
function sortByPriority(stat , container) {
    const taskContainer = document.getElementById(container);
    const SRtasks = JSON.parse(localStorage.getItem('tasks'));

    
    const priorityOrder = { "High": 3, "Medium": 2, "low": 1 };
    console.log(SRtasks);
  
 
   let res =  SRtasks[stat].sort((a, b) => {
        const priorityA = a.priority;
        const priorityB = b.priority;
        console.log(priorityOrder[priorityA]);
        console.log(priorityOrder[priorityB]);
        return   priorityOrder[priorityB]-priorityOrder[priorityA];
    });
    
    // Append tasks back in sorted order
    taskContainer.innerHTML = '';  // Clear the container
    res.forEach(element => {

     cardDisplay(element , stat);
  
    });
    dragSet();
}
let descStat;
let descId;
function descriptionDsply(id ,stat) {
    descStat=stat;
    descId =id ;
    let h1=document.querySelector('#descriptionPopUPWind h4');
    let desc=document.getElementById('descriptionPopUPWind');
    let objectdesc=document.querySelector('#descriptionPopUPWind textarea');
     let res = JSON.parse(localStorage.getItem('tasks'));
 
    desc.style.display='flex';

   
     let object =res[stat].find(item => item.id == id);
     
    
  
    h1.textContent='Task Name :'+ object.name ;

    objectdesc.value=object.description;

}

function descriptionSave() {
    let objectdesc=document.querySelector('#descriptionPopUPWind textarea');
    let res = JSON.parse(localStorage.getItem('tasks'));
    let object =res[descStat].find(item => item.id == descId);
   object.description = objectdesc.value;
   localStorage.setItem('tasks', JSON.stringify(res));

   objectdesc.value='';
//    console.log(objectdesc.textContent ,'oll');
//    console.log(res);
   
   
   descStat=null;
    descId =null ;
   descriptionclosing();
}

function descriptionclosing() {
    let desc=document.getElementById('descriptionPopUPWind');
    desc.style.display='none';
}







