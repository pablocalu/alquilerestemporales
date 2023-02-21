const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const User = require('./models/User')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express()
const bcrypt =require('bcryptjs')

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'thisisunsecreto'

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}))

mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
    res.json('oki doki')
})

app.post('/register', async (req,res) => {
    const { name, email, password } = req.body

    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),       
        })
        res.json(user)
    } catch (error) {
        res.status(422).json(error)
    }
})

app.post('/login', async (req,res) =>{
    const { email, password } = req.body

    try {
        const user = await User.findOne({
            email
        })
        if(user){
            const passOk = bcrypt.compareSync(password, user.password)
            if(passOk){
                jwt.sign({email: user.email, id: user._id}, jwtSecret, {}, (error, token) => {
                    if(error) throw error
                    res.cookie('token', token).json(user)
                })
            }
        } else {
            res.json('pass not ok')
        }
    } catch (error) {
        
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (error, user) => {
            if(error) throw error;
            const {name, email, _id} = await User.findById(user.id)
            res.json(name, email, _id)
        })
    } else {
        res.json(null)
    }
})

app.listen(4000)