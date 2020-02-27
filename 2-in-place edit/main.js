/* eslint-disable no-use-before-define */
const script = () => {
  const state = {
    name: {
      mode: 'text', value: '',
    },
    email: {
      mode: 'text', value: '',
    },
  };

  const submitHandle = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [field, value] = [...formData.entries()][0];
    state[field].mode = 'text';
    state[field].value = value;
    render(field);
  };

  const clickHandle = ({ currentTarget }) => {
    const field = currentTarget.dataset.editableTarget;
    state[field].mode = 'form';
    render(field);
  };

  const render = (field) => {
    const div = document.querySelector(`[data-editable-target="${field}"]`);
    const form = document.createElement('form');
    div.innerHTML = '';

    if (state[field].mode === 'form') {
      form.innerHTML = `<input type="text" name="${field}" value="${state[field].value}"><input type="submit" value="Save">`;
      div.append(form);
      document.querySelector(`[name="${field}"]`).select();
      div.removeEventListener('click', clickHandle);
      form.addEventListener('submit', submitHandle);
    }

    if (state[field].mode === 'text') {
      const text = state[field].value || `<i>${field}</i>`;
      div.innerHTML = text;
      form.removeEventListener('submit', submitHandle);
      div.addEventListener('click', clickHandle);
    }
  };

  const divs = document.querySelectorAll('[data-editable-target]');
  divs.forEach((div) => div.addEventListener('click', clickHandle));
};

script();
