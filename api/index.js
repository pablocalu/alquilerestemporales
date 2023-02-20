const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const User = require('./models/User')
require('dotenv').config()
const app = express()
const bcrypt =require('bcryptjs')

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'thisisunsecreto'

app.use(express.json())

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
                    if(err) throw err
                })
                res.cookie('token', token).json()
            }
        } else {
            res.json('pass not ok')
        }
    } catch (error) {
        
    }

})

app.listen(4000)