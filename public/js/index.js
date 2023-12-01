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

    window.location.href = data.redirect;
  });
