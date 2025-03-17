import { useState } from "react";
import { useOrders } from "../hooks/useOrders";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/Button";
import { MdExpandLess, MdExpandMore } from "../../icons";

export const ManageOrders = () => {
	const { orders, isLoading, error, deleteOrderHandler } = useOrders();
	const navigate = useNavigate();

	const handleOrderClick = (orderId: number) => {
		navigate(`/admin/order-details/${orderId}`);
	};

	return (
		<div>
			<h1>Manage Orders</h1>
			{isLoading && <p>Loading orders...</p>}
			{error && <p>Error: {error}</p>}

			<div className="order-wrapper">
				{orders.length === 0 && !isLoading && <p>No orders found.</p>}
				{orders.map((order) => (
					<div className="order-div" key={order.id}>
						<h3 onClick={() => handleOrderClick(order.id!)}>
							Order number: #{order.id}
						</h3>

					</div>
				))}
			</div>
		</div>
	);
};
