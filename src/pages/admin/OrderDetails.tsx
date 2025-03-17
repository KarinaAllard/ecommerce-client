import { Link, useNavigate, useParams } from "react-router";
import { useOrder } from "../hooks/useOrder";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "../../icons";

export const OrderDetails = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { order, isLoading, error } = useOrder(Number(id));

	const [showOrderByID, setShowOrderByID] = useState<number | null>(null);
	const [showOrderItemsByID, setShowOrderItemsByID] = useState<number | null>(
		null
	);
	const [showCustomerByID, setShowCustomerByID] = useState<number | null>(null);

	const showOrderDetails = (orderId: number) => {
		setShowOrderByID((prevId) => (prevId === orderId ? null : orderId));
	};

	const showOrderItemsDetails = (orderId: number) => {
		setShowOrderItemsByID((prevId) => (prevId === orderId ? null : orderId));
	};

	const showCustomerDetails = (orderId: number) => {
		setShowCustomerByID((prevId) => (prevId === orderId ? null : orderId));
	};

	return (
		<div>
			<h1>Order Details</h1>
			<div className="order-wrapper">
				{isLoading && <p>Loading orders...</p>}
				{error && <p>Error: {error}</p>}
				<Link to={"/admin/manage-orders"}>Back to Orders</Link>

				<div className="order-details">
					<h2>Order #{order?.id}</h2>
					<h3 onClick={() => showOrderDetails(order?.id!)}>
						Order Information
						{showOrderByID === order?.id ? <MdExpandLess /> : <MdExpandMore />}
					</h3>
					{showOrderByID === order?.id && (
						<div className="order-info">
							<h4>Total Price:</h4>
							<p>{order?.total_price}</p>
							<h4>Order Status</h4>
							<p>{order?.order_status}</p>
							<h4>Payment Status</h4>
							<p>{order?.payment_status}</p>
						</div>
					)}
					<h3 onClick={() => showOrderItemsDetails(order?.id!)}>
						Order Items
						{showOrderItemsByID === order?.id ? (
							<MdExpandLess />
						) : (
							<MdExpandMore />
						)}
					</h3>
					{showOrderItemsByID === order?.id && (
						<div className="order-item-info">
							{order.order_items.map((item) => (
								<div key={item.id}>
									<h4>{item.product_name}</h4>
									<p>
										{item.quantity} x {item.unit_price}kr
									</p>
								</div>
							))}
						</div>
					)}

					<h3 onClick={() => showCustomerDetails(order?.id!)}>
						Customer Info
						{showCustomerByID === order?.id ? (
							<MdExpandLess />
						) : (
							<MdExpandMore />
						)}
					</h3>
					{showCustomerByID === order?.id && (
						<div className="customer-info">
							<h4>Name:</h4>
							<p>
								{order.customer_firstname} {order.customer_lastname}
							</p>
							<h4>Customer ID:</h4>
							<p>{order.customer_id}</p>
							<div className="customer-contact-info">
								<h4>Contact Info:</h4>
								<p>Email: {order.customer_email}</p>
								<p>Phone: {order.customer_phone}</p>
							</div>
							<div className="customer-address-info">
								<h4>Address Info:</h4>
								<p>{order.customer_street_address} </p>
								<p>{order.customer_postal_code}</p>
								<p>{order.customer_city}</p>
								<p>{order.customer_country}</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
