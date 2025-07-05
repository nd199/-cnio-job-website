const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');

//middlewares
app.use(cors({}));
app.use(express.json());
app.use(helmet.default);
app.use(morgan('dev'));Developer: Toggle Developer Tools → Console

//routes



//mongoose and server initialization
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo Db Connection Established'))
  .catch((err) => console.log('Error in Mongo Db Connection', err));

app.listen(process.env.PORT || 4003 || 4005, () => {
  console.log(`Running on Port ${process.env.PORT || 4003 || 4005}`);
});
