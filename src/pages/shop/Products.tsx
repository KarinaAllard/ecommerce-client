import { Button } from "../../components/Button";
import { useProducts } from "../hooks/useProducts"
import "../../styles/shop.css"

export const Products = () => {
    const { products, isLoading, error } = useProducts();

    return (

        <div className="shop-wrapper">
            {isLoading && <p>Loading products</p>}
            {error && <p>Error: {error}</p>}
            <div className="product-wrapper">
                {products.length === 0 && !isLoading && <p>No products found.</p>}
                {products.map((product) => (
                    <div className="product-div" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <div className="product-text">
                            <h4>{product.name}</h4>
                            <p>{product.price} kr</p>                            
                        </div>
                        <div className="button-div">
                            <Button className="cart-btn">Add To Cart</Button>
                            <input type="number" />                            
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}