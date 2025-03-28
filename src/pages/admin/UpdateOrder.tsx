import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { updateOrder } from "../../services/orderService";
import { Button } from "../../components/Button";
import { useOrder } from "../../hooks/useOrder";

export const UpdateOrder = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { order, isLoading, error, setOrder } = useOrder(Number(id));

	const [orderStatus, setOrderStatus] = useState<string>("");
	const [paymentStatus, setPaymentStatus] = useState<string>("");

	useEffect(() => {
		if (order) {
			setOrderStatus(order.order_status);
			setPaymentStatus(order.payment_status);
		}
	}, [order]);

	const handleSaveChanges = async () => {
		try {
			await updateOrder(Number(id), {
				order_status: orderStatus,
				payment_status: paymentStatus,
				payment_id: order?.payment_id || "",
			});
			navigate(`/admin/order-details/${id}`);
		} catch (error) {
			console.error("Failed to update order", error);
		}
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div>
			<h1>Edit Order #{id}</h1>

			<div className="order-wrapper">
				<div className="order-div">
					<h3>Order Status</h3>
					<select
						value={orderStatus}
						onChange={(e) => setOrderStatus(e.target.value)}
					>
						<option value="pending">Pending</option>
						<option value="processing">Processing</option>
						<option value="received">Received</option>
						<option value="completed">Completed</option>
					</select>

					<h3>Payment Status</h3>
					<select
						value={paymentStatus}
						onChange={(e) => setPaymentStatus(e.target.value)}
					>
						<option value="unpaid">Unpaid</option>
						<option value="processing">Processing</option>
						<option value="paid">Paid</option>
					</select>
				</div>

				<div className="button-div">
					<Button className="edit-btn" onClick={handleSaveChanges}>
						Save Changes
					</Button>
				</div>
				<Link to={`/admin/order-details/${id}`}>Go Back</Link>
			</div>
		</div>
	);
};
