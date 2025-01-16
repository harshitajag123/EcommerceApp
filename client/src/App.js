import "./App.css";
import shoplogo from "./assets/logo1.png";
import { useState, useEffect } from "react";
import axios from "axios";

//practice for pr request
function App() {
	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		try {
			const res = await axios.get("http://localhost:4000/products");
			setProducts(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const addProduct = async () => {
		try {
			//test data
			const newProduct = {
				name: "product 1",
				imageURL: "https://m.media-amazon.com/images/I/61smYWXWx9L._SY355_.jpg",
				mrp: 749.0,
				actualPrice: 1399.0,
				rating: 3,
			};
			const res = await axios.post(
				"http://localhost:4000/products",
				newProduct
			);
			fetchProducts();
			
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<>
		
			<div className="App text-blue-950">
				{/* NAVBAR SECTION STARTS */}
				<div className="navbar flex justify-between  items-center content-center font-bold text-xl px-6 py-2 bg-[#E9F1FA]  ">
					<div className="flex items-center">
						<img src={shoplogo} alt="logo" className="w-[80px] " />
						<span className="px-2 text-2xl cursor-pointer ">EasyShop</span>
					</div>
					<div>
						<span className="px-6 cursor-pointer">About</span>
						<span className="px-6 cursor-pointer">Contact</span>

						<span className="px-6 cursor-pointer">Sign up</span>
						<span className="px-6 cursor-pointer ">Login</span>
					</div>
				</div>
				{/* MAIN SECTION STARTS */}
				<div className="flex justify-center items-center  text-5xl py-6">
					<img src={shoplogo} alt="logo" className="w-[150px]  " />
					<h1 className="mt-[20px] text-blue-950">Welcome to EasyShop</h1>
				</div>
				<br />
				<button
					className="px-4 py-1 text-lg rounded-lg mx-2 my-2 text-white   bg-[#198754] cursor-pointer"
					onClick={addProduct}>
					Add new Product
				</button>
				{/* PRODUCT SECTION STARTS */}
				<div className="flex flex-wrap gap-8 justify-evenly items-center mt-2  text-xl py-6 ">
					{products.map((product) => (
						<div
							className="product-card flex flex-col w-[400px] p-5 text-center items-center rounded-2xl "
							style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
							key={product._id}>
							<img
								src={product.imageURL}
								alt="product"
								className="w-[250px]  p-4 items-center "
							/>
							<div className="font-bold text-base">{product.name}</div>

							<div>
								{[...Array(product.rating)].map((rating, index) => (
									<span key={index}>⭐</span>
								))}
							</div>

							<div>
								<span className="pt-2 text-2xl font-bold">
									₹{product.actualPrice}{" "}
								</span>
								<span>
									MRP:
									<s className="pl-2">₹{product.mrp}</s>
								</span>
							</div>

							<div>
								<button className="px-4 py-1 text-lg rounded-lg mx-2 my-2 bg-[#FFC107] cursor-pointer">
									Edit
								</button>
								<button className="px-4 py-1 text-lg rounded-lg mx-2 my-2 bg-[#DC4545] cursor-pointer">
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
