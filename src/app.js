const express = require('express');
const app= express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const globalError = require('./util/globalError');
dotenv.config();
const mountRoutes = require('./routes/index');

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

mountRoutes(app);

app.use(globalError);

mongoose.connect('mongodb://localhost:27017').then(connection=> {
    console.log('server started at 8080 port');
    app.listen(8080);
}).catch('There is an error');
