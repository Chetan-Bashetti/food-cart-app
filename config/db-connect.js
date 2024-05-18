const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONOGODB_URL);
		// console.log(
		// 	`Mongo DB connection successful at is ${connect.connection.host}`
		// );
	} catch (err) {
		console.log(`Error ${err.message}`);
		process.exit();
	}
};

module.exports = connectDB;
