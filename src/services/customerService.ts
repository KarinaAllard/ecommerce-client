import axios from "axios";
import { CustomerUpdate, ICustomer } from "../types/ICustomer";
import { API_URL, handleRequest } from "./baseService";

export const fetchCustomers = async (): Promise<ICustomer[]> => {
    return await handleRequest(axios.get(`${API_URL}/customers`));
}

export const createCustomer = async (newCustomer: ICustomer): Promise<ICustomer> => {
    return await handleRequest(axios.post(`${API_URL}/customers`, newCustomer));
};

export const updateCustomer = async (id: number, payload: CustomerUpdate): Promise<ICustomer> => {
    return await handleRequest<ICustomer>(axios.patch(`${API_URL}/customers/${id}`, payload))
}

export const deleteCustomer = async (id: number): Promise<void> => {
    return await handleRequest<void>(axios.delete(`${API_URL}/customers/${id}`))
}