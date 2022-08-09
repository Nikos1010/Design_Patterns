const express = require('express');
const dotenv = require('dotenv');

const bankRouter = require('./routers/bank.js')

const app = express();
dotenv.config();

app.use(bankRouter);

app.use(express.json());

app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));