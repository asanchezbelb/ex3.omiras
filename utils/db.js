const mongoose = require('mongoose');

// Conexión a la base de datos
const connectDB = async () => {
	try {
		// Intentar conectar usando la URI del archivo .env
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('Conexión exitosa a la base de datos');
	} catch (error) {
		// Si ocurre un error, lo imprimimos en la consola y detenemos el proceso
		console.error(`Ocurrió el siguiente error al conectar: ${error.message}`);
		process.exit(1);  // Detenemos el proceso si no se puede conectar
	}
}

// Desconexión de la base de datos
const disconnectDB = async () => {
	try {
		await mongoose.connection.close();
		console.log("Desconexión exitosa de la base de datos");
	} catch (error) {
		console.error("Error al desconectar de la base de datos:", error);
	}
};

module.exports = { connectDB, disconnectDB };
