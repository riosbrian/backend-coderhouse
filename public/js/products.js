const productsContainer = document.querySelector('.products-container');
const ROUTE_CART = `/api/carts/`;

productsContainer.addEventListener('click', async (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  const id = e.target.parentNode.getAttribute('id');
  const action = e.target.getAttribute('do');
  if (action === 'not') return (window.location.href = `/login/`);
  if (action === 'edit') return (window.location.href = `/edit/${id}`);

  try {
    const res = await fetch(`${ROUTE_CART}${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await res.json();
    if (data.status == 500)
      return Swal.fire({
        title: 'Error!',
        text: 'Stock insuficiente',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
  } catch (error) {
    console.log(error);
  }
});
