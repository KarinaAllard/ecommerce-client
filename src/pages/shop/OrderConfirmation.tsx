import { useEffect, useState } from "react"
import { Button } from "../../components/Button";
import { Link } from "react-router";

export const OrderConfirmation = () => {
    const [orderItems, setOrderItems] = useState<any[]>([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        setOrderItems(cart);

        localStorage.removeItem("cart");
        localStorage.removeItem("checkoutFormData")
    }, [])

    return (

        <div className="order-confirmation-wrapper">
            <h1>Thanks for your purchase!</h1>
            <p>Your order has been placed successfully.</p>

            {orderItems.length > 0 && (
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div>
                        {orderItems.map((item, index) => (
                            <div key={index}>
                                <img src={item.product.image} alt={item.product.name} />
                                <h4>{item.product.name}</h4>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="button-div">
                <Button className="submit-btn"><Link to={"/products"}>Back to Shop</Link></Button>
            </div>
        </div>
    )
}