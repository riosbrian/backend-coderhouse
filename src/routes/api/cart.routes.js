import { Router } from "express";
import * as CartController from "../../controllers/cart.controller.js";
import { inyectUser } from "../../middlewares/secure.middleware.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";

const cartRouter = Router();

cartRouter.param("pid", (req, res, next, param) => {
  req.productID = param;
  next();
});

cartRouter
  .route("/carts")
  .get(inyectUser, isAuthenticated, CartController.GETCart)
  .post(inyectUser, isAuthenticated, CartController.POSTNewCart)
  .delete(inyectUser, isAuthenticated, CartController.DELETECart);

cartRouter
  .route("/carts/:pid([0-9a-zA-Z]+)")
  .post(inyectUser, isAuthenticated, CartController.POSTAddToCart)
  .put(inyectUser, CartController.PUTUpdateCart)
  .delete(inyectUser, CartController.DELETEProductToCart);

export default cartRouter;
