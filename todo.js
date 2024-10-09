const todo = document.querySelector('.ToDo');
const add = document.querySelector('#add');
let tasks = document.querySelector('#tasks');
const date = document.querySelector('.date');

let list = JSON.parse(localStorage.getItem('todoList')) || [
    {
        task: 'washing dishes',
        dueDate: '2022-12-22'
    },
    {
        task: 'watching youtube',
        dueDate: '2023-01-23'
    }
];
console.log(list);

renderToDO();

function renderToDO() {
    let html = '';

    list.forEach(function (value, i) {
        const TO_DO = value.task;
        const DATE = value.dueDate;
        const ToDoHTML = `
        <div>${i + 1}.${TO_DO}</div>
        <div>${DATE}</div>
        <div>
        <button class="delete-button" onclick="
                list.splice(${i},1);
                updateLocalStorage();
                renderToDO();
            ">Delete</button>
        </div>     
        `;
        html += ToDoHTML;
    });

    tasks.innerHTML = html;
    console.log(html);
}

function updateLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(list));
}

add.addEventListener('click', function () {
    let task = todo.value;
    let dueDate = date.value;
    if (task !== '') {
        if (dueDate === '') {
            dueDate = 'Not fixed yet';
        }
        list.push({
            task: task,
            dueDate: dueDate
        });
        updateLocalStorage();
    }
    renderToDO();
    todo.value = '';
    date.value = '';
});

todo.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (date.value === '') {
            date.focus();
        } else {
            add.click();
        }
    }
});

date.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        add.click();
    }
});
