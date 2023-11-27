const btns = document.querySelector('.item-card__actions');
const ROUTE = `http://localhost:8081/api/carts/`;

btns.addEventListener('click', async (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  const action = e.target.getAttribute('do');
  const id = e.target.getAttribute('id');
  let response;
  try {
    if (action === 'sub') {
      const res = await fetch(`${ROUTE}${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const { data } = await res.json();
      console.log(data);
      response = data.products.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));
    }
  } catch (error) {
    console.log(error);
  }
  /*  {
    try {
      const res = await ;
    } catch (error) {
      console.log(error);
    }
  } */
});
