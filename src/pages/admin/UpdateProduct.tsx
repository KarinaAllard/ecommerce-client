import { useEffect, useState } from "react";
import { IProduct } from "../../types/IProduct";
import { useProducts } from "../../hooks/useProducts";
import { useNavigate, useParams } from "react-router";
import { Button } from "../../components/Button";

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

export const UpdateProduct = () => {
	const { products, updateProductHandler } = useProducts();
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const product = products.find((p) => p.id === Number(id));

	const [formData, setFormData] = useState<IProduct>({
		name: "",
		description: "",
		price: 0,
		stock: 0,
		category: "",
		image: "",
	});

	useEffect(() => {
		if (product) {
			setFormData({
				name: product.name,
				description: product.description,
				price: product.price,
				stock: product.stock,
				category: product.category,
				image: product.image,
			});
		}
	}, [product]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!product) return;

		await updateProductHandler(product.id as number, formData);
		navigate("/admin/manage-products");
	};

	if (!product) {
		return <p>Product not found.</p>;
	}

	return (
		<div className="product-wrapper">
			<form onSubmit={handleSubmit}>
				<h2>Create New Product</h2>
				<div className="form-div">
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Name"
						required
					/>
					<input
						type="text"
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Description"
						required
					/>
					<input
						type="number"
						name="price"
						value={formData.price}
						onChange={handleChange}
						placeholder="Price"
						required
					/>
					<input
						type="number"
						name="stock"
						value={formData.stock}
						onChange={handleChange}
						placeholder="Stock"
						required
					/>
					<label htmlFor="category">Category</label>
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
							Update Product
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};
