const express = require('express');
const envs = require('./config/config');

const morgan = require('morgan');
const errors = require('./network/errors');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config
const { port } = envs;

// routes
const clientRoutes = require('./routes/clients/clients.routes');
const userRoutes = require('./routes/users/users.routes');

app.use('/api/clients', clientRoutes);
app.use('/api/users', userRoutes);

app.use(errors);

app.listen(port, () => {
  console.log('Listening on port: ', port);
});
