const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
const port = process.env.PORT || 8080;
const app = express();

const userRoutes = require('./routes/User.js');
const listRoutes = require('./routes/List.js');
const destinationRoutes = require('./routes/Destination.js');
const countryRoutes = require('./routes/Country.js');
const holidayRoutes = require('./routes/Holiday.js');

// set the env
dotenv.config({ path: path.resolve(__dirname, '../', `.env.${process.env.ENV}`) });

// setup mongo creds
let mongoCreds = '';
if (process.env.DB_USER && process.env.DB_PASS) {
  mongoCreds = `${process.env.DB_USER}:${process.env.DB_PASS}@`;
}

// connect to the db
mongoose.connect(
  `mongodb://${mongoCreds}${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

// let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', router); // prefix all routes with /api/v1/

// routes
router.use('/user', userRoutes);
router.use('/list', listRoutes);
router.use('/destination', destinationRoutes);
router.use('/country', countryRoutes);
router.use('/holidays', holidayRoutes);

app.listen(port);

console.log(`Server is ready on port ${port}`);