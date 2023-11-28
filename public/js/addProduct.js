const addProductForm = document.getElementById('addProduct');
const btnAddProduct = document.getElementById('btn-add');
const productsContainer = document.querySelector('.products-container');

const ROUTE = `http://localhost:8081/api/products/`;
const ROUTE_CART = `http://localhost:8081/api/carts/`;

addProductForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = e.target.getAttribute('currentUser');
  const formData = new FormData(e.target);
  const productData = {
    title: formData.get('title'),
    description: formData.get('description'),
    price: formData.get('price'),
    thumbnail: formData.get('thumbnail'),
    code: formData.get('code'),
    stock: formData.get('stock'),
    owner: id,
  };

  console.log(productData);

  try {
    const res = await fetch(`${ROUTE}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    if (data.error) return alert('error');
    window.location.href = '/products';
  } catch (error) {
    console.log(error);
  }
});

productsContainer.addEventListener('click', async (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  const id = e.target.parentNode.getAttribute('id');
  const action = e.target.getAttribute('do');
  if (action === 'edit') return (window.location.href = `/edit/${id}`);

  try {
    const res = await fetch(`${ROUTE_CART}${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await res.json();
    e.target.classList.add('btn-disable');
  } catch (error) {
    console.log(error);
  }
});
