const premium = document.querySelector('.btn-premium');
const ROUTE = '/api/users/premium';

premium.addEventListener('click', async () => {
  const newRole = { convertRoleTo: 'premium' };
  try {
    const res = await fetch(`${ROUTE}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newRole),
    });
    const data = await res.json();
    if (data.error) return alert('error');
    Swal.fire({
      title: '¡Felicidades!',
      text: 'Ya eres un usuario premium',
      icon: 'success',
      confirmButtonText: 'Ir a productos',
    }).then((result) => {
      if (result.isConfirmed) window.location.href = '/products';
    });
  } catch (error) {
    console.log(error);
  }
});
