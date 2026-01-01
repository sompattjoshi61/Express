const express = require('express');

const {logReqRes} = require("./middlewares")
const {connectMongoDB} = require('./connection')
const userRouter = require('./routes/user')

const app = express();
const PORT = 8000;

//Connecting MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/premier-log").then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

//Middleware
app.use(express.urlencoded({extended : false}))
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});


