const script = () => {
  const state = {
    lists: [{ id: 0, name: 'General' }],
    tasks: [],
    activeId: 0,
  };

  const listContainer = document.querySelector('[data-container="lists"]');
  const listOfLists = document.createElement('ul');
  listContainer.append(listOfLists);

  const renderStartState = () => {
    const list = document.createElement('li');
    list.innerHTML = '<b>General</b>';
    listOfLists.append(list);
  };
  renderStartState();

  const renderTasks = () => {
    const taskContainer = document.querySelector('[data-container="tasks"]');
    taskContainer.innerHTML = '';
    const listOfTasks = document.createElement('ul');

    const currentTasks = state.tasks.filter((task) => task.listId === state.activeId);
    currentTasks.forEach((task) => {
      const taskElement = document.createElement('li');
      taskElement.innerHTML = task.name;
      listOfTasks.append(taskElement);
      taskContainer.append(listOfTasks);
    });
    // taskForm.reset();
  };

  const handleListSwitch = (e) => {
    e.preventDefault();
    const b = listOfLists.querySelector('b');
    const clickedA = e.target;

    const currentId = [...clickedA.closest('ul').children].indexOf(clickedA.parentNode);
    state.activeId = currentId;

    const newB = document.createElement('b');
    newB.innerHTML = clickedA.innerHTML;
    const newA = document.createElement('a');
    newA.setAttribute('href', `#${b.innerHTML.toLowerCase()}`);
    newA.innerHTML = b.innerHTML;
    newA.addEventListener('click', handleListSwitch);

    clickedA.replaceWith(newB);
    b.replaceWith(newA);

    renderTasks();
  };

  const renderNewList = (list) => {
    const newList = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', `#${list.name.toLowerCase()}`);
    a.innerHTML = list.name;
    a.addEventListener('click', handleListSwitch);
    newList.append(a);
    listOfLists.append(newList);
    // listForm.reset();
  };


  const listForm = document.querySelector('[data-container="new-list-form"]');
  listForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const id = state.lists[state.lists.length - 1].id + 1;
    const newList = { id, name };
    state.lists.push(newList);
    renderNewList(newList);
  });

  const taskForm = document.querySelector('[data-container="new-task-form"]');
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const newTask = { listId: state.activeId, name };
    state.tasks.push(newTask);
    renderTasks();
  });
};

script();
