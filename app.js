require("dotenv").config();
const connect = require("./db/connect");
const express = require("express");
const app = express();
const url = process.env.MONGODB_URI || 3000;
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const productRoute = require("./routes/products");
require("express-async-errors");
app.use(express.json());
app.use("/api/v1/products/", productRoute);
app.get("/", (req, res) => {
	res.status(200).send("Welcome to my api");
});
app.use(notFound);
app.use(errorHandler);

connect(url).then(() => {
	app.listen(3000, () => {
		console.log("Connected");
	});
});
