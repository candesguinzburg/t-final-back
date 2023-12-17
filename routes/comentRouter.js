const express = require('express')
const mongoose = require("../models/conexion")
const Coment = require('../models/coments')
const comentRouter = express.Router()

comentRouter.post('/comentar', async (req, res) =>{
    const{ usuario, comentario} = req.body
    try {
        const opinion = new Coment({
            usuario: usuario,
            comentario: comentario
        })
        await Coment.create(opinion)
        res.json({
            mensaje: "creamos un comentario",
        })
    
    } catch (error) {
      console.error("Error al comentar:", error)
  
      res.status(500).json({
        mensaje: "Error interno del servidor",
      })
    }
  })

  comentRouter.get('/mostrar', async (req, res) =>{

    const comentario = await Coment.find()
    if(comentario){
        res.json( {comentario})
    }
    else{
       console.log('error')
    }
    

})
comentRouter.post('/edit', async(req, res)=>{
    const {id, usuario, comentario} = req.body 
    try {
        const updatedComent = await Coment.findByIdAndUpdate(id, { usuario, comentario });
        res.json({ success: true, message: 'Comentario editado correctamente', editedComent: updatedComent });
    } catch (error) {
        console.error('Error al editar comentario', error);
        res.status(500).json({ success: false, message: 'Error al editar comentario' });
    }})

comentRouter.post('/borrar', async (req, res) => {
    const { id } = req.body;

    try {
        const deletedComent = await Coment.findByIdAndDelete(id);
        
        res.json({ success: true, message: 'Comentario borrado correctamente' });
    } catch (error) {
        console.error('Error al borrar comentario', error);
        res.status(500).json({ success: false, message: 'Error al borrar comentario' });
    }
});
  module.exports = comentRouter