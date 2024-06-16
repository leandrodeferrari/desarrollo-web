const express = require('express');
const cors = require('cors');
const eventoRouter = require('./router/eventoRouter');
const empleadoRouter = require('./router/empleadoRouter');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());

app.use('/api/eventos', eventoRouter);
app.use('/api/empleados', empleadoRouter);

app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto: ${PORT}`)
});