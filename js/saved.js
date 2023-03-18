const savedTaskBtn = document.querySelectorAll('.save-task-btn');
const taskContent = document.querySelectorAll('.task-list-content');
const savedTaskName = document.querySelectorAll('.task-title-name');
const savedTasksList = document.querySelector('section.saved-tasks ul');
const savedTaskDescription = document.querySelectorAll('[data-description]');
const insertSavedTask = $('.insert-saved-task');


savedTaskBtn.forEach((task, i) => {
    task.addEventListener('click', async () => {
        task.setAttribute('disabled', true)

        const taskId = task.dataset.savedTaskId;
        const response = await fetch(`/task/${taskId}`);
        const data = await response.json();

        let li = document.createElement('li');
        li.innerHTML += `<span>${data.name}</span>`;
        savedTasksList.appendChild(li)
    });
});

