const btns = document.querySelector('.item-card__actions');

btns.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  const action = e.target.getAttribute('do');
  console.log(action);
});
