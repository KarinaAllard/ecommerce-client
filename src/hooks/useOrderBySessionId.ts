import { useEffect, useState } from "react";
import { IOrder } from "../types/IOrder";
import { useSearchParams } from "react-router";
import { fetchOrderBySessionId } from "../services/orderService";

export const useOrderBySessionId = () => {
	const [order, setOrder] = useState<IOrder | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const sessionId = searchParams.get("session_id");

		if (!sessionId) {
			setError("No session ID found in URL.");
			return;
		}

		const fetchOrderData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const orderData = await fetchOrderBySessionId(sessionId);
				setOrder(orderData);
			} catch (error) {
				setError("Failed to fetch order.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchOrderData();
	}, [searchParams]);

	return { order, isLoading, error };
};
