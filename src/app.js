const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errors = require('./network/errors');
const envs = require('./config/config');

// routes
const clientRoutes = require('./routes/clients/clients.routes');
const userRoutes = require('./routes/users/users.routes');
const auth = require('./routes/auth/auth.routes');

const app = express();

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
};

// middlewares
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config
app.set('port', envs.port)

app.use('/api/clients', clientRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', auth);

app.use(errors);

module.exports = app;