import axios from "axios";
import { API_URL, handleRequest } from "./baseService";
import { IOrder, OrderCreate, OrderUpdate } from "../types/IOrder";

export const fetchOrders = async (): Promise<IOrder[]> => {
    return await handleRequest(axios.get(`${API_URL}/orders`));
}

export const fetchOrder = async (orderId: number): Promise<IOrder> => {
    return await handleRequest(axios.get(`${API_URL}/orders/${orderId}`));
}

export const fetchOrderBySessionId = async (sessionId: string): Promise<IOrder> => {
    return await handleRequest(axios.get(`${API_URL}/orders/payment/${sessionId}`))
}

export const createOrder = async (payload: OrderCreate): Promise<IOrder> => {
    return await handleRequest(axios.post(`${API_URL}/orders`, payload));
};

export const updateOrder = async (id: number, payload: OrderUpdate): Promise<IOrder> => {
    return await handleRequest<IOrder>(axios.patch(`${API_URL}/orders/${id}`, payload))
}

export const deleteOrder = async (id: number): Promise<void> => {
    return await handleRequest<void>(axios.delete(`${API_URL}/orders/${id}`))
}