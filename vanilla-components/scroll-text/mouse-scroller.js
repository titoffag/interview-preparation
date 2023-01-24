const containers = document.querySelectorAll('.container');

containers.forEach(component);

function component(ref) {  
  const {width} = ref.getBoundingClientRect();

  const children = ref.querySelector('span');
  const {width: fullWidth} = children.getBoundingClientRect();
  const restWidth = fullWidth - width;

  ref.addEventListener('mousemove', (e) => {
    const percent = e.offsetX * 100 / width;
    children.style.left = `-${Math.round(restWidth / 100 * percent)}px`;
  });
}
