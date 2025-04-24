document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

   // Busca si hay algo guardado con la clave tasks//
   // JSON.parce Convierte esa cadena de texto en un arreglo de objetos//
   // entonces se usa un arreglo vacío para que no se rompa el código//
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const taskItem = createTaskItem(task.text, task.completed);
        taskList.appendChild(taskItem);
    });

   
    function createTaskItem(taskText, isCompleted = false) {
        const li = document.createElement('li');
        if (isCompleted) li.classList.add('completed');

        const span = document.createElement('span');
        span.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.classList.add('remove');

        removeButton.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks(); 
        });

        li.appendChild(span);
        li.appendChild(removeButton);

        li.addEventListener('click', (e) => {
           
            if (e.target !== removeButton) {
                li.classList.toggle('completed');
                saveTasks(); 
            }
        });

        return li;
    }

   
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = createTaskItem(taskText);
            taskList.appendChild(taskItem);
            taskInput.value = '';
            saveTasks();
        }
    }

  
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });

        //NOTA: convierte el arreglo de objetos a una cadena de texto (formato JSON), ya que localStorage solo guarda texto.//
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

   
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

  
    const clearAllButton = document.createElement('button');
    clearAllButton.textContent = 'Borrar Todo';
   
    clearAllButton.classList.add('clear-all-button');
    clearAllButton.addEventListener('click', () => {
        taskList.innerHTML = '';
        localStorage.removeItem('tasks');
    });

    document.querySelector('.container').appendChild(clearAllButton);
});