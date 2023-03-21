const server = require('./app.js');
require('dotenv').config();
const database = require('./db.js');
const PORT = process.env.PORT;

database.on('error', (error) => {
  console.log(error);
});
database.once('connected', () => {
  console.log('Database connected!');
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});