import { Button } from "../../components/Button";
import { useProducts } from "../hooks/useProducts";
import "../../styles/shop.css";
import { useParams } from "react-router";
import { Link } from "react-router";
import { MdChevronLeft } from "../../icons";

export const ProductDetails = () => {
	const { id } = useParams();
	const { products, isLoading, error } = useProducts();

	const product = products.find((p) => p.id === Number(id));

    const inStock = (product?.stock ?? 0) > 0;

	return (
		<div className="shop-wrapper">
			{isLoading && <p>Loading products</p>}
			{error && <p>Error: {error}</p>}
			<div className="product-wrapper">
				<div className="link-div">
					<Link to={"/products"}><MdChevronLeft />Back</Link>
				</div>
				<div className="product-detail-div">
					<div className="product-info">
						<div className="product-image">
							<img src={product?.image} alt={product?.name} />
						</div>
						<div className="product-text">
							<h2>{product?.name}</h2>
                            {!inStock && <h4>Out of Stock</h4>}
							<p>{product?.description}</p>
							<p>Clothing type: {product?.category}</p>
						</div>
					</div>
                    
					<div className="button-div">
						<Button className="cart-btn" disabled={!inStock}>
                            {inStock ?  "Add to Cart" : "Out of Stock"}</Button>
                        {/* <div className="amount-div"><span className="fa-icon"><FaMinus /></span><span>1</span><span className="fa-icon"><FaPlus /></span></div>     */}
					</div>

				</div>
			</div>
		</div>
	);
};
