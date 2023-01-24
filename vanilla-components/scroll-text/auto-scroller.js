const containers = document.querySelectorAll('.container');

containers.forEach(component);

function component(ref) {  
  const {width, x: offsetX} = ref.getBoundingClientRect();
  const children = ref.querySelector('span');
  const {width: fullWidth} = children.getBoundingClientRect();
  const restWidth = fullWidth - width;
  
  let autoScroll;
  
  ref.addEventListener('mouseenter', (e) => {
    autoScroll = setInterval(() => {
      const leftTransition = parseInt(children.style.left) || 0;
      if (~leftTransition >= restWidth) {
        children.style.left = '';
        return;
      }
      children.style.left = `${Math.round(leftTransition - 10)}px`;
    }, 100);
  });
  
  ref.addEventListener('mouseleave', (e) => {
    clearInterval(autoScroll);
    children.style.left = '';
  });
}
