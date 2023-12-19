const express = require('express');
const app= express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const globalError = require('./util/globalError');
const mountRoutes = require('./routes/index');
const logger = require('./util/logger');
const ApiError = require('./util/apiError');
const fs = require('fs');
const path = require('path');

dotenv.config();

const accessLogStream = fs.createWriteStream(path.join(__dirname,'log', 'access.log'), { flags: 'a' });

app.use(logger('Tiny',accessLogStream));
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

mountRoutes(app);

app.all('*', (req, res, next) => {
    next(new ApiError(`There is no route like that: ${req.originalUrl}`, 404));
});

app.use(globalError);

const PORT = process.env.PORT || 8080;

let server;

mongoose.connect('mongodb://localhost:27017').then(connection=> {
    server = app.listen(PORT);
}).catch('There is an error');

process.on('unhandledRejection',(err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(process.exit(1));
    setTimeout(process.exit(1), 500).unref();
});