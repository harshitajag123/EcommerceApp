const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//create a model/ schema
const Product = mongoose.model("Product", {
	name: String,
	imageURL: String,
	mrp: Number,
	actualPrice: Number,
	rating: Number,
});

app.get("/", (req, res) => {
	res.send("Server is up and running");
});

//READ - GET/users
app.get("/products", async (req, res) => {
	try {
		const products = await Product.find();
		res.json({
			status: "Server is Up - SUCCESS and product is fetched",
			data: products,
		});
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			message: "Something went wrong",
		});
	}
});

//CREATE - POST/users
app.post("/products", async (req, res) => {
	try {
		const { name, imageURL, mrp, actualPrice, rating } = req.body;
		await Product.create({ name, imageURL, mrp, actualPrice, rating });
		res.json({
			status: "SUCCESS...",
			message: "Product created succesfully",
		});
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			message: "Something went wrong",
		});
	}
});

//UPDATE - PATCH/users/:id
app.patch("/products/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { name, imageURL, mrp, actualPrice, rating } = req.body;
		await Product.findByIdAndUpdate(id, {
			name,
			imageURL,
			mrp,
			actualPrice,
			rating,
		});
		res.json({
			status: "SUCCESS",
			message: "Product updated succesfully",
		});
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			message: "Something went wrong",
		});
	}
});

//DELETE - DELETE/users/:id
app.delete("/products/:id", async (req, res) => {
	try {
		const { id } = req.params;

		await Product.findByIdAndDelete(id);
		res.json({
			status: "SUCCESS",
			message: "Product deleted succesfully",
		});
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			message: "Something went wrong",
		});
	}
});

app.listen(port, () => {
	mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => console.log("DB connection established.."))
		.catch((error) => console.log(error));
});

// const USER = [
// 	{
// 		id: 1,
// 		email: "george.bluth@reqres.in",
// 		first_name: "George",
// 		last_name: "Bluth",
// 		avatar: "https://reqres.in/img/faces/1-image.jpg",
// 	},
// 	{
// 		id: 2,
// 		email: "janet.weaver@reqres.in",
// 		first_name: "Janet",
// 		last_name: "Weaver",
// 		avatar: "https://reqres.in/img/faces/2-image.jpg",
// 	},
// 	{
// 		id: 3,
// 		email: "emma.wong@reqres.in",
// 		first_name: "Emma",
// 		last_name: "Wong",
// 		avatar: "https://reqres.in/img/faces/3-image.jpg",
// 	},
// ];
