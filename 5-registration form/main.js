/* eslint-disable no-undef */
const errorMessages = {
  email: 'Value is not a valid email',
  password: 'Must be at least 6 letters',
  passwordConfirmation: 'Password confirmation does not match to password',
};

const script = () => {
  const state = {
    formData: {
      name: '', email: '', password: '', passwordConfirmation: '',
    },
    inputsValidity: {
      name: true, email: true, password: true, passwordConfirmation: true,
    },
    formValidity: false,
    formPosting: '',
  };

  const formValidate = () => {
    if (state.inputsValidity.email && state.inputsValidity.password
      && state.inputsValidity.passwordConfirmation) {
      state.formValidity = true;
    } else {
      state.formValidity = false;
    }
  };

  const inputValidate = (target) => {
    switch (target.name) {
      case 'email':
        return target.validity.valid;
      case 'password':
        return target.value.length > 5;
      case 'passwordConfirmation':
        return target.value === state.formData.password;
      default:
        return true;
    }
  };

  const form = document.querySelector('[data-form="sign-up"]');
  const container = document.querySelector('[data-container="sign-up"]');
  const button = form.querySelector('input.btn');

  watch(state.formData, (prop) => {
    const inputElement = document.querySelector(`[name="${prop}"]`);
    const oldDiv = inputElement.parentElement.querySelector('div.invalid-feedback');
    if (!state.inputsValidity[prop] && !oldDiv) {
      const div = document.createElement('div');
      div.classList.add('invalid-feedback');
      div.innerHTML = errorMessages[prop];
      inputElement.parentElement.appendChild(div);
      inputElement.classList.add('is-invalid');
    } else if (state.inputsValidity[prop] && oldDiv) {
      inputElement.parentElement.removeChild(oldDiv);
      inputElement.classList.remove('is-invalid');
    }
  });

  watch(state, ['formValidity', 'formPosting'], () => {
    if (state.formValidity || state.formPosting === 'begin') {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', '');
    }
    if (state.formPosting === 'done') {
      container.outerHTML = '<div data-container="sign-up">User Created!</div>';
    }
  });

  const inputs = [...form.elements].slice(0, 4);

  inputs.forEach((input) => input.addEventListener('input', (e) => {
    const validityState = inputValidate(e.target);
    state.formData[e.target.name] = e.target.value;
    state.inputsValidity[e.target.name] = validityState || e.target.value === '';
    formValidate();
  }));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.formPosting = 'begin';
    // axios.post(routes.usersPath(), state.formData)
      // .then(() => {
        state.formPosting = 'done';
      // });
  });
};

script();
