import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Link } from "react-router";
import CartContext from "../../context/CartContext";
import { CartActionType } from "../../reducers/CartReducer";
import { useOrderBySessionId } from "../../hooks/useOrderBySessionId";

export const OrderConfirmation = () => {
	const { dispatch } = useContext(CartContext);
	const { order, isLoading, error } = useOrderBySessionId();
	const [orderItems, setOrderItems] = useState<any[]>([]);

	useEffect(() => {
		if (order) {
			console.log("Fetched order:", order);
			console.log("Order items:", order.order_items);

			setOrderItems(order.order_items || []);

			localStorage.removeItem("cart");
			localStorage.removeItem("checkoutFormData");

			dispatch({
				type: CartActionType.RESET_CART,
				payload: null,
			});
		}
	}, [order, dispatch]);

	return (
		<div className="order-confirmation-wrapper">
			<h1>Thanks for your purchase!</h1>
			<div className="order-div">
				{isLoading ? (
					<p>Loading order details...</p>
				) : error ? (
					<h4 className="order-error">{error}</h4>
				) : (
					<>
						<h4 className="order-confirm">
							Your order has been placed successfully.
						</h4>

						{orderItems.length > 0 && (
							<div className="order-summary">
								<h2>Order Summary</h2>
								<div>
									{orderItems.map((item, index) => (
										<div key={index}>
											<h4>{item.product_name}</h4>
											<p>Quantity: {item.quantity}</p>
											<p>Price: {item.unit_price}kr</p>
										</div>
									))}
									<h3>Total Cost:</h3>
									<p>{order?.total_price}kr</p>
								</div>

								<h2>Delivery Address</h2>
								<div>
									<p>
										{order?.customer_firstname} {order?.customer_lastname}
									</p>
									<p>{order?.customer_street_address}</p>
									<p>
										{order?.customer_city}, {order?.customer_postal_code}
									</p>
									<p>{order?.customer_country}</p>
								</div>
							</div>
						)}
					</>
				)}

				<div className="button-div">
					<Button className="submit-btn">
						<Link to={"/products"}>Back to Shop</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
