import axios from "axios";
import { ICustomer } from "../types/ICustomer";
import { API_URL, handleRequest } from "./baseService";

export const fetchCustomers = async (): Promise<ICustomer[]> => {
    return handleRequest(axios.get(`${API_URL}/customers`));
}

export const createCustomer = async (newCustomer: ICustomer): Promise<ICustomer> => {
    return handleRequest(axios.post(`${API_URL}/customers`, newCustomer));
};