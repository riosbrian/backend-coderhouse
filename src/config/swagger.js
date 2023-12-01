import __dirname from './dirname.js';

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API ecommerce - backend coderhouse',
      description: 'API developed for a basic ecommerce',
    },
  },
  apis: [`${__dirname}/docs/*.yaml`],
};

export default options;
