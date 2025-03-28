import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { IProduct } from "../../types/IProduct";
import { Button } from "../../components/Button";
import { Link } from "react-router";

enum ProductCategory {
	Hat = "Hat",
	Glasses = "Glasses",
	Jacket = "Jacket",
	Neckwear = "Neckwear",
	Shirt = "Shirt",
	Gloves = "Gloves",
	Pants = "Pants",
	Shoes = "Shoes",
}

export const CreateProduct = () => {
	const { createProductHandler } = useProducts();
	const [formData, setFormData] = useState<IProduct>({
		name: "",
		description: "",
		price: 0,
		stock: 0,
		category: "",
		image: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await createProductHandler(formData);
		setFormData({
			name: "",
			description: "",
			price: 0,
			stock: 0,
			category: "",
			image: "",
		});
	};

	return (
		<div className="product-wrapper">
			<form onSubmit={handleSubmit}>
				<h2>Create New Product</h2>
				<div className="form-div">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Name"
						required
					/>
					<label htmlFor="description">Description:</label>
					<input
						type="text"
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Description"
						required
					/>
					<label htmlFor="price">Price:</label>
					<input
						type="number"
						name="price"
						value={formData.price}
						onChange={handleChange}
						placeholder="Price"
						required
					/>
					<label htmlFor="stock">Stock:</label>
					<input
						type="number"
						name="stock"
						value={formData.stock}
						onChange={handleChange}
						placeholder="Stock"
						required
					/>
					<label htmlFor="category">Category:</label>
					<select
						name="category"
						id="category"
						value={formData.category}
						onChange={handleChange}
						required
					>
						<option value="" disabled>
							Select a category
						</option>
						{Object.values(ProductCategory).map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
					<label htmlFor="image">Image URL:</label>
					<input
						type="text"
						name="image"
						value={formData.image}
						onChange={handleChange}
						placeholder="Insert Image URL"
						required
					/>

					<div className="button-div">
						<Button type="submit" className="submit-btn">
							Create Product
						</Button>
						<Link to={"/admin/manage-products"}>Go back</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
