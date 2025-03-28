import { useEffect, useState } from "react";
import { IOrder } from "../types/IOrder";
import { fetchOrder } from "../services/orderService";

export const useOrder = (orderId: number) => {
	const [order, setOrder] = useState<IOrder | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrderData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const orderData = await fetchOrder(orderId);
				setOrder(orderData);
			} catch (error) {
				setError("Failed to fetch order.");
			} finally {
				setIsLoading(false);
			}
		};
		if (orderId) {
			fetchOrderData();
		}
	}, [orderId]);

	return { order, isLoading, error, setOrder, fetchOrder };
};
