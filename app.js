require("dotenv").config();
const connect = require("./db/connect");
const express = require("express");
const app = express();
const url = process.env.MONGODB_URI || 3000;
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
app.use(express.json());

app.use(notFound);
app.use(errorHandler);

app.use("/api/v1/products", )

connect(url).then(() => {
	app.listen(3000, () => {
		console.log("Connected");
	});
});
