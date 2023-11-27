const btns = document.querySelector('.items-container');
const ROUTE = `http://localhost:8081/api/carts/`;

const options = {
  plus: 'POST',
  sub: 'PUT',
  del: 'DELETE',
};

const fetchData = async (id, action) => {
  const method = options[action];

  try {
    const res = await fetch(`${ROUTE}${id}`, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

btns.addEventListener('click', async (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  const id = e.target.parentNode.getAttribute('id');
  const action = e.target.getAttribute('do');
  const quantity = e.target.parentNode.querySelector('.item-card__quantity');

  try {
    const { data } = await fetchData(id, action);

    if (action === 'sub') {
      if (!data) return e.target.parentNode.parentNode.remove();
      quantity.textContent = data.quantity;
    }

    if (action === 'plus') {
      if (!data)
        return Swal.fire({
          title: 'Error!',
          text: 'Stock insuficiente',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      quantity.textContent = data.quantity;
    }

    if (action === 'del') {
      e.target.parentNode.parentNode.remove();
    }
  } catch (error) {
    console.log(error);
  }
});
