const createError = require('http-errors') 
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const usersRouter = require('./routes/usersRouter')
const comentRouter = require('./routes/comentRouter')
const hbs = require('hbs')

PORT = process.env.PORT || 9000
const app = express()
require('./models/conexion')


app.use(cors({ origin: 'http://localhost:3000', credentials: true  }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'hbs')


  app.get("/", (req, res) =>{
    res.send('back de bienestar sport')
  })
  

app.use('/users', usersRouter)
app.use('/', comentRouter)

app.use((req, res, next) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' })
})

app.options('/users/sendQuery', cors({ origin: 'http://localhost:3000', credentials: true }))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
res.render('*')
})

app.listen(PORT, () => {
  console.log(`El servidor se está escuchando en http://localhost:${PORT}`);
});

module.exports = app
