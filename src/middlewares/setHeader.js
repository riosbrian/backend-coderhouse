const menuOptions = {
  notLogged: [
    { link: 'Inicio', anchor: '/' },
    { link: 'Login', anchor: '/login' },
    { link: 'Registro', anchor: '/register' },
    { link: 'Productos', anchor: '/products' },
  ],
  admin: [
    { link: 'Inicio', anchor: '/' },
    { link: 'Productos', anchor: '/products' },
    { link: 'Agregar producto', anchor: '/add' },
    { link: 'Editar producto', anchor: '/edit' },
    { link: 'Cerrar sesión', anchor: '' },
  ],
  premium: [
    { link: 'Inicio', anchor: '/' },
    { link: 'Productos', anchor: '/products' },
    { link: 'Carrito', anchor: '/carts' },
    { link: 'Agregar producto', anchor: '/add' },
    { link: 'Editar producto', anchor: '/edit' },
    { link: 'Cerrar sesión', anchor: '' },
  ],
  user: [
    { link: 'Inicio', anchor: '/' },
    { link: 'Productos', anchor: '/products' },
    { link: 'Carrito', anchor: '/carts' },
    { link: 'Premium', anchor: '/premium' },
    { link: 'Cerrar sesión', anchor: '' },
  ],
};

export default (req, res, next) => {
  if (req.user) {
    req.headerUI = menuOptions[req.user.user.role];
    return next();
  }
  req.headerUI = menuOptions['notLogged'];
  next();
};
