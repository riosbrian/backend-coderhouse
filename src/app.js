import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config/config.js';
import apiRouter from './routes/api.routes.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import indexRouter from './routes/index.routes.js';
import handlebars from 'express-handlebars';
import __dirname from './config/dirname.js';

const app = express();

// HANDLEBARS CONFIG
handlebars.create({
  partialsDir: `${__dirname}/../views/partials`,
});
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));

// ROUTES
app.use(apiRouter);
app.use(indexRouter);

// MANEJO GLOBAL DE ERRORES
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running at PORT: ${config.PORT}`);
});
