const originalTimeout = window.setTimeout;
const timeouts = [];

window.setTimeout = (func, timeout, ...args) => {
  const id = originalTimeout(func, timeout, ...args);
  timeout.push(id);
  return id;
};

function clearAllTimeout() {
  timeouts.forEach(id => {
    window.clearTimeout(id);
  });
}
