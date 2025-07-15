const dotenv = require('dotenv').config();
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI not set in environment');
  process.exit(1);
}
const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');

//middlewares
app.use(cors({}));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

//Jobs routes
const jobRoutes = require('./routes/JobRoute');
app.use('/jobs', jobRoutes);

// News routes
const newsRoutes = require('./routes/NewsRoute');
app.use('/news', newsRoutes);
app.use('/', newsRoutes); // Allow accessing /articles directly

//AI routes
const aiRoutes = require('./routes/AiRoute');
app.use('/ai', aiRoutes);

//mongoose and server initialization
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

app.listen(process.env.PORT || 4003 || 4005, () => {
  console.log(`Running on Port ${process.env.PORT || 4003 || 4005}`);
});
