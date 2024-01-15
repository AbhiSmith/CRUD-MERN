const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')


const app = express()
app.use(cors())
app.use(express.json()) //Pass data backend to frontend in json fromate use json()

// Mogodb Database Connnection

mongoose.connect("mongodb://127.0.0.1:27017/crud") 

//Delete Record
app.delete('/deleteUser/:id',(req, res) =>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))

})

//Update record first fetch data by id
app.get('/getUser/:id', (req, res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))

})

//Upadte record to put data by id
app.put('/updateUser/:id', (req, res)=>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{name: req.body.name, email: req.body.email, age: req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//API for get user data display perpose
app.get('/', (req, res)=> {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


//Api create user
app.post("/createUser", (req,res) =>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


//Run server or Listen Server on port
app.listen(3001, () =>{
    console.log("Server is listen on port number 3001")
})