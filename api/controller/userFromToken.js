
const jwt = require('jsonwebtoken');
const jwtSecret = 'thisisunsecreto';


const getUserDataFromToken = (req) => {
    return new Promise((resolve, reject)=> {
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if(err) throw err;
        resolve(userData)
      })
    })
  }

module.exports = {
    getUserDataFromToken
}