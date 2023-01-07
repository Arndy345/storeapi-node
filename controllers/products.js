const { query } = require("express");
const Product = require("../models/product");
// const products = require("../products.json");
const getAllProducts = async (req, res) => {
	const {
		company,
		featured,
		name,
		sort,
		fields,
		numericFilters,
	} = req.query;
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
	//NUMERIC FILTER USING REGEX TO MAP AND REPLACE OPERATORS
	if (numericFilters) {
		const operatorMap = {
			"<": "$lt",
			">": "$gt",
			"<=": "$lte",
			">=": "$gte",
			"=": "$eq",
		};
		const regEx = /\b(<|>|<=|>=|=)\b/g;
		const filter = numericFilters.replace(
			regEx,
			(match) => {
				return `-${operatorMap[match]}-`;
			}
		);
		const options = ["price", "rating"];
		const filters = filter
			.split(",")
			.forEach((item) => {
				const [fields, operator, value] =
					item.split("-");
				if (options.includes(fields)) {
					queryObject[fields] = {
						[operator]: Number(value),
					};
				}
			});
	}

	let results = Product.find(queryObject);
	if (sort) {
		const sortList = sort.split(",").join(" ");
		results.sort(sortList);
	} else {
		results.sort("createdAt");
	}
	if (fields) {
		const field = fields.split(",").join(" ");
		results.select(field);
	}
	const limit = Number(req.query.limit) || 10;
	const page = Number(req.query.page) || 1;
	const skip = (page - 1) * limit;

	results = results.skip(skip).limit(limit);
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
