const Router = require("express").Router();
const Product = require("../controllers/products");
Router.route("/")
	.get(Product.getAllProducts)
	.post(Product.newProduct);

Router.route("/:id").get(Product.getProduct);

module.exports = Router;
