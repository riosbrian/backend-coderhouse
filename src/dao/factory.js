import { connect } from "mongoose";
import args from "../config/args.js";
import config from "../config/config.js";

let dao = {};

switch (args.mode) {
  case "dev":
    console.log("connected to file system");
    const { default: ProductsFS } = await import("./fs/products.fs.js");
    dao = {
      Product: ProductsFS,
    };
    console.log(dao);
    break;
  default:
    // 1. Conectar a MongoDB
    connect(config.MONGO_URL).then(() => console.log("connected to data base"));
    // 2. Importaciones dinamicas
    const { default: ProductsDAO } = await import("./mongo/products.dao.js");
    const { default: UserDAO } = await import("./mongo/user.dao.js");
    const { default: CartDAO } = await import("./mongo/cart.dao.js");
    const { default: TicketDAO } = await import("./mongo/tickets.dao.js");
    dao = {
      Product: ProductsDAO,
      User: UserDAO,
      Cart: CartDAO,
      Ticket: TicketDAO,
    };
    break;
}

export default dao;
