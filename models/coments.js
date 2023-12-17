const mongoose = require ('mongoose')

const Coment = mongoose.model('Comentario',{
   usuario: String,
   comentario: String
   })

   module.exports = Coment