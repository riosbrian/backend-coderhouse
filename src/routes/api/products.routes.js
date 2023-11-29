import { Router } from 'express';
import * as ProductsController from '../../controllers/products.controller.js';
import { inyectUser } from '../../middlewares/secure.middleware.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';

const productsRouter = Router();

productsRouter.param('pid', (req, res, next, param) => {
  req.productID = param;
  next();
});

productsRouter
  .route('/products')
  .get(inyectUser, isAuthenticated, ProductsController.GETProducts)
  .post(inyectUser, isAuthenticated, ProductsController.POSTNewProduct);

productsRouter
  .route('/products/:pid([0-9a-zA-Z]+)')
  .get(ProductsController.GETProductById)
  .put(ProductsController.PUTUpdateProduct)
  .delete(ProductsController.DELETEProduct);

export default productsRouter;
