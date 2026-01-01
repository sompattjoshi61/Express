const User = require('../models/user')

const handleGetAllUsers = async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}   

async function handleGetUserById(req,res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
}

async function handleUpdateUerById(req,res){
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed",});
    return res.json({ status: "Success" });
}

async function handleDeleteUerById(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
}

async function handleCreateNewUser(req,res){
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
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUerById,
    handleDeleteUerById,
    handleCreateNewUser,
}