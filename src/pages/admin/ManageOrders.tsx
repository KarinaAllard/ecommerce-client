import { useState } from "react";
import { useOrders } from "../hooks/useOrders";
import { Link } from "react-router";
import { Button } from "../../components/Button";
import { MdExpandLess, MdExpandMore } from "../../icons";

export const ManageOrders = () => {
	const { orders, isLoading, error, deleteOrderHandler } = useOrders();
	const [showOrderByID, setShowOrderByID] = useState<number | null>(null);
	const [showCustomerByID, setShowCustomerByID] = useState<number | null>(null);

	const showOrderDetails = (orderId: number) => {
		setShowOrderByID((prevId) => (prevId === orderId ? null : orderId));
	};

	const showCustomerDetails = (orderId: number) => {
		setShowCustomerByID((prevId) => (prevId === orderId ? null : orderId));
	};

	return (
		<div>
			<h1>Manage Orders</h1>
			{isLoading && <p>Loading orders...</p>}
			{error && <p>Error: {error}</p>}

			<div className="order-wrapper">
				<div className="button-div">
					<Button type="button" className="edit-btn">
						<Link to={"/admin/create-order"}>Create Order</Link>
					</Button>
				</div>

				{orders.length === 0 && !isLoading && <p>No orders found.</p>}
				{orders.map((order) => (
					<div className="order-div" key={order.id}>
						<h3 onClick={() => showOrderDetails(order.id!)}>
							Order number: {order.id}
							{showOrderByID === order.id ? <MdExpandLess /> : <MdExpandMore />}
						</h3>
						{showOrderByID === order.id && (
							<>
                                <Link to={`/admin/order-details/${order.id}`}>View Order Details</Link>
								<div className="order-info">
									<h4>Total Price:</h4>
									<p>{order.total_price}</p>
                                    <h4>Order Status</h4>
                                    <p>{order.order_status}</p>
                                    <h4>Payment Status</h4>
                                    <p>{order.payment_status}</p>
								</div>

								<h4 onClick={() => showCustomerDetails(order.id!)}>
									Customer Info
									{showCustomerByID === order.id ? (
										<MdExpandLess />
									) : (
										<MdExpandMore />
									)}
								</h4>
								{showCustomerByID === order.id && (
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
								<div className="button-div">
									<Button className="edit-btn">
										<Link to={`/admin/update-order/${order.id}`}>Update</Link>
									</Button>
									<Button
										className="delete-btn"
										onClick={() => order.id && deleteOrderHandler(order.id)}
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
