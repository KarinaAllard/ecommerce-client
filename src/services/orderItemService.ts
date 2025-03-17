import axios from "axios";
import { API_URL, handleRequest } from "./baseService";
import { IOrderItem, OrderItemUpdate } from "../types/IOrderItem";

// export const fetchOrderItems = async (id: number): Promise<IOrderItem[]> => {
//     return await handleRequest(axios.get(`${API_URL}/orders/${id}`));
// }

export const updateOrderItem = async (id: number, payload: OrderItemUpdate): Promise<IOrderItem> => {
    return await handleRequest<IOrderItem>(axios.patch(`${API_URL}/order-items/${id}`, payload))
}

export const deleteOrderItem = async (id: number): Promise<void> => {
    return await handleRequest<void>(axios.delete(`${API_URL}/order-items/${id}`))
}