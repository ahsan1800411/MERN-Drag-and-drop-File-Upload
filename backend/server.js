require('express-async-errors');
const express = require('express');
const cors = require('cors');

const connectDatabase = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/media', require('./routes/mediaRoutes'));
app.use(errorHandler);

connectDatabase();

app.listen(8000, () => console.log(`Server is up and running on port 8000`));
