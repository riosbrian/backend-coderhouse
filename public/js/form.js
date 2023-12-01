const authForm = document.querySelector('.form');

const ROUTE = '/api/auth/';
let endpoint = 'login';
let userData = {};

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  endpoint = authForm.getAttribute('auth');
  const formData = new FormData(e.target);

  if (endpoint === 'register') {
    userData = {
      name: formData.get('name'),
      lastname: formData.get('lastname'),
      username: formData.get('username'),
      email: formData.get('email'),
      age: formData.get('age'),
      password: formData.get('password'),
    };
  } else {
    userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
  }

  try {
    const res = await fetch(`${ROUTE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data.error) return alert('error');
    window.location.href = '/products';
  } catch (error) {
    console.log(error);
  }
});
