const mongoose = require('mongoose');
const dotenv = require('dotenv');
const color = require('colors');

dotenv.config();

const URI = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.arqngzm.mongodb.net/eventHub?retryWrites=true&w=majority&appName=${process.env.CLUSTER_NAME}`


const conectarDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Base de datos conectada correctamente.".bgGreen);
    } catch (error) {
        console.log("Ocurrió un error en la conexión con base de datos: ".bgRed, error);
        process.exit(1);
    }
}

module.exports = conectarDB;