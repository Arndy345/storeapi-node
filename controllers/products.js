const { query } = require("express");
const Product = require("../models/product");
// const products = require("../products.json");
const getAllProducts = async (req, res) => {
	const { company, featured, name, sort } =
		req.query;
	const queryObject = {};
	if (company) {
		queryObject.company = company;
	}
	if (featured) {
		queryObject.featured = featured;
	}
	if (name) {
		//REGEX SEARCH QUERY THAT TAKES IN A QUERY
		// THAT IS FOUND ANYWHERE IN THE PROPERTY
		//AND CASE INSENSITIVE
		queryObject.name = {
			$regex: name,
			$options: "i",
		};
	}

	const results = Product.find(queryObject);
	if (sort) {
		const sortList = sort.split(",").join(" ");
		results.sort(sortList);
	} else {
		results.sort("createdAt");
	}
	const products = await results;
	res.status(200).json({
		products,
		totalProducts: products.length,
	});
};

const newProduct = async (req, res) => {
	const body = req.body;
	const product = await Product.create(body);
	res.status(201).json({ success: true });
};

const getProduct = async (req, res) => {
	const { id } = req.params;

	const product = await Product.find({ _id: id });
	res.status(200).json({ product });
};
module.exports = {
	getAllProducts,
	newProduct,
	getProduct,
};
