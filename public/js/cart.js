const btns = document.querySelector('.items-container');
const btnEnd = document.querySelector('.btn-end');
const total = document.querySelector('.total');
const ROUTE = `/api/carts/`;
const ROUTE_TICKET = `/api/ticket/`;

const getTotal = async () => {
  try {
    const res = await fetch(`${ROUTE_TICKET}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await res.json();
    total.textContent = `$${data.data.toFixed(2)}`;
  } catch (error) {}
};

await getTotal();

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
      await getTotal();
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
      await getTotal();
    }

    if (action === 'del') {
      e.target.parentNode.parentNode.remove();
      await getTotal();
    }
  } catch (error) {
    console.log(error);
  }
});

btnEnd.addEventListener('click', async () => {
  try {
    const res = await fetch(`${ROUTE_TICKET}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await res.json();
    const emptyCart = await fetch(`${ROUTE}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const cart = await emptyCart.json();

    Swal.fire({
      title: '¡Gracias por tu compra!',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) window.location.href = '/carts';
    });
  } catch (error) {}
});
