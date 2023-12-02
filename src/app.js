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
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import options from './config/swagger.js';
import ProductModel from './dao/mongo/models/product.model.js';

const app = express();

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
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));
app.use('/api/docs', serve, setup(specs));

// ROUTES
app.use(apiRouter);
app.use(indexRouter);

// MANEJO GLOBAL DE ERRORES
app.use(notFoundHandler);
app.use(errorHandler);

const xboxGamesArray = [
  {
    title: 'Halo Infinite',
    description: 'Master Chief returns in an epic sci-fi adventure.',
    price: 59.99,
    thumbnail: '/img/halo-infinite.png',
    code: 'ABC123',
    stock: 100,
  },
  {
    title: 'Forza Horizon 5',
    description: 'Experience the beauty and thrill of open-world racing.',
    price: 49.99,
    thumbnail: '/img/forza-horizon-5.png',
    code: 'DEF456',
    stock: 80,
  },
  {
    title: 'Red Dead Redemption 2',
    description: 'Embark on an epic Wild West adventure as Arthur Morgan.',
    price: 49.99,
    thumbnail: '/img/red-dead-redemption-ii.png',
    code: 'DIJ456',
    stock: 95,
  },
  {
    title: 'Gears 5',
    description: 'Fight as Kait Diaz in the next chapter of Gears of War.',
    price: 54.99,
    thumbnail: '/img/gears-5.png',
    code: 'JKL012',
    stock: 95,
  },
  {
    title: 'Forza Motorsport 7',
    description: 'The ultimate racing experience awaits on Xbox.',
    price: 59.99,
    thumbnail: '/img/forza-motosport-7.png',
    code: 'MNO345',
    stock: 110,
  },
  {
    title: 'Sea of Thieves',
    description: 'Set sail on a pirate adventure with friends.',
    price: 39.99,
    thumbnail: '/img/sea-of-thieves.png',
    code: 'PQR678',
    stock: 70,
  },
  {
    title: 'Ori and the Will of the Wisps',
    description: 'Embark on a beautiful and emotional platformer.',
    price: 49.99,
    thumbnail: '/img/ori.png',
    code: 'STU901',
    stock: 85,
  },
  {
    title: 'State of Decay 2',
    description: 'Survive in a post-apocalyptic world filled with zombies.',
    price: 44.99,
    thumbnail: '/img/state-of-decay.png',
    code: 'VWX234',
    stock: 105,
  },
  {
    title: 'The Outer Worlds',
    description: 'Explore a new frontier in a sci-fi RPG.',
    price: 59.99,
    thumbnail: '/img/the-outher-worlds.png',
    code: 'YZA567',
    stock: 75,
  },
  {
    title: 'Grounded',
    description: 'Shrink down and survive in a backyard world.',
    price: 29.99,
    thumbnail: '/img/grounded.jpg',
    code: 'BCD890',
    stock: 65,
  },
  {
    title: 'Psychonauts 2',
    description: 'Enter the minds of others in a mind-bending adventure.',
    price: 49.99,
    thumbnail: '/img/psychonauts.png',
    code: 'EFG123',
    stock: 90,
  },
  {
    title: 'Wasteland 3',
    description:
      'Lead a squad in a tactical RPG set in post-apocalyptic Colorado.',
    price: 59.99,
    thumbnail: '/img/wasteland-3.png',
    code: 'HIJ456',
    stock: 115,
  },
  {
    title: 'Tell Me Why',
    description: 'Unravel a gripping mystery in a narrative-driven adventure.',
    price: 39.99,
    thumbnail: '/img/tell-me-why.png',
    code: 'KLM789',
    stock: 60,
  },
  {
    title: 'Bleeding Edge',
    description: 'Battle it out in a team-based multiplayer combat game.',
    price: 29.99,
    thumbnail: '/img/bleeding-edge.png',
    code: 'NOP012',
    stock: 70,
  },
  {
    title: 'The Medium',
    description: 'Explore two worlds in this psychological horror game.',
    price: 49.99,
    thumbnail: '/img/the-medium.jpg',
    code: 'QRS345',
    stock: 80,
  },
  {
    title: 'Microsoft Flight Simulator',
    description: 'Experience the thrill of flight in this realistic simulator.',
    price: 59.99,
    thumbnail: '/img/simulator.png',
    code: 'TUV678',
    stock: 100,
  },
  {
    title: 'Age of Empires IV',
    description: 'Lead civilizations through historical battles and ages.',
    price: 49.99,
    thumbnail: '/img/age-iv.jpg',
    code: 'WXY901',
    stock: 90,
  },
  {
    title: 'FIFA 23',
    description:
      'Experience the latest installment of the popular soccer franchise.',
    price: 59.99,
    thumbnail: '/img/fifa-23.png',
    code: 'FIJ890',
    stock: 110,
  },
  {
    title: 'As Dusk Falls',
    description: 'Experience an interactive drama that spans across decades.',
    price: 39.99,
    thumbnail: '/img/as-dusk-falls.png',
    code: 'CDE567',
    stock: 75,
  },
  {
    title: 'Diablo 4',
    description: 'Enter a dark and demonic world in this action RPG.',
    price: 69.99,
    thumbnail: '/diablo-iv.png',
    code: 'DIA123',
    stock: 85,
  },
];

// await ProductModel.deleteMany({});
// await ProductModel.insertMany(xboxGamesArray);

app.listen(config.PORT, () => {
  console.log(`Server running at PORT: ${config.PORT}`);
});
