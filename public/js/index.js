const logout = document
  .getElementById('logout')
  .addEventListener('click', async (e) => {
    const res = await fetch('http://localhost:8081/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await res.json();
    /* Swal.fire({
      title: 'Hasta luego!',
      text: 'Sesión cerrada correctamente',
      icon: 'success',
      confirmButtonText: 'Cerrar',
    }); */

    window.location.href = data.redirect;
  });
