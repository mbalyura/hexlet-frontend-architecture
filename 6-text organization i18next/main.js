const script = async () => {
  await i18next.init({ lng: 'en', debug: true, en });

  const state = {
    name: 'ascend',
    value: 'unsorted',
  };

  const sortLoop = {
    ascend: 'descend',
    descend: 'ascend',
    unsorted: 'ascend',
  };

  const locationEntries = Object.entries(window.location)
    .filter((entry) => {
      const value = entry[1];
      return value !== '' && typeof value !== 'function' && typeof value !== 'object';
    });

  const container = document.querySelector('div.container');
  const table = document.createElement('table');
  table.classList.add('table');
  const tableBody = document.createElement('tbody');
  const headrow = document.createElement('tr');
  const headName = document.createElement('th');
  const headValue = document.createElement('th');
  const aName = document.createElement('a');
  const aValue = document.createElement('a');
  aName.setAttribute('href', '#');
  aValue.setAttribute('href', '#');
  table.append(tableBody);
  container.append(table);

  const render = (compareFn) => {
    tableBody.innerHTML = '';
    aName.innerHTML = `${i18next.t('name')} (${i18next.t(`sortingState.${state.name}`)})`;
    aValue.innerHTML = `${i18next.t('value')} (${i18next.t(`sortingState.${state.value}`)})`;

    headName.append(aName);
    headValue.append(aValue);
    headrow.append(headName, headValue);
    tableBody.append(headrow);

    locationEntries.sort(compareFn).forEach((entry) => {
      const row = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      [td1.innerHTML, td2.innerHTML] = entry;
      row.append(td1, td2);
      tableBody.append(row);
    });
  };
  render();

  watch(state, (prop) => {
    if (state[prop] === 'unsorted') return;
    const i = prop === 'name' ? 0 : 1;
    const order = state[prop] === 'ascend' ? 1 : -1;
    const compareFunction = ((a, b) => (a[i].localeCompare(b[i]) === 0
      ? a[0].localeCompare(b[0]) : order * a[i].localeCompare(b[i]))); // костыль :(
    render(compareFunction);
  });

  aName.addEventListener('click', () => {
    state.value = 'unsorted';
    state.name = sortLoop[state.name];
  });
  aValue.addEventListener('click', () => {
    state.name = 'unsorted';
    state.value = sortLoop[state.value];
  });
};

script();
