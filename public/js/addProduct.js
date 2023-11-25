const addProductForm = document.getElementById('addProduct');
const btnAddProduct = document.getElementById('btn-add');

const ROUTE = 'http://localhost:8081/api/products';

addProductForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  productData = {
    title: formData.get('title'),
    description: formData.get('description'),
    price: formData.get('price'),
    thumbnail: formData.get('thumbnail'),
    code: formData.get('code'),
    stock: formData.get('stock'),
  };

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
