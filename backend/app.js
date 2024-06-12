const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());

app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto: ${PORT}`)
});