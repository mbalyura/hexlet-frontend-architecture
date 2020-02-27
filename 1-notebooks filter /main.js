const notebooks = [{
  model: 'v1', processor: 'intel', frequency: 1.7, memory: 16,
}, {
  model: 'd3', processor: 'intel', frequency: 3.5, memory: 8,
}, {
  model: 'd2', processor: 'amd', frequency: 2.5, memory: 16,
}];

const script = () => {
  const state = {
    processor_eq: '', memory_eq: '', frequency_gte: '', frequency_lte: '',
  };


  const render = (currState) => {
    const result = document.querySelector('.result');
    result.innerHTML = '';

    const models = notebooks
      .filter((nout) => nout.processor === currState.processor_eq || !currState.processor_eq)
      .filter((nout) => nout.memory === +currState.memory_eq || !currState.memory_eq)
      .filter((nout) => nout.frequency >= +currState.frequency_gte || !currState.frequency_gte)
      .filter((nout) => nout.frequency <= +currState.frequency_lte || !currState.frequency_lte)
      .map((nout) => nout.model);

    if (models.length > 0) {
      const list = `<ul>${models.map((model) => `<li>${model}</li>`).join('\n')}</ul>`;
      result.innerHTML = list;
    }
  };

  const form = document.querySelector('form');
  form.addEventListener('input', (e) => {
    const { name, value } = e.target;
    state[name] = value;
    render(state);
  });

  render(state);
};

script();
