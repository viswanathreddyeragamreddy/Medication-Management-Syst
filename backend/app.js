const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/medications', medicationRoutes);

module.exports = app;
