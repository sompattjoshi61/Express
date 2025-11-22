const express = require('express');
const fs = require('fs')
const mongoose = require('mongoose');


const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//connecting MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/premier-log")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log("Error connecting to MongoDB", err);
})


// Creating Schema 
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String, // Datatype
      required: true, // Must be filled
      unique: true, // It means it should be unique
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }  //show when the user is created and updated
);

// Creating Model
const User = mongoose.model("user", userSchema);

//Routes -> show all users exist in DB
app.get("/users", async (req,res) => {
    const users = await User.find();
    return res.status(200).json(users);
})

//Adding User in DB

app.post("/api/users", async (req,res) => {
    const body = req.body;
    if(
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.gender ||
        !body.jobTitle
    ) {
        return res.status(400).json({
            message : "All fields are required"
        })
    }
    const result = await User.create({
        firstName : body.firstName,
        lastName : body.lastName,
        email : body.email,
        jobTitle : body.jobTitle,
        gender : body.gender
    });

    console.log(result);

    return res.status(201).json({msg : 'success'});
});



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});


