const express = require('express')
const app = express()

app.get('/test', (req, res) => {
    res.json('oki doki')
})

app.listen(4000)