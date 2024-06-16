const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const URI = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.arqngzm.mongodb.net/eventHub?retryWrites=true&w=majority&appName=${process.env.CLUSTER_NAME}`


const conectarDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("DB conectada correctamente.");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB