import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config/config.js";
import apiRouter from "./routes/api.routes.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import indexRouter from "./routes/index.routes.js";
import handlebars from "express-handlebars";
import __dirname from "./config/dirname.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import options from "./config/swagger.js";
import compression from "express-compression";
import { logger } from "./config/logger.js";

const app = express();

// COMPRESSION
app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

//SWAGGER
const specs = swaggerJSDoc(options);

// HANDLEBARS CONFIG
const hbs = handlebars.create({
  partialsDir: `${__dirname}/../views/partials`,
  helpers: {
    or: (a, b) => {
      return a || b;
    },
    eq: (a, b) => {
      return a == b;
    },
  },
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/../views`);

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use("/api/docs", serve, setup(specs));

// LOGGER
logger(app);

// ROUTES
app.use(apiRouter);
app.use(indexRouter);

// MANEJO GLOBAL DE ERRORES
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running at PORT: ${config.PORT}`);
});
