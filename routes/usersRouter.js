const express = require("express")
const mongoose = require("../models/conexion")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/users")
const transporter = require("../models/nodemailerConfig")
require("../models/conexion")

router.get("/", async (req, res) => {
  const users = await User.find().lean()
  res.json({
    users: users,
  })
})

/* crear usuario */
router.post("/create", async (req, res) => {
  const { nombre, mail, password } = req.body
  let sal = 10
  const hashedPassword = await bcrypt.hash(password, sal)

  try {
    const usuario = new User({
      nombre: nombre,
      mail: mail,
      password: hashedPassword,
    })
    await User.create(usuario)
    console.log(hashedPassword)

    const email = await transporter.sendMail({
      from: process.env.USEREMAIL,
      to: mail,
      subject: "¡Bienvenido a Nuestra Página!",
      html: `<h1>Hola ${nombre},</h1>
      <p> ¡Bienvenido!, Gracias por registrarte en nuestra página.</p>`,
    })

    res.json({
      mensaje: "creamos un usuario",
    })
  } catch (error) {
    console.error("Error al crear usuario:", error)

    res.status(500).json({
      mensaje: "Error interno del servidor al crear usuario",
    })
  }
})

/* iniciar secion */
router.post("/login", async (req, res) => {
  const { mail, password } = req.body

  try {
    const user = await User.findOne({ mail })

    if (user) {
      const passwordMatched = await bcrypt.compare(password, user.password)
      if (passwordMatched) {
        res.json({ mensaje: "Inicio de secion exitosa" })
      }
    } else {
      res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" })
    }
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error)

    res.status(500).json({ mensaje: "Error interno del servidor" })
  }
})

/* mandar mail */
router.post("/sendMail", async (req, res) => {
  try {
    const { usuario, mailContent, asunto, numeroDeContacto } = req.body

    const mailOptions = {
      from: "bienestarsport33@gmail.com",
      to: "bienestarsport33@gmail.com",
      subject: `${asunto}`,
      text: `el usuario ${usuario} te mando esta consulta:${mailContent} debes responderle a este numero ${numeroDeContacto}`,
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log("Coreeo enviado")
        res.status(200).json({ mensaje: "Correo enviado correctamente" })
      }
    })
  } catch (error) {
    console.error("Error al enviar el correo:", error)
    res
      .status(500)
      .json({ error: "Error interno del servidor al enviar el correo" })
  }
})

module.exports = router
