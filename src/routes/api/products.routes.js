import { Router } from 'express';
import * as ProductsController from '../../controllers/products.controller.js';

const productsRouter = Router();

productsRouter.param('pid', (req, res, next, param) => {
  req.productID = param;
  next();
});

productsRouter
  .route('/products')
  .get(ProductsController.GETProducts)
  .post(ProductsController.POSTNewProduct);

productsRouter
  .route('/products/:pid([0-9a-zA-Z]+)')
  .get(ProductsController.GETProductById)
  .put(ProductsController.PUTUpdateProduct)
  .delete(ProductsController.DELETEProduct);

export default productsRouter;
