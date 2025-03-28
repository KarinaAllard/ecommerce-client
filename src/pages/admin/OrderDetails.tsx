import { Link, useNavigate, useParams } from "react-router";
import { useOrder } from "../../hooks/useOrder";
import { useState } from "react";
import { MdEdit, MdExpandLess, MdExpandMore } from "../../icons";
import { Button } from "../../components/Button";
import {
	updateOrderItem,
	deleteOrderItem,
} from "../../services/orderItemService";
import { fetchOrder } from "../../services/orderService";
import { useOrders } from "../../hooks/useOrders";

export const OrderDetails = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { order, isLoading, error, setOrder } = useOrder(Number(id));
	const { deleteOrderHandler } = useOrders();

	const [showOrderByID, setShowOrderByID] = useState<number | null>(null);
	const [showOrderItemsByID, setShowOrderItemsByID] = useState<number | null>(
		null
	);
	const [showCustomerByID, setShowCustomerByID] = useState<number | null>(null);
	const [editItemID, setEditItemID] = useState<number | null>(null);
	const [editedItemQuantity, setEditedItemQuantity] = useState<{
		[key: number]: number;
	}>({});

	const handleQuantityChange = (itemId: number, newItemQuantity: number) => {
		setEditedItemQuantity((oldItemQuantity) => ({
			...oldItemQuantity,
			[itemId]: newItemQuantity,
		}));
	};

	const handleSave = async (itemId: number) => {
		const newItemQuantity = editedItemQuantity[itemId];

		if (newItemQuantity !== undefined) {
			await updateOrderItem(itemId, { quantity: newItemQuantity });
			const updatedOrder = await fetchOrder(Number(id));

			setOrder(updatedOrder);
			setEditItemID(null);
		}
	};

	const handleDelete = async (itemId: number) => {
		await deleteOrderItem(itemId);

		const updatedOrder = await fetchOrder(Number(id));
		setOrder(updatedOrder);
	};

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

				<div className="order-div">
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
							{order?.order_items.map((item) => (
								<div key={item.id} className="order-item">
									<h4>{item.product_name}</h4>
									{editItemID === item.id ? (
										<>
											<input
												type="number"
												value={
													editedItemQuantity[item.id ?? -1] ?? item.quantity
												}
												onChange={(e) =>
													handleQuantityChange(
														item.id ?? -1,
														Number(e.target.value)
													)
												}
											/>
											<div className="button-div">
												<Button
													className="edit-btn"
													onClick={() => handleSave(item.id ?? -1)}
												>
													Save
												</Button>
												<Button
													className="delete-btn"
													onClick={() => handleDelete(item.id ?? -1)}
												>
													Delete
												</Button>
											</div>
										</>
									) : (
										<>
											<p>
												{item.quantity} x {item.unit_price}kr
											</p>
											<div className="button-div">
												<Button
													className="edit-btn"
													onClick={() => setEditItemID(item.id ?? -1)}
												>
													Update <MdEdit />
												</Button>
											</div>
										</>
									)}
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
								<p>
									{order.customer_street_address}, <br />
									{order.customer_postal_code}, <br />
									{order.customer_city}, <br />
									{order.customer_country}
								</p>
							</div>
						</div>
					)}
				</div>
				<div className="button-div">
					<Button className="edit-btn">
						<Link to={`/admin/update-order/${order?.id}`}>Edit Order</Link>
					</Button>
					<Button
						className="delete-btn"
						onClick={() => order?.id && deleteOrderHandler(order?.id)}
					>
						<Link to={"/admin/manage-orders"}>Delete</Link>
					</Button>
				</div>
				<Link to={"/admin/manage-orders"}>Back to Orders</Link>
			</div>
		</div>
	);
};
