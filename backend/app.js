const express = require('express');
const cors = require('cors');
const conectarDB = require('./db/db');
const eventoRouter = require('./router/eventoRouter');
const usuariosRouter = require('./router/usuariosRouter');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.get('/', (req, res) => { res.send('Probando.'); }); //Endpoint por defecto.
app.use('/api/eventos', eventoRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/empleados', empleadoRouter);

conectarDB();
app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto: ${PORT}`)
});