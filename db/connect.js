const mongoose = require("mongoose");

const connectDB = (url) => {
	return mongoose
		.connect(url, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		})
		.then(
			(conn) =>
				`Connected to Mongo! Database name: ${conn.connections[0].name}`
		)
		.catch((err) =>
			console.error(
				"Error connecting to mongo",
				err
			)
		);
};

module.exports = connectDB;
