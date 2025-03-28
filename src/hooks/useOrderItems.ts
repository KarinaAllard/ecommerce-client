import { useEffect, useState } from "react";
import { IOrderItem, OrderItemUpdate } from "../types/IOrderItem";
import {
	deleteOrderItem,
	// fetchOrderItems,
	updateOrderItem,
} from "../services/orderItemService";
import { fetchOrder } from "../services/orderService";

export const useOrderItems = (orderId: number) => {
	const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchOrderItemsHandler();
	}, [orderId]);

	const fetchOrderItemsHandler = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const orderData = await fetchOrder(orderId);
			console.log(orderData);
			setOrderItems(orderData.order_items);
		} catch (error) {
			setError("Failed to fetch order items.");
		} finally {
			setIsLoading(false);
		}
	};

	const updateOrderItemHandler = async (
		itemId: number,
		payload: OrderItemUpdate
	) => {
		setIsLoading(true);

		try {
			await updateOrderItem(itemId, payload);
		} catch (error) {
			setError("Failed to update order.");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const deleteOrderItemHandler = async (itemId: number) => {
		setIsLoading(true);
		try {
			await deleteOrderItem(itemId);
		} catch (error) {
			setError("Failed to delete order item");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	return {
		orderItems,
		isLoading,
		error,
		updateOrderItemHandler,
		deleteOrderItemHandler,
	};
};
