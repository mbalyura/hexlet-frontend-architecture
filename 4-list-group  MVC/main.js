/* eslint-disable no-undef */
const script = () => {
  const state = {
    active: 'home',
  };

  const links = document.querySelectorAll('#list-tab a');
  const tabs = document.querySelectorAll('#nav-tabContent div');

  watch(state, 'active', () => {
    links.forEach((link) => link.classList.remove('active'));
    const activeLink = document.getElementById(`list-${state.active}-list`);
    activeLink.classList.add('active');

    tabs.forEach((tab) => tab.classList.remove('active', 'show'));
    const activeTab = document.getElementById(`list-${state.active}`);
    activeTab.classList.add('active', 'show');
  });

  links.forEach((link) => link.addEventListener('click', ({ target }) => {
    state.active = target.hash.slice(6);
  }));
};

script();
