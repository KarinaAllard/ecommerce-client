import { Link } from "react-router";
import { Button } from "../../components/Button";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
import { MdEdit, MdExpandLess, MdExpandMore } from "../../icons";

export const ManageProducts = () => {
	const { products, isLoading, error, deleteProductHandler } = useProducts();
	const [showProductByID, setShowProductByID] = useState<number | null>(null);

	const showProductDetails = (productId: number) => {
		setShowProductByID((prevId) => (prevId === productId ? null : productId));
	};

	return (
		<div>
			<h1>Manage Products</h1>
			{isLoading && <p>Loading products...</p>}
			{error && <p>Error: {error}</p>}
			<div className="product-wrapper">
				<div className="button-div">
					<Button type="button" className="edit-btn">
						<Link to={"/admin/create-product"}>Create Product</Link>
					</Button>
				</div>
				{products.length === 0 && !isLoading && <p>No products found.</p>}
				{products.map((product) => (
					<div className="product-div" key={product.id}>
						<h3 onClick={() => showProductDetails(product.id!)}>
							{product.name}
							{showProductByID === product.id ? (
								<MdExpandLess />
							) : (
								<MdExpandMore />
							)}
						</h3>
						{showProductByID === product.id && (
							<>
								<div className="product-image">
									<img src={product.image} alt={product.name} />
								</div>
								<div className="product-info">
									<h4>Price:</h4>
									<p>{product.price}</p>
									<h4>Stock:</h4>
									<p>{product.stock}</p>
									<h4>Description:</h4>
									<p>{product.description}</p>
									<h4>Category:</h4>
									<p>{product.category}</p>
								</div>
								<div className="button-div">
									<Button type="button" className="edit-btn">
										<Link to={`/admin/update-product/${product.id}`}>
											Update <MdEdit />
										</Link>
									</Button>
									<Button
										className="delete-btn"
										onClick={() =>
											product.id && deleteProductHandler(product.id)
										}
									>
										Delete
									</Button>
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
};
