const express = require('express');
const fs = require('fs')
const users = require('./MOCK_DATA.json');


const app = express();
const PORT = 8000;


app.use(express.urlencoded({extended: false}));  //middleware

//Routes

//task - 1

app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/users', (req, res) => {
    const html = `
    <h1>Users</h1>
    <ul>
        ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
    </ul>
    `;
    return res.send(html);
});


//task 2

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

//task 3 -> creating new user
app.post('/api/users', (req,res) =>{
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err,data)=> {
        return res({status : "success", id:users.length});
    });
});

//task 4 - PATCH

app.patch('/api/users/:id', (req,res) =>{
    //Edit the user with id (through POSTMAN)
    return res({status : "Success through POSTMAN"});
});

app.delete('/api/users/:id', (req,res) =>{
    //Delete the user (through POSTMAN)
    return res({status : "Success through POSTMAN"});
});



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

