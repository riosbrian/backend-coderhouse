const editProductForm = document.getElementById('editProduct');

const ROUTE = `/api/products/`;

const pathname = window.location.pathname;
const segments = pathname.split('/');
const productId = segments[segments.length - 1];

editProductForm.addEventListener('submit', async (e) => {
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
  try {
    const res = await fetch(`${ROUTE}${productId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    window.location.href = '/products';
  } catch (error) {
    console.log(error);
  }
});
