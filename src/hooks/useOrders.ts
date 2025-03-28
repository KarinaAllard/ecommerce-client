import { useEffect, useState } from "react";
import { OrderCreate, OrderUpdate, IOrder } from "../types/IOrder";
import {
	createOrder,
	deleteOrder,
	fetchOrders,
	updateOrder,
} from "../services/orderService";

export const useOrders = () => {
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchOrdersHandler();
	}, []);

	const fetchOrdersHandler = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await fetchOrders();
			setOrders(data);
		} catch (error) {
			setError("Failed to fetch orders.");
		} finally {
			setIsLoading(false);
		}
	};

	const createOrderHandler = async (payload: OrderCreate) => {
		setIsLoading(true);

		try {
			const createdOrder = await createOrder(payload);
			const updatedOrders = [...orders, createdOrder];
			localStorage.setItem("orders", JSON.stringify(updatedOrders));
			setOrders(updatedOrders);
		} catch (error) {
			setError("Failed to add order.");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const updateOrderHandler = async (id: number, payload: OrderUpdate) => {
		setIsLoading(true);
		const existingOrders = orders;

		try {
			const updatedOrders = orders.map((order) =>
				order.id === id ? { ...order, ...payload } : order
			);
			localStorage.setItem("order", JSON.stringify(updatedOrders));
			setOrders(updatedOrders);
			await updateOrder(id, payload);
		} catch (error) {
			setError("Failed to update order.");
			rollBackOrderChanges(existingOrders);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const deleteOrderHandler = async (id: number) => {
		const existingOrders = orders;

		try {
			const updatedOrders = orders.filter((order) => order.id !== id);
			localStorage.setItem("orders", JSON.stringify(updatedOrders));
			setOrders(updatedOrders);
			await deleteOrder(id);
		} catch (error) {
			setError("Failed to delete order");
			rollBackOrderChanges(existingOrders);
			throw error;
		} finally {
		}
	};

	const rollBackOrderChanges = (existingOrders: IOrder[]) => {
		localStorage.setItem("orders", JSON.stringify(existingOrders));
		setOrders(existingOrders);
	};

	return {
		orders,
		isLoading,
		error,
		createOrderHandler,
		updateOrderHandler,
		deleteOrderHandler,
	};
};
