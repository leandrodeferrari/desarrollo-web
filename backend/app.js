const express = require('express');
const eventoRouter = require('./router/eventoRouter');
const usuariosRouter = require('./router/usuariosRouter');
const empleadoRouter = require('./router/empleadoRouter');
const cors = require('cors');

//Configuración del servidor:
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware de navegación:
app.use(cors());
app.use('/api/eventos', eventoRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/empleados', empleadoRouter);
app.get('/', (req, res) => { res.send('Probando.'); }); //Endpoint por defecto.

//Middleware de manejo de errores:
app.use((err, req, res, next) => { 
    console.error(err.stack);
    res.status(500).send({
      message: 'Error en el servidor.',
      error: err.message
    });
});

//Inicialización del servidor:
app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto: ${PORT}`)
});