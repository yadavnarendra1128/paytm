const express = require("express");
const cors = require("cors")
const {users} = require("./db")
const mainRouter = require("./routes/index");
const app = express();

// request from other servers like frontend
app.use(cors())
// request body json  parser middleware
app.use(express.json())

app.use("app/v1",mainRouter);
app.listen(3000,()=>{
    console.log("Server is running on port 3000") 
})

