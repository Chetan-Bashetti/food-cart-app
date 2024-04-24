const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const connect = await mongoose.connect('roundhouse.proxy.rlwy.net:11385');
		console.log(
			`Mongo DB connection successful at is ${connect.connection.host}`
		);
	} catch (err) {
		console.log(`Error ${err.message}`.red);
		process.exit();
	}
};

module.exports = connectDB;
