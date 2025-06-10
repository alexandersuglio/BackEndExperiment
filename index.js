// server file
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const dogsRouter = require('./routes/dogs.js');

const PORT = 3001;

const express = require('express');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'FrontEndExperiment')));

app.use('/', dogsRouter);

app.listen( PORT, () => console.log(`SQL API Layer turned on at LocalHost ${PORT}`));