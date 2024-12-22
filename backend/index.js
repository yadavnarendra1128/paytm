const express = require('express');
const app =express();
const cors = require('cors');
const mainRouter = require('./routes/index');
const jwt = require("./config");


app.use(cors());
app.use(express.json())

app.use('/',mainRouter);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});