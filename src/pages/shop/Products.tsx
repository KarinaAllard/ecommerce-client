import { Button } from "../../components/Button";
import { useProducts } from "../../hooks/useProducts";
import "../../styles/shop.css";
import { Link } from "react-router";

export const Products = () => {
	const { products, isLoading, error } = useProducts();

	return (
		<div className="shop-wrapper">
			{isLoading && <p>Loading products</p>}
			{error && <p>Error: {error}</p>}
			<div className="product-wrapper">
				{products.length === 0 && !isLoading && <p>No products found.</p>}
				{products.map((product) => (
					<Link
						to={`/product/${product.id}`}
						key={product.id}
						className="product-link"
					>
						<div className="product-div" key={product.id}>
							<img src={product.image} alt={product.name} />
							<div className="product-text">
								<h4>{product.name}</h4>
								<p>{product.price} kr</p>
							</div>
							<div className="button-div">
								<Button className="cart-btn">View</Button>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};
