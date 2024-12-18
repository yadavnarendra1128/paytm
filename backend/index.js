const express = require("express");
const cors = require("cors")
const app =express()
const {users} = require("./db")
const mainRouter = require("./routes/index");

app.use(cors())
app.use(express.json())

app.use("app/v1",mainRouter);
app.listen(3000)

