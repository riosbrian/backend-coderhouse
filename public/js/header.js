const logout = document
  .getElementById('logout')
  .addEventListener('click', async (e) => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await res.json();
      window.location.href = data.redirect;
    } catch (error) {
      console.log(error);
    }
  });
