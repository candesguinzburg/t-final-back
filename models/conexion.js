
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const dbName =  process.env.DB_NAME
const password =  process.env.PASSWORD
const CONNECTION_URL =`mongodb+srv://cande2003:opCi1dI73Qe3UZ9C@cluster0.wlqaceu.mongodb.net/BienestarSport?retryWrites=true&w=majority`


mongoose.connect(CONNECTION_URL,
   {
    useNewUrlParser: true,
  
   }).then(() =>{
      console.log('conexion exitosa!')
  })
  .catch((err) =>{
      console.error(err)
  })
module.exports = mongoose