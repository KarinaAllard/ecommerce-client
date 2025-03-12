import axios from "axios";
import { ICustomer } from "../types/ICustomer";
import { API_URL, handleRequest } from "./baseService";

export const fetchCustomers = async (): Promise<ICustomer[]> => {
    return handleRequest(axios.get(`${API_URL}/customers`));
}